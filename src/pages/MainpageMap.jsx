// MainPageMap.jsx
import "./css/Mainpage-map.css";
import logo from "../assets/logo.png";
import food_tap_icon from "../assets/food-tap-icon.png";
import honey_tap_icon from "../assets/honey-tap-icon.png";
import map_tap_icon from "../assets/map-tap-icon.png";
import mypage_tap_icon from "../assets/mypage-tap-icon.png";
import star_img from "../assets/star-img.png";
import star_img2 from "../assets/star-img2.png";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/AxiosInstance";
import {
  Wrap, Logo, Bg, IndexList, Index, IndexImage, Page1, Page2,
  Intro, MapContainer, ReviewList, ContentRow, ContentText,
  Title, Star, Description, Author, StarWrapper, PaginationButtons,
  PaginationBtn, EmptyState, PopupBackground, PopupBox, PopupTextarea,
  PopupActions, StarRating
} from "./css/MainPageMap.styles";

const { naver } = window;

const MainPageMap = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const indexImages = [map_tap_icon, honey_tap_icon, food_tap_icon, mypage_tap_icon];
  const routes = [ '/mainpagemap', '/mainpagehoney', '/mainpagefood', '/mypage'];

  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const container = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 5;
  const startIdx = currentPage * itemsPerPage;
  const paginatedItems = reviewData.slice(startIdx, startIdx + itemsPerPage);

  const skhu_position = useMemo(() => new naver.maps.LatLng(37.487700, 126.825400), []);

  const markerData = useMemo(() => [
    {
      id: 1,
      name: "다원국수",
      position: new naver.maps.LatLng(37.489306, 126.825079),
      description: "국수 맛집.",
      address: "서울 구로구 경인로 22",
    },
    {
      id: 2,
      name: "국수나무",
      position: new naver.maps.LatLng(37.488197, 126.825349),
      description: "밥먹기 무난무난",
      address: "서울 구로구 연동로 320",
    },
  ], []);

  const handleMarkerClick = useCallback((map, marker, place) => {
    const { id, name, position, description, address } = place;

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
        <div class="info-rating"><span class="stars">★☆☆☆☆</span></div>
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

    const closeBtn = wrapper.querySelector(".close-btn");
    const reviewBtn = wrapper.querySelector(".post-review");

    closeBtn?.addEventListener("click", () => {
      infowindow.close();
      setSelectedMarkerId(null);
      setReviewData([]);
    });

    reviewBtn?.addEventListener("click", () => {
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

  useEffect(() => {
    if (!container.current || !window.naver || !window.naver.maps) return;

    const map = new naver.maps.Map(container.current, {
      center: skhu_position,
      zoom: 17,
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

      naver.maps.Event.addListener(marker, "click", () => {
        handleMarkerClick(map, marker, place);
      });
    });

    requestAnimationFrame(() => {
      naver.maps.Event.trigger(map, "resize");
      map.setCenter(skhu_position);
    });
  }, [markerData, skhu_position, handleMarkerClick]);

  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));

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
                <img src="../assets/empty.png" alt="지도 안내" />
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
                            <Star key={i} src={star_img} alt="star" />
                          ))}
                        </StarWrapper>
                        <Description>{review.content}</Description>
                      </ContentText>
                    </ContentRow>
                  ))
                ) : (
                  <EmptyState>
                    <p>아직 작성된 리뷰가 없습니다.</p>
                  </EmptyState>
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
                console.log(`${selectedPlace} 리뷰: ${reviewText}, 별점: ${rating}`);
                
                if (!reviewText.trim() || rating === 0) {
                  alert("리뷰 내용과 별점을 모두 입력해주세요.");
                  return;
                }

                axios.post(`/place/${selectedMarkerId}/review`, {
                  content: reviewText,
                  rating: rating
                })
                .then(() => {
                  alert("리뷰가 등록되었습니다!");
                  setShowReviewPopup(false);
                  setReviewText('');
                  setRating(0);
                })
              }}>제출</button>
            </PopupActions>
          </PopupBox>
        </PopupBackground>
      )}
    </Wrap>
  );
};

export default MainPageMap;
