import { useState } from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";
import food_tap_icon from "../assets/food-tap-icon.png";
import honey_tap_icon from "../assets/honey-tap-icon.png";
import map_tap_icon from "../assets/map-tap-icon.png";
import mypage_tap_icon from "../assets/mypage-tap-icon.png";
import { useLocation, useNavigate } from "react-router-dom";

const Mypage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedIndex, setSelectedIndex] = useState(3);
    const indexImages = [map_tap_icon, honey_tap_icon, food_tap_icon, mypage_tap_icon];
    const routes = [ '/mainpagemap', '/mainpagehoney', '/mainpagefood', '/mypage'];

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
        height: ${({active}) => (active ? '10em' : '7em')};
        background-color: ${({ active }) => (active ? '#9DBDED' : '#fafcff')};
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
    `;

    const Page1 = styled.div`
        display: flex;
        flex-direction: column; 
        justify-content: center;
        align-items: center;
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
    
    const MyUl = styled.ul`
        display: flex;
        width: 100%;
        height: 100%;
        list-style: none;
        gap: 2rem;

        & > li{
            height: 100%;
            border-radius: 2rem;
            background-color: white;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
        }
        
    `

    const Li1 = styled.li`
        flex: 1;
        background: linear-gradient(to bottom, #E0ECFD 0%, #E0ECFD 40%, #fff 40%, #fff 100%);
    `

    const Li2 = styled.li`
        flex: 2;
    `
    
    return (
        <Wrap>
            <Logo src={logo} alt="logo" onClick={() => navigate('/')} />
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
                    <Intro>마이페이지</Intro>
                    <MyUl>
                        <Li1>
                        </Li1>
                        <Li2>
                        </Li2>
                    </MyUl>
                </Page1>
            </Bg>
        </Wrap>
    )
}

export default Mypage;