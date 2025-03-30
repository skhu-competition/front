import logo from '../assets/logo.png';
import './Login.css';
import googleLogin from '../assets/google-login.png';
import kakaoLogin from '../assets/kakao-login.png'
const Login = () => {
  return (
    <div className='wrapper'>
      <img src={logo} alt='logo' className='logo'/>
      <p className="p1">Welcome to nowSKHU</p>
      <p className="p2">Please Login</p> 
      <img src={googleLogin} alt='googleLogin' className="login-button" />
      <img src={kakaoLogin} alt='kakaoLogin' className="login-button" />

    </div>
  );
};

export default Login;
