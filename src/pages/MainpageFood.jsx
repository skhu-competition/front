import "./css/Mainpage-food.css"
import logo from "../assets/logo.png";
import { useState } from "react";

const MainpageFood = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    
    return(
        <div className="wrap">
            <img src={logo} alt="logo" className="title"/>
            <ul className="index_list">
              {[0,1,2,3].map((i) => (
                <li
                  key={i}
                  className={selectedIndex === i ? "active" : ""}
                  onClick={() => setSelectedIndex(i)}
                ></li>
              ))}
            </ul>
            <div className="bg">
                <div className="page1">
                    <p>회대 맛집 Top5</p>
                    <div className="category1_wrapper">
                        <ul className="category1">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>

                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>


                            <li></li>
                            <li></li>
                            <li></li>

                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainpageFood;
