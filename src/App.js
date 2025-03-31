import React from 'react';
import Login from './pages/Login';
import MainPageHoney from './pages/MainpageHoney';
import MainPageFood from './pages/MainpageFood';
import MainPageMap from './pages/MainpageMap';
import './assets/fonts/fonts.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './App.css';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 1000px' });
  if(isMobile) {
    return (
      <div className='mobile-display'>
        <div style={{flexDirection:"row", gap:"0", justifyContent:"center", alignItems:"center"}}>
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
      </Routes>
    </Router>
  );
}

export default App;
