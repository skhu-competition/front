import "./css/Mainpage-map.css"
import logo from "../assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { distance } from "framer-motion";

const { naver } = window;

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

const MainPageMap = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const container = useRef(null);
  const navigate = useNavigate();

  const pathMap = []

  useEffect(() => {
    const skhu_position = new naver.maps.LatLng(37.487700, 126.825400);

    const map = new naver.maps.Map(container.current, {
      center: skhu_position,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
    });

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
            if(closeBtn) {
                closeBtn.addEventListener('click', () => {
                    infowindow.close();
                });
            }
          });
        }
      });
    });
  }, []);

  return (
    <div className="wrap">
      <img src={logo} alt="logo" className="title" />
      <ul className="index_list">
        {[0, 1, 2, 3].map((i) => (
          <li
            key={i}
            className={selectedIndex === i ? "active" : ""}
            onClick={() => setSelectedIndex(i)}
          ></li>
        ))}
      </ul>
      <div className="bg">
        <p className="intro">회대 지도</p>
        <div className="map" ref={container}></div>
      </div>
    </div>
  );
};

export default MainPageMap;
