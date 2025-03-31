<<<<<<< HEAD
import "./css/Mainpage-food.css"
import logo from "../assets/logo.png";
import { useState } from "react";

const MainpageFood = () => {
=======
import logo from "../assets/logo.png";
import { useState } from "react";
import food1 from "../assets/food1.png";
import food2 from "../assets/food2.png";
import food3 from "../assets/food3.png";
import food4 from "../assets/food4.png";
import food5 from "../assets/food5.png";
import styled,{keyframes} from "styled-components";
const MainPageFood = () => {
>>>>>>> 6bc8a7b987df16a0f1db7876ba9e33c82a101dab
    const [selectedIndex, setSelectedIndex] = useState(null);
    
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
    const Index_list = styled.ul`
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
        height: 7rem;
        background-color: #fafcff;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        overflow: hidden;
    
        &:hover {
        cursor: pointer;
        height: 10rem;
        background-color: ${({ active }) => (active ? '#9DBDED' : '#dceaff')};
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
    `

    const Intro = styled.p`
        width: 100%;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 2rem;
        margin-top: 30px;
    `

    const Category1Wrapper = styled.div`
        margin-top: 6rem;
        width: 100%;
        position: relative;
        overflow: hidden;
    `
    const slideLoop = keyframes`
        0% {
        transform: translateX(0);
        }
        100% {
        transform: translateX(-135rem);
        }
    `;
    const Category1 = styled.ul`
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        gap: 2rem;
        width: max-content;
        animation: ${slideLoop} 15s linear infinite;
        ${Category1Wrapper}:hover & {
            animation-play-state: paused;
        }
    `

    const Category1List = styled.li`
        width: 25rem;
        height: 25rem;
        background-color: white;
        border-radius: 50%;
        flex-shrink: 0;
        transition: all 0.3s ease; 
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 

        img{
            display: block;
            width: 100%;
            transition: all 0.3s ease; 
        }

        div{
            position: absolute;
            color: rgb(68, 68, 68);
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            width: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none; 
        }

        &:hover{
            cursor: pointer;
            transform: scale(1.1);
        }
        &:hover > img {
            transform: scale(1.1);
            opacity: 0.4;
        }

        &:hover > div {
            opacity: 1;
        }
    `
    return(
        <Wrap>
            <Logo src={logo} alt="logo" />
            <Index_list>
            {[0, 1, 2, 3].map((i) => (
                <Index
                    key={i}
                    active={selectedIndex === i}
                    onClick={() => setSelectedIndex(i)}
                >
                </Index>
            ))}
            </Index_list>
            <Bg>
                <Page1> 
                    <Intro>회대 맛집 Top5</Intro>
                    <Category1Wrapper>
                        <Category1>
                            <Category1List>
                                <img src={food1} alt="food1" className="foodImg"/>
                                <div className="hoverText"><strong>Top1.</strong> 이천성모메존칼국수</div>
                            </Category1List>
                            <Category1List>
                                <img src={food2} alt="food2" className="foodImg"/>
                                <div className="hoverText"><strong>Top2.</strong> 다원국수</div>
                            </Category1List>
                            <Category1List>
                                <img src={food3} alt="food3" className="foodImg"/>
                                <div className="hoverText"><strong>Top3.</strong> 우가본</div>
                            </Category1List>
                            <Category1List>
                                <img src={food4} alt="food4" className="foodImg"/>
                                <div className="hoverText"><strong>Top4.</strong> 본가 칡냉면</div>
                            </Category1List>
                            <Category1List>
                                <img src={food5} alt="food5" className="foodImg"/>
                                <div className="hoverText"><strong>Top5.</strong> 수목원국수</div>
                            </Category1List>

                            <Category1List>
                                <img src={food1} alt="food1" className="foodImg"/>
                                <div className="hoverText"><strong>Top1.</strong> 이천성모메존칼국수</div>
                            </Category1List>
                            <Category1List>
                                <img src={food2} alt="food2" className="foodImg"/>
                                <div className="hoverText"><strong>Top2.</strong> 다원국수</div>
                            </Category1List>
                            <Category1List>
                                <img src={food3} alt="food3" className="foodImg"/>
                                <div className="hoverText"><strong>Top3.</strong> 우가본</div>
                            </Category1List>
                            <Category1List>
                                <img src={food4} alt="food4" className="foodImg"/>
                                <div className="hoverText"><strong>Top4.</strong> 본가 칡냉면</div>
                            </Category1List>
                            <Category1List>
                                <img src={food5} alt="food5" className="foodImg"/>
                                <div className="hoverText"><strong>Top5.</strong> 수목원국수</div>
                            </Category1List>


                            <Category1List>
                                <img src={food1} alt="food1" className="foodImg"/>
                                <div className="hoverText"><strong>Top1.</strong> 이천성모메존칼국수</div>
                            </Category1List>
                            <Category1List>
                                <img src={food2} alt="food2" className="foodImg"/>
                                <div className="hoverText"><strong>Top2.</strong> 다원국수</div>
                            </Category1List>
                            <Category1List>
                                <img src={food3} alt="food3" className="foodImg"/>
                                <div className="hoverText"><strong>Top3.</strong> 우가본</div>
                            </Category1List>
                            <Category1List>
                                <img src={food4} alt="food4" className="foodImg"/>
                                <div className="hoverText"><strong>Top4.</strong> 본가 칡냉면</div>
                            </Category1List>

                        </Category1>
                    </Category1Wrapper>
                </Page1>
            </Bg>
        </Wrap>
    )
}

<<<<<<< HEAD
export default MainpageFood;
=======
export default MainPageFood;
>>>>>>> 6bc8a7b987df16a0f1db7876ba9e33c82a101dab
