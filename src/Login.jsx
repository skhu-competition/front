import { motion, useAnimation } from 'framer-motion';
import waterfall from './assets/waterfall.png';
import { useEffect, useMemo, useRef } from 'react';
import logo from './assets/logo.png';
import './Login.css';

const Login = () => {
  const circleCount = 15;

  const controlsRef = useRef(
    Array.from({ length: circleCount }, () => useAnimation())
  );
  const controlsArray = controlsRef.current;

  const randomPositions = useMemo(() => {
    const minGap = 100;
    const startX = 100;
    const endX = window.innerWidth - 550;
    const minY = 100;
    const maxY = 900;
    const positions = [];
    let attempts = 0;

    while (positions.length < circleCount && attempts < 2000) {
      const randX = Math.floor((Math.random() * Math.random() * (endX - startX)) + startX);
      const randY = Math.floor(Math.random() * (maxY - minY) + minY);
      if (positions.every(pos => Math.abs(pos.x - randX) > minGap)) {
        positions.push({ x: randX, y: randY });
      }
      attempts++;
    }

    const fallbackStart = startX + ((endX - startX - (circleCount * minGap)) / 2);
    const fallbackGap = minGap;
    while (positions.length < circleCount) {
      const fallbackX = fallbackStart + (positions.length % Math.floor((endX - startX) / fallbackGap)) * fallbackGap;
      const fallbackY = (minY + maxY) / 2;
      positions.push({ x: fallbackX, y: fallbackY });
    }

    return positions;
  }, []);

  useEffect(() => {
    randomPositions.forEach((pos, index) => {
      const controls = controlsArray[index];
      if (!controls) return;

      controls.start({
        y: pos.y,
        x: [0, -10, 10, -10, 10, 0],
        opacity: 1,
        transition: {
          y: { duration: 4, delay: Math.random() * 3, ease: 'easeOut' },
          x: { delay: Math.random() * 3, duration: 4, ease: 'easeInOut' },
          opacity: { duration: 4, delay: index * 0.3 }
        }
      });
    });
  }, [controlsArray, randomPositions]);

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />

      {randomPositions.map((pos, index) => (
        <motion.img
          key={index}
          animate={controlsArray[index]}
          initial={{ y: 700, x: 0, opacity: 0 }}
          src={waterfall}
          alt="bubble"
          className="bubble"
          style={{ left: pos.x }}
        />
      ))}

      <motion.div
        className="login-box"
        initial={{ opacity: 0 }}
        animate={{ x: -100, opacity: 1 }}
        transition={{ delay: 3, duration: 2 }}
      >
        <h2 className="login-title">Sign in</h2>
        <input type="text" placeholder="Username" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <button className="login-button">로그인</button>
        <button
          className="signup-button"
          onClick={() => console.log('Navigate to sign up')}
        >
          회원가입
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
