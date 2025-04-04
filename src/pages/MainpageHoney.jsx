import "./css/Mainpage-honey.css";
import logo from "../assets/logo.png";
import folder from "../assets/folder.png";
import food_tap_icon from "../assets/food-tap-icon.png";
import honey_tap_icon from "../assets/honey-tap-icon.png";
import map_tap_icon from "../assets/map-tap-icon.png";
import mypage_tap_icon from "../assets/mypage-tap-icon.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const MainPageHoney = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const routes = ['/mainpagefood', '/mainpagehoney', '/mainpagemap', '/mypage'];
  const indexImages = [food_tap_icon, honey_tap_icon, map_tap_icon, mypage_tap_icon];

  const goToCategory = (category) => {
    navigate(`/category/${category}`);
  };

  const Wrap = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #E0ECFD;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  `
  
  const Logo = styled.img`
    position: absolute;
    width: 13rem; 
    top: 3rem;
    left: 1rem;
    cursor: pointer;
    z-index: 2;
  `

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
  `

  const IndexList = styled.ul`
    margin-top: 1.5rem;
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    align-self: center;
    flex-direction: column;
    gap: 2rem;
  `

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

  const Intro = styled.p`
    width: 100%;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 2rem;
    margin-top: 30px;
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
  `

  const Category1 = styled.ul`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    list-style: none;
    padding: 0;
    margin-top: 5rem;
  `

  const FolderItem = styled.li`
    flex: 1;
    display: flex;
    justify-content: center;
  `

  const FolderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    align-items: flex-start;
    height: auto;
  `

  const FolderLabel = styled.p`
    font-size: 16px;
    color: #333;
    font-weight: 400;
    margin: 0;
    margin-left: 1rem;
    padding: 0;
  `

  const FolderImg = styled.img`
    width: 30rem;
    height: auto;
    transition: transform 0.3s ease;
    margin-top: 1%.5;
    display: block;

    &:hover {
      transform: scale(1.05);
    }
  `

  return (
    <Wrap>
      <Logo src={logo} alt="logo" onClick={() => navigate("/")} />
      <IndexList>
            {[0, 1, 2, 3].map((i) => (
                <Index
                    key={i}
                    active={selectedIndex === i}
                    onClick={() => {
                        setSelectedIndex(i);
                        navigate(routes[i]);
                    }}
                >
                <IndexImage src={indexImages[i]} isSelected={selectedIndex === i} />
                </Index>
            ))}
        </IndexList>

      <Bg>
        <Page1>
          <Intro>회대 꿀팁 카테고리 ▷</Intro>
          <Category1>
            <FolderItem onClick={() => goToCategory("공부")}>
              <FolderWrapper>
                <FolderImg src={folder} alt="folder" />
                <FolderLabel>| 공부</FolderLabel>
              </FolderWrapper>
            </FolderItem>
            <FolderItem onClick={() => goToCategory("새내기")}>
              <FolderWrapper>
                <FolderImg src={folder} alt="folder" />
                <FolderLabel>| 새내기</FolderLabel>
              </FolderWrapper>
            </FolderItem>
            <FolderItem onClick={() => goToCategory("기숙사")}>
              <FolderWrapper>
                <FolderImg src={folder} alt="folder" />
                <FolderLabel>| 기숙사</FolderLabel>
              </FolderWrapper>
            </FolderItem>
          </Category1>
        </Page1>
      </Bg>
    </Wrap>
  );
};

export default MainPageHoney;