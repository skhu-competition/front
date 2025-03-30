import React from 'react';
import Login from './pages/Login';
import MainPageHoney from './pages/MainpageHoney';
import MainPageFood from './pages/MainpageFood';
import MainPageMap from './pages/MainpageMap';
import './assets/fonts/fonts.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
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
