import "./css/Mainpage-map.css";
import logo from "../assets/logo.png";
import food_tap_icon from "../assets/food-tap-icon.png";
import honey_tap_icon from "../assets/honey-tap-icon.png";
import map_tap_icon from "../assets/map-tap-icon.png";
import mypage_tap_icon from "../assets/mypage-tap-icon.png";
import star_img from "../assets/star-img.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const { naver } = window;

const MainPageMap = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const indexImages = [map_tap_icon, honey_tap_icon, food_tap_icon, mypage_tap_icon];
  const routes = [ '/mainpagemap', '/mainpagehoney', '/mainpagefood', '/mypage'];

  const [currentPage, setCurrentPage] = useState(0);
  
  const container = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const itemsPerPage = 5;
  const writtenItems = Array.from({ length: 10 });
  const rates = {}
  const startIdx = currentPage * itemsPerPage;
  const paginatedItems = writtenItems.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(writtenItems.length / itemsPerPage);

  // 지도 중심 좌표를 컴포넌트 밖에서 선언
  const skhu_position = new naver.maps.LatLng(37.487700, 126.825400);

  const Wrap = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #E0ECFD;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  `;

  const Logo = styled.img`
    position: absolute;
    width: 13rem; 
    top: 3rem;
    left: 1rem;
    cursor: pointer;
    z-index: 2;
  `;

  const Bg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: calc(100% - 15rem);
    height: 85vh;
    border-top-left-radius: 3rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
  `;

  const IndexList = styled.ul`
    margin-top: 1.5rem;
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    align-self: center;
    flex-direction: column;
    gap: 2rem;
  `;

  const Index = styled.div`
    width: 5rem;
    height: ${({ active }) => (active ? '10rem' : '7rem')};
    background-color: ${({ active }) => (active ? '#9DBDED' : '#FAFCFF')};
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    overflow: hidden;
    display: flex;
    justify-content: center;

    &:hover {
      cursor: pointer;
      height: 10rem;
      background-color: ${({ active }) => (active ? '#9DBDED' : '#dceaff')};

      img {
        opacity: 0;
      }
    }
  `;

  const IndexImage = styled.img`
    text-align: center;
    margin: auto 0;
    width: 50px;
    height: 50px;

    display: ${({ isSelected }) => (isSelected ? 'none' : 'block')}
  `

  const Page1 = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 2rem 0 5rem 5rem;
    box-sizing: border-box;
  `;

  const Page2 = styled.div`
    flex: 0.7;
    height: 100%;
    max-height: 100%;
    margin-right: 2rem;
    margin-left: 5rem;
  `

  const Intro = styled.p`
    width: 100%;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 2rem;
    margin-top: 30px;
  `;

  const Map = styled.div`
    border-radius: 2rem;
    margin-top: 20px;
    width: 100%;
    height: 600px;
  `;

  const ReviewList = styled.div`
    width: 100%;
    margin-top: 8rem;
    height: 72%;
    overflow-y: auto;
    max-height: 100%;
    overflow-x: hidden; 
    border-radius: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `

  const ContentRow = styled.div`
    margin-left: 3rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
    max-width: 100%;
    overflow: hidden; 
  `;

  const ContentText = styled.div`
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        overflow: hidden;
    `;
    const Title = styled.p`
        font-weight: bold;
        font-size: 1.1rem;
        margin: 0;
    `;

    const Star = styled.img`
      width: 1.3rem;
      margin-bottom: -0.1rem;
    `;

    const Description = styled.p`
        font-size: 0.9rem;
        color: #444;
        margin: 0;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        width: 80%; 
        display: block;
    `;

    const Author = styled.p`
      font-size: 1.1rem;
      font-weight: bold;
      margin-top: 30px;
      margin-bottom: 0;
    `

    const StarWrapper = styled.div`
      display: flex;
      align-items: center;
      gap: 2px;
    `

    const PaginationButtons = styled.div`
        display: flex;
        justify-content: space-evenly;
        padding: 1rem 2rem;
    `;

    const PaginationBtn = styled.button`
        background-color: #9DBDED;
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
        pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    `;

  useEffect(() => {
    if (!container.current || !naver || !naver.maps) return;

    const markerData = [
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
    ];

    const map = new naver.maps.Map(container.current, {
      center: skhu_position,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
    });

    // 지도 인스턴스를 ref에 저장
    mapRef.current = map;

    markerData.forEach(({ id, name, position, description, address}) => {
      const marker = new naver.maps.Marker({
        position,
        map,
      });

      const content = `
        <div class="map-info-container">
          <div class="map-info-window">
            <div class="info-header">
              <span class="place-name">${name}</span>
              <div class="info-actions">
                <button class="post-review">리뷰 작성하기</button>
                <button class="close-btn">✕</button>
              </div>
            </div>
            <div class="info-rating">
              <span class="stars">★☆☆☆☆</span>
            </div>
            <div class="info-address">
              ${address}<br />
            </div>
            <div class="info-extra">
              ${description}
            </div>
          </div>
          <div class="info-tail-shadow"></div>
          <div class="info-tail"></div>
        </div>
      `;

      const infowindow = new naver.maps.InfoWindow({
        content,
        borderWidth: 0,
        disableAnchor: true,
        backgroundColor: 'transparent',
        pixelOffset: new naver.maps.Point(0, -28),
      });

      naver.maps.Event.addListener(marker, "click", function () {
        if (infowindow.getMap()) {
          infowindow.close();
          setSelectedMarkerId(null);
        } else {
          infowindow.open(map, marker);
          setSelectedMarkerId(id);
          naver.maps.Event.once(map, 'idle', function() {
            const closeBtn = document.querySelector('.close-btn');
            if (closeBtn) {
              closeBtn.addEventListener('click', () => {
                infowindow.close();
                setSelectedMarkerId(null);
              });
            }
          });
        }
      });
    });

    // 초기 로드 시 지도 컨테이너 크기 재계산
    setTimeout(() => {
      naver.maps.Event.trigger(map, "resize");
      map.setCenter(skhu_position);
    }, 100);
  }, [skhu_position]);

  useEffect(() => {
    
  }, [selectedMarkerId])

  // 지도 새로고침 함수: 저장해둔 mapRef를 이용해 리사이즈 이벤트 발생
  const refreshMap = () => {
    if (mapRef.current && naver && naver.maps) {
      setTimeout(() => {
        naver.maps.Event.trigger(mapRef.current, "resize");
        mapRef.current.setCenter(skhu_position);
      }, 100);
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <Wrap>
      <Logo src={logo} alt="logo" onClick={() => navigate('/')} />
      <IndexList>
        {[0, 1, 2, 3].map((i) => (
          <Index
            key={i}
            active={selectedIndex === i}
            onClick={() => {
              // 이미 해당 경로에 있다면 (특히 Index 2) refreshMap 호출
              if (routes[i] === location.pathname) {
                if (i === 0) {
                  refreshMap();
                }
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
          <Map ref={container} />
        </Page1>
        <Page2>
        {selectedMarkerId !== null && (
          <ReviewList>
            {paginatedItems.map((_, idx) => (
              <ContentRow key={idx}>
                <ContentText>
                  {/* 리뷰 리스트 예시 - 선택된 마커 id에 따라 내용 변경 가능 */}
                  <Author>작성자 {startIdx + idx + 1} (마커 {selectedMarkerId})</Author>
                  <StarWrapper>
                    {Array(itemsPerPage).fill(0).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        src={star_img} 
                        alt="star"
                      />
                    ))}
                  </StarWrapper>
                  <Description>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, deserunt deleniti...
                  </Description>
                </ContentText>
              </ContentRow>
            ))}
            <PaginationButtons>
              <PaginationBtn onClick={goToPreviousPage} disabled={currentPage === 0}>이전</PaginationBtn>
              <PaginationBtn onClick={goToNextPage} disabled={currentPage >= totalPages - 1}>다음</PaginationBtn>
            </PaginationButtons>
          </ReviewList>
          )}
        </Page2>
      </Bg>
    </Wrap>
  );
};

export default MainPageMap;