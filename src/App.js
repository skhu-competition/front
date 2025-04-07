import React, { useEffect } from 'react';
import Login from './pages/Login';
import MainPageHoney from './pages/MainpageHoney';
import CategoryPage from "./pages/Categorypage";
import { useState } from "react";
import PostDetailPage from './pages/PostDetailPage';
import MainPageFood from './pages/MainpageFood';
import MainPageMap from './pages/MainpageMap';
import MyPage from './pages/Mypage';
import './assets/fonts/fonts.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './App.css';
import KakaoLoginHandler from './pages/KakaoLoginHandler';
import GoogleLoginHandler from './pages/GoogleLoginHandler';

function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const [postMessage, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (location.pathname === "/" && token) {
      navigate("/mainpagemap", { replace: true });
    }
  }, [navigate, location.pathname]);

  const isMobile = useMediaQuery({ query: '(max-width: 1000px' });
  if (isMobile) {
    return (
      <div className='mobile-display'>
        <div>
            데스크톱만 가능합니다.
        </div>
      </div>
    )
  }

  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainpagehoney" element={<MainPageHoney />} />
        <Route path="/mainpagefood" element={<MainPageFood />} />
        <Route path="/mainpagemap" element={<MainPageMap />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/category/:id" element={<CategoryPage posts={postMessage} />} /> {/* 카테고리 연결 */}
        <Route path="/post/:id" element={<PostDetailPage />} /> {/* 글 상세페이지 */}
        <Route path="/oauth/kakao" element={<KakaoLoginHandler />} />
        <Route path="/oauth/google" element={<GoogleLoginHandler />} />
      </Routes>
  );
}

export default App;
