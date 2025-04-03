import "./css/Mainpage-honey.css";
import logo from "../assets/logo.png";
import folder from "../assets/folder.png";
import { useNavigate } from "react-router-dom";

const MainPageHoney = () => {
  const navigate = useNavigate();

  const goToCategory = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="wrap">
      <img src={logo} alt="logo" className="title" />

      <ul className="index_list">
        <li></li>
        <li className="active"></li>
        <li></li>
        <li></li>
      </ul>

      <div className="bg">
        <h2 className="intro">회대 꿀팁 카테고리 ▷</h2>
        <ul className="category1">
          <li className="folder-item" onClick={() => goToCategory("공부")}>
            <div className="folder-wrapper">
              <img src={folder} alt="folder" className="folder-img" />
              <p className="folder-label">| 공부</p>
            </div>
          </li>
          <li className="folder-item" onClick={() => goToCategory("새내기")}>
            <div className="folder-wrapper">
              <img src={folder} alt="folder" className="folder-img" />
              <p className="folder-label">| 새내기</p>
            </div>
          </li>
          <li className="folder-item" onClick={() => goToCategory("기숙사")}>
            <div className="folder-wrapper">
              <img src={folder} alt="folder" className="folder-img" />
              <p className="folder-label">| 기숙사</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainPageHoney;
