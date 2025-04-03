import React from 'react';
import Login from './pages/Login';
import MainPageHoney from './pages/MainpageHoney';
import CategoryPage from "./pages/Categorypage";
import { useState } from "react";
import PostDetailPage from './pages/PostDetailPage';
import MainPageFood from './pages/MainpageFood';
import MainPageMap from './pages/MainpageMap';
import MyPage from './pages/Mypage';
import './assets/fonts/fonts.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './App.css';

function App() {

  const [postMessage, setPosts] = useState([]);

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
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainpagehoney" element={<MainPageHoney />} />
        <Route path="/mainpagefood" element={<MainPageFood />} />
        <Route path="/mainpagemap" element={<MainPageMap />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/category/:name" element={<CategoryPage posts={postMessage} />} /> {/* 카테고리 연결 */}
        <Route path="/post/:id" element={<PostDetailPage />} /> {/* 글 상세페이지 */}
      </Routes>
    </Router>
  );
}

export default App;
