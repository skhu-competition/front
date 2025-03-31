import "./css/Mainpage-map.css"
import logo from "../assets/logo.png";
import { useEffect, useRef } from "react";

const { naver } = window;

const MainPageMap = () => {

    const container = useRef(null);
    useEffect(() => {
        const skhu_position = new naver.maps.LatLng(37.487700, 126.825400);

        const options = {
            center: skhu_position,
            zoom: 17,
            zoomControl: true,
            zoomControlOptions: {
                style: naver.maps.ZoomControlStyle.SMALL,
                position: naver.maps.Position.TOP_RIGHT
            }
        };

        const map = new naver.maps.Map(container.current, options);

        const dawon_guksu_position = new naver.maps.LatLng(37.489306, 126.825079);
        const dawon_guksu_marker = new naver.maps.Marker({
            position: dawon_guksu_position,
            map: map
        })
        const dawon_guksu_content = [
            '<div style="color:black">',
            '   <h3>다원국수</h3>',
            '   <hr/>',
            '   <p>국수 맛집.<br />',
            '   </p>',
            '</div>'
        ].join('');

        const infowindow = new naver.maps.InfoWindow({
            content: dawon_guksu_content,
            maxWidth: 140,
            backgroundColor: "#ffffff",
            borderColor: "#2db400",
            borderWidth: 4,
            anchorSize: new naver.maps.Size(30, 30),
            anchorSkew: true,
            anchorColor: "#eee",
            pixelOffset: new naver.maps.Point(20, -20)
        });

        naver.maps.Event.addListener(dawon_guksu_marker, "click", function() {
            infowindow.open(map, dawon_guksu_marker);
        })
    })
    return(
        <div className="wrap">
            <img src={logo} alt="logo" className="title"/>
            <ul className="index_list">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div className="bg">
                <div className="map" ref={ container }></div>
            </div>
            
        </div>
    )
}

export default MainPageMap;