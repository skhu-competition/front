import "./css/Mainpage-map.css";
import logo from "../assets/logo.png";
import food_tap_icon from "../assets/food-tap-icon.png";
import honey_tap_icon from "../assets/honey-tap-icon.png";
import map_tap_icon from "../assets/map-tap-icon.png";
import mypage_tap_icon from "../assets/mypage-tap-icon.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const { naver } = window;

const MainPageMap = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const indexImages = [food_tap_icon, honey_tap_icon, map_tap_icon, mypage_tap_icon];
  const container = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 지도 중심 좌표를 컴포넌트 밖에서 선언
  const skhu_position = new naver.maps.LatLng(37.487700, 126.825400);

  const routes = ['/mainpagefood', '/mainpagehoney', '/mainpagemap', '/mypage'];

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
    width: 70px;
    height: 70px;

    display: ${({ isSelected }) => (isSelected ? 'none' : 'block')}
  `

  const Page1 = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: 2rem 5rem;
    box-sizing: border-box;
  `;

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

  useEffect(() => {
    if (!container.current || !naver || !naver.maps) return;

    const markerData = [
      {
        name: "다원국수",
        position: new naver.maps.LatLng(37.489306, 126.825079),
        description: "국수 맛집.",
        address: "서울 구로구 경인로 22",
        distance: "학교 정문 걸어서 2분",
      },
      {
        name: "국수나무",
        position: new naver.maps.LatLng(37.488197, 126.825349),
        description: "밥먹기 무난무난",
        address: "서울 구로구 연동로 320",
        distance: "학교 새천년관 지하 1층",
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

    markerData.forEach(({ name, position, description, address, distance }) => {
      const marker = new naver.maps.Marker({
        position,
        map,
      });

      const content = `
        <div class="map-info-container">
            <div class="map-info-window">
                <div class="info-header">
                    <span class="place-name">${name}</span>
                    <button class="close-btn">✕</button>
                </div>
                <div class="info-rating">
                    <span class="stars">★☆☆☆☆</span>
                    <span class="review">(0건) 리뷰 0</span>
                </div>
                <div class="info-address">
                    ${address}<br />
                    ${distance}
                </div>
                <div class="info-extra">
                    ${description}
                </div>
            </div>
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
        } else {
          infowindow.open(map, marker);
          naver.maps.Event.once(map, 'idle', function() {
            const closeBtn = document.querySelector('.close-btn');
            if (closeBtn) {
              closeBtn.addEventListener('click', () => {
                infowindow.close();
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

  // 지도 새로고침 함수: 저장해둔 mapRef를 이용해 리사이즈 이벤트 발생
  const refreshMap = () => {
    if (mapRef.current && naver && naver.maps) {
      setTimeout(() => {
        naver.maps.Event.trigger(mapRef.current, "resize");
        mapRef.current.setCenter(skhu_position);
      }, 100);
    }
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
                if (i === 2) {
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
      </Bg>
    </Wrap>
  );
};

export default MainPageMap;
