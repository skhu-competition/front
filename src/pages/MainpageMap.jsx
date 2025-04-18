import "./css/Mainpage-map.css";
import logo from "../assets/logo.png";
import food_tap_icon from "../assets/food-tap-icon.png";
import honey_tap_icon from "../assets/honey-tap-icon.png";
import map_tap_icon from "../assets/map-tap-icon.png";
import mypage_tap_icon from "../assets/mypage-tap-icon.png";
import star_img from "../assets/star-img.png";
import star_img2 from "../assets/star-img2.png";
import noPostIcon from "../assets/empty.png";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/AxiosInstance";
import {
  Wrap, Logo, Bg, IndexList, Index, IndexImage, Page1, Page2,
  Intro, MapContainer, ReviewList, ContentRow, ContentText,
  Title, Star, Description, Author, StarWrapper, PaginationButtons,
  PaginationBtn, EmptyState, PopupBackground, PopupBox, PopupTextarea,
  PopupActions, StarRating, DeleteButton
} from "./css/MainPageMap.styles";

const { naver } = window;

const MainPageMap = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const indexImages = [map_tap_icon, honey_tap_icon, food_tap_icon, mypage_tap_icon];
  const routes = ['/mainpagemap', '/mainpagehoney', '/mainpagefood', '/mypage'];

  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const container = useRef(null);
  const mapRef = useRef(null);
  const markerRefs = useRef({});
  const navigate = useNavigate();
  const location = useLocation();

  const [markerData, setMarkerData] = useState([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [userInfo, setUserInfo] = useState(null);

  const itemsPerPage = 5;
  const startIdx = currentPage * itemsPerPage;
  const paginatedItems = reviewData.slice(startIdx, startIdx + itemsPerPage);

  const skhu_position = useMemo(() => new naver.maps.LatLng(37.487700, 126.825400), []);
  const targetPlaceId = location.state?.placeId;

  useEffect(() => {
    axios.get(`/place`)
      .then((res) => {
        const places = res.data.places.map(p => ({
          id: p.id,
          name: p.name,
          position: new naver.maps.LatLng(p.mapy, p.mapx),
          description: p.description,
          address: p.address,
          rating: p.averageRating
        }));
        setMarkerData(places);
      })
      .catch((err) => {
        console.log("마커 데이터 오류", err);
      });
    
    axios.get(`/getuserinfo`)
    .then((res) => setUserInfo(res.data))
    .catch((err) => console.log("유저 정보 불러오기 실패", err));
  }, []);

  const handleMarkerClick = useCallback((map, marker, place) => {
    const { id, name, position, description, address, rating } = place;
    const emtpystar = `<img src="${star_img}" alt="star" width="17px"/>`;
    const star = `<img src="${star_img2}" alt="star" width="17px" />`;

    const wrapper = document.createElement("div");
    wrapper.className = "map-info-container";
    wrapper.innerHTML = `
      <div class="map-info-window">
        <div class="info-header">
          <span class="place-name">${name}</span>
          <div class="info-actions">
            <button class="post-review">리뷰 작성하기</button>
            <button class="close-btn">✕</button>
          </div>
        </div>
        <div class="info-rating"><span class="stars">${star.repeat(rating)}${emtpystar.repeat(5 - rating)}</span></div>
        <div class="info-address">${address}</div>
        <div class="info-extra">${description}</div>
      </div>
      <div class="info-tail-shadow"></div>
      <div class="info-tail"></div>
    `;

    const infowindow = new naver.maps.InfoWindow({
      content: wrapper,
      borderWidth: 0,
      disableAnchor: true,
      backgroundColor: 'transparent',
      pixelOffset: new naver.maps.Point(0, -28),
    });

    infowindow.open(map, marker);
    setSelectedMarkerId(id);
    setSelectedPlace(name);

    wrapper.querySelector(".close-btn")?.addEventListener("click", () => {
      infowindow.close();
      setSelectedMarkerId(null);
      setReviewData([]);
    });

    wrapper.querySelector(".post-review")?.addEventListener("click", () => {
      setShowReviewPopup(true);
      infowindow.close();
    });

    axios.get(`/place/${id}/review`)
      .then(res => {
        setReviewData(res.data.reviews);
        setTotalPages(Math.ceil(res.data.reviews.length / itemsPerPage));
        requestAnimationFrame(() => {
          naver.maps.Event.trigger(map, 'resize');
          map.setCenter(position);
        });
      })
      .catch(err => {
        console.error("리뷰 요청 실패", err);
        setReviewData([]);
      });
  }, []);

  const handleDelete = reviewId => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios.delete(`/place/review/${reviewId}`)
        .then(() => {
          alert("삭제가 완료되었습니다.");
          // 리뷰 목록 새로고침
          axios.get(`/place/${selectedMarkerId}/review`)
            .then(res => {
              setReviewData(res.data.reviews);
              setTotalPages(Math.ceil(res.data.reviews.length / itemsPerPage));
              setCurrentPage(0);
            })
            .catch(err => {
              console.error("리뷰 새로고침 실패", err);
            });
        })
        .catch((err) => {
          console.log("삭제 실패", err);
          alert("삭제 실패");
        });
    }
  };
  
  useEffect(() => {
    if (!container.current || !window.naver || !window.naver.maps) return;

    const map = new naver.maps.Map(container.current, {
      center: skhu_position,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
    });

    mapRef.current = map;

    markerData.forEach(place => {
      const marker = new naver.maps.Marker({
        position: place.position,
        map,
      });

      markerRefs.current[place.id] = marker;

      naver.maps.Event.addListener(marker, "click", () => {
        handleMarkerClick(map, marker, place);
      });
    });

    requestAnimationFrame(() => {
      naver.maps.Event.trigger(map, "resize");
      map.setCenter(skhu_position);
    });
  }, [markerData, skhu_position, handleMarkerClick]);

  useEffect(() => {
    if (!targetPlaceId || !mapRef.current || markerData.length === 0) return;
    const place = markerData.find(p => p.id === targetPlaceId);
    const marker = markerRefs.current[targetPlaceId];
    if (place && marker) {
      handleMarkerClick(mapRef.current, marker, place);
      mapRef.current.setCenter(place.position);
    }
  }, [targetPlaceId, markerData, handleMarkerClick]);

  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));

  useEffect(() => {
    if (!targetPlaceId || !mapRef.current || markerData.length === 0) return;

    const place = markerData.find(p => p.id === Number(targetPlaceId));
    const marker = markerRefs.current[targetPlaceId];

    if (place && marker) {
      handleMarkerClick(mapRef.current, marker, place);
      mapRef.current.setCenter(place.position);
      
      window.history.replaceState({}, document.title);
    }
  }, [targetPlaceId, markerData, handleMarkerClick]);

  

  return (
    <Wrap>
      <Logo src={logo} alt="logo" onClick={() => navigate('/')} />
      <IndexList>
        {[0, 1, 2, 3].map((i) => (
          <Index
            key={i}
            active={selectedIndex === i}
            onClick={() => {
              if (routes[i] === location.pathname && i === 0) {
                requestAnimationFrame(() => {
                  naver.maps.Event.trigger(mapRef.current, "resize");
                  mapRef.current.setCenter(skhu_position);
                });
              } else {
                setSelectedIndex(i);
                navigate(routes[i]);
              }
            }}
          >
            <IndexImage src={indexImages[i]} isSelected={selectedIndex === i} />
          </Index>
        ))}
      </IndexList>
      <Bg>
        <Page1>
          <Intro>회대 지도</Intro>
          <MapContainer ref={container} />
        </Page1>
        <Page2>
          <ReviewList>
            {selectedMarkerId === null ? (
              <EmptyState>
                <img src={noPostIcon} alt="지도 안내" />
                <p>지도의 핀을 클릭하면 리뷰를 볼 수 있어요!</p>
              </EmptyState>
            ) : (
              <>
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((review, idx) => (
                    <ContentRow key={idx}>
                      <ContentText>
                        <Author>{review.userName}</Author>
                        <StarWrapper>
                          {Array(review.rating).fill(0).map((_, i) => (
                            <Star key={i} src={star_img2} alt="star" />
                          ))}
                        </StarWrapper>
                        <Description>{review.content}</Description>
                      </ContentText>
                      {review.userId === userInfo.userId && (
                        <DeleteButton onClick={() => handleDelete(review.reviewId)}>삭제</DeleteButton>
                      )}
                    </ContentRow>
                  ))
                ) : (
                  <EmptyState><p>아직 작성된 리뷰가 없습니다.</p></EmptyState>
                )}

                <PaginationButtons>
                  <PaginationBtn onClick={goToPreviousPage} disabled={currentPage === 0}>이전</PaginationBtn>
                  <PaginationBtn onClick={goToNextPage} disabled={currentPage >= totalPages - 1}>다음</PaginationBtn>
                </PaginationButtons>
              </>
            )}
          </ReviewList>
        </Page2>
      </Bg>
      {showReviewPopup && (
        <PopupBackground>
          <PopupBox>
            <h3>{selectedPlace} 리뷰 작성</h3>
            <StarRating>
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  key={star}
                  src={star <= rating ? star_img2 : star_img}
                  alt="별"
                  onClick={() => setRating(star)}
                />
              ))}
            </StarRating>
            <PopupTextarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="리뷰를 작성하세요"
            />
            <PopupActions>
              <button onClick={() => setShowReviewPopup(false)}>취소</button>
              <button onClick={() => {
                if (!reviewText.trim() || rating === 0) {
                  alert("리뷰 내용과 별점을 모두 입력해주세요.");
                  return;
                }

                axios.post(`/place/${selectedMarkerId}/review`, {
                  content: reviewText,
                  rating: rating
                }).then(() => {
                  alert("리뷰가 등록되었습니다!");
                  setShowReviewPopup(false);
                  setReviewText('');
                  setRating(0);
                  axios.get(`/place/${selectedMarkerId}/review`)
                  .then(res => {
                    setReviewData(res.data.reviews);
                    setTotalPages(Math.ceil(res.data.reviews.length / itemsPerPage));
                    setCurrentPage(0); // 첫 페이지로 초기화
                  }).catch(err => {
                    console.error("리뷰 새로고침 실패", err);
                  });
                }).catch((e) => {
                  alert("이미 리뷰를 등록한 장소입니다.");
                  setShowReviewPopup(false);
                  setReviewText('');
                  setRating(0);
                });
              }}>제출</button>
            </PopupActions>
          </PopupBox>
        </PopupBackground>
      )}
    </Wrap>
  );
};

export default MainPageMap;
