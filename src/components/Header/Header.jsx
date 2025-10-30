import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ isIntroMode = false, onWorkClick }) => {
  const { scrollY } = useScroll();
  const location = useLocation();
  const [headerState, setHeaderState] = useState('visible'); // 'visible' or 'hidden'
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Debug logging
  console.log('Header render - headerState:', headerState);
  console.log('Header render - current path:', location.pathname);
  console.log('Header render - isPageLoading:', isPageLoading);
  console.log('Header render - scrollY:', scrollY.get());

  // Handle page loading state (route changes)
  useEffect(() => {
    console.log('Route change detected - starting page load');
    setIsPageLoading(true);
    
    // Reset page loading state after transition
    const timer = setTimeout(() => {
      console.log('Page load complete');
      setIsPageLoading(false);
    }, 600); // Shorter loading time
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Determine header state based on conditions
  useEffect(() => {
    // Skip all scroll-based logic during intro mode
    if (isIntroMode) {
      setHeaderState('visible');
      return;
    }

    const currentScroll = scrollY.get();
    const scrollThreshold = 100; // Pixels scrolled before hiding header

    if (isPageLoading) {
      console.log('Setting header to HIDDEN (page loading)');
      setHeaderState('hidden');
    } else if (currentScroll > scrollThreshold) {
      console.log('Setting header to HIDDEN (scroll threshold exceeded:', currentScroll, '>', scrollThreshold, ')');
      setHeaderState('hidden');
    } else {
      console.log('Setting header to VISIBLE');
      setHeaderState('visible');
    }
  }, [scrollY, isPageLoading, isIntroMode]);

  // Listen to scroll changes
  useEffect(() => {
    // Skip scroll listeners during intro mode
    if (isIntroMode) {
      return;
    }

    const unsubscribe = scrollY.on('change', (latest) => {
      const scrollThreshold = 100;

      if (isPageLoading) {
        return; // Don't change state while page is loading
      }

      if (latest > scrollThreshold && headerState === 'visible') {
        console.log('Scroll hiding header at:', latest);
        setHeaderState('hidden');
      } else if (latest <= scrollThreshold && headerState === 'hidden') {
        console.log('Scroll showing header at:', latest);
        setHeaderState('visible');
      }
    });

    return () => unsubscribe();
  }, [scrollY, headerState, isPageLoading, isIntroMode]);

  const isActive = (path) => {
    if (path === '/work') {
      return location.pathname === '/work';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header
      className={`header ${isIntroMode ? 'intro-mode' : ''}`}
      initial={{ y: isIntroMode ? 0 : -80, opacity: 1 }} // Start at 0 in intro mode
      animate={{
        y: isIntroMode ? 0 : (headerState === 'visible' ? 0 : -80), // Always visible in intro mode
        opacity: 1 // Always keep opacity at 1
      }}
      transition={{
        y: {
          duration: 0.5,
          ease: "easeInOut"
        },
        opacity: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }}
      style={{
        x: isIntroMode ? 0 : '-50%',
        left: isIntroMode ? 0 : '50%',
        position: isIntroMode ? 'relative' : 'fixed'
      }}
      onAnimationStart={(definition) => console.log('Header animation started:', definition)}
      onAnimationComplete={(definition) => console.log('Header animation completed:', definition)}
      onUpdate={(latest) => console.log('Header animation update:', latest)}
    >
      <div className="header-content">
        <div className="header-logo">
          <h1 className="header-title">Nicholas Le</h1>
        </div>
        <nav className="header-nav">
          {isIntroMode && onWorkClick ? (
            <button
              onClick={onWorkClick}
              className="nav-link"
            >
              Work
            </button>
          ) : (
            <Link
              to="/work"
              className={`nav-link ${isActive('/work') ? 'active' : ''}`}
            >
              Work
            </Link>
          )}
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            Contact
          </Link>
          <Link 
            to="/resume" 
            className={`nav-link ${isActive('/resume') ? 'active' : ''}`}
          >
            Resume
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
