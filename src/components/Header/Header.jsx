import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
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
  }, [scrollY, isPageLoading]);

  // Listen to scroll changes
  useEffect(() => {
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
  }, [scrollY, headerState, isPageLoading]);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header 
      className="header"
      initial={{ y: -80, opacity: 1 }} // Start hidden above viewport
      animate={{
        y: headerState === 'visible' ? 0 : -80, // Visible at 0, hidden at -80px
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
        x: '-50%',
        left: '50%'
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
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Work
          </Link>
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
