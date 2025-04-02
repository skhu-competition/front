import { useState } from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const Mypage = () => {
    const [selectedIndex, setSelectedIndex] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

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
        height: ${({active}) => (active ? '10em' : '7em')};
        background-color: ${({ active }) => (active ? '#9DBDED' : '#fafcff')};
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        overflow: hidden;
    
        &:hover {
        cursor: pointer;
        background-color: #dceaff;
        }
    `;

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
                </Index>
            ))}
            </IndexList>
            <Bg>
                <Page1>
                    <Intro>마이페이지</Intro>
                </Page1>
            </Bg>
        </Wrap>
    )
}

export default Mypage;