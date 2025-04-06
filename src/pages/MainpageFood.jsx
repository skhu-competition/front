import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/logo.png";
import food_tap_icon from "../assets/food-tap-icon.png";
import honey_tap_icon from "../assets/honey-tap-icon.png";
import map_tap_icon from "../assets/map-tap-icon.png";
import mypage_tap_icon from "../assets/mypage-tap-icon.png";
import food1 from "../assets/food1.png";
import food2 from "../assets/food2.png";
import food3 from "../assets/food3.png";
import food4 from "../assets/food4.png";
import food5 from "../assets/food5.png";

const foodData = [
  { img: food1, name: "이천성모메존칼국수", rank: 1 },
  { img: food2, name: "다원국수", rank: 2 },
  { img: food3, name: "우가본", rank: 3 },
  { img: food4, name: "본가 칡냉면", rank: 4 },
  { img: food5, name: "수목원국수", rank: 5 },
];



const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #e0ecfd;
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

const IndexList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  margin: 0;
  align-self: center;
  margin-top: 1.5rem;
  list-style: none;
`;

const Index = styled.div`
  width: 5rem;
  height: ${({ active }) => (active ? "10rem" : "7rem")};
  background-color: ${({ active }) => (active ? "#9DBDED" : "#FAFCFF")};
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    height: 10rem;
    background-color: ${({ active }) => (active ? "#9DBDED" : "#dceaff")};
    
    img {
      opacity: 0;
    }
  }
`;

const IndexImage = styled.img`
  width: 50px;
  height: 50px;
  margin: auto 0;
  display: ${({ isSelected }) => (isSelected ? "none" : "block")};
`;

const Bg = styled.div`
  width: calc(100% - 15rem);
  height: 85vh;
  background-color: white;
  border-top-left-radius: 3rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Page1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem 5rem;
  box-sizing: border-box;
`;

const Intro = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin: 2rem 0;
`;

const Category1Wrapper = styled.div`
  margin-top: 4rem;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c2d6f8;
    border-radius: 4px;
  }
`;

const Category1 = styled.ul`
  display: flex;
  gap: 2rem;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const CardText = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.3rem;
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.3s ease-in-out;
  z-index: 2;
`;

const Category1List = styled.li`
  width: 18rem;
  height: 24rem;
  position: relative;
  background-color: #fff;
  border-radius: 1.5rem;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px) scale(1.02);

    ${CardText} {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
  }
`;

const Badge = styled.strong`
  font-size: 0.85rem;
  background-color: #9DBDED;
  color: white;
  padding: 0.3rem 0.9rem;
  border-radius: 10rem;
  font-weight: 500;
`;

const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d2d2d;
`;

const SubInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;



const MainPageFood = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const navitage = useNavigate();
  const indexImages = [map_tap_icon, honey_tap_icon, food_tap_icon, mypage_tap_icon];
  const routes = [ '/mainpagemap', '/mainpagehoney', '/mainpagefood', '/mypage'];

  return (
    <Wrap>
      <Logo src={logo} alt="logo" onClick={() => navitage('/')} />
      <IndexList>
        {indexImages.map((img, i) => (
          <Index
            key={i}
            active={selectedIndex === i}
            onClick={() => {
              setSelectedIndex(i);
              navitage(routes[i]);
            }}
          >
            <IndexImage src={img} isSelected={selectedIndex === i} />
          </Index>
        ))}
      </IndexList>

      <Bg>
        <Page1>
          <Intro>회대 맛집 Top5</Intro>
          <Category1Wrapper>
            <Category1>
              {foodData.map((food, idx) => (
                <Category1List key={idx}>
                  <img src={food.img} alt={`food${food.rank}`} />
                  <CardText>
                    <Badge>Top{food.rank}</Badge>
                    <Name>{food.name}</Name>
                    <SubInfo>
                      <div>📍 주소</div>
                      <div>⭐ 4.0</div>
                    </SubInfo>
                  </CardText>
                </Category1List>
              ))}
            </Category1>
          </Category1Wrapper>
        </Page1>
      </Bg>
    </Wrap>
  );
};

export default MainPageFood;