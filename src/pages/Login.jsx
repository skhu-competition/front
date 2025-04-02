import logo from '../assets/logo.png';
import './Login.css';
import googleLogin from '../assets/google-login.png';
import kakaoLogin from '../assets/kakao-login.png'
const Login = () => {
  const kakaoLoginClick = () => {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=5fe5e6a8371801d6111e6555a77e630e&redirect_uri=http://localhost:8080/auth/kakao&response_type=code`;
    window.location.href = kakaoLoginUrl;
  };

  return (
    <div className='wrapper'>
      <img src={logo} alt='logo' className='logo'/>
      <p className="p1">Welcome to nowSKHU</p>
      <p className="p2">Please Login</p> 
      <img src={googleLogin} alt='googleLogin' className="login-button" />
      <img src={kakaoLogin} alt='kakaoLogin' className="login-button" onClick={kakaoLoginClick}/> 


    </div>
  );
};

export default Login;
