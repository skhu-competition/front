import "./css/Mainpage-food.css"
import logo from "../assets/logo.png";
const MainPageFood = () => {
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
                <ul className="category1">
                    <li></li>
                </ul>
            </div>
            
        </div>
    )
}

export default MainPageFood;