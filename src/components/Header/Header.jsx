import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Header.css';

const Header = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 24], [0, -64]);

  return (
    <motion.header 
      className="header"
      style={{ 
        y,
        x: '-50%',
        left: '50%'
      }}
    >
      <div className="header-content">
        <div className="header-logo">
          <h1 className="header-title">Nicholas Le</h1>
        </div>
        <nav className="header-nav">
          <a href="/" className="nav-link">Work</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/contact" className="nav-link">Contact</a>
          <a href="/resume" className="nav-link">Resume</a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
