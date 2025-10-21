import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/Header/Header';
import Work from './components/Pages/Work/Work';
import CaseStudy1 from './components/Pages/Tanda/CaseStudy1/CaseStudy';
import CaseStudyID from './components/Pages/Tanda/CaseStudy1/CaseStudyID';

// Wrapper component to handle scroll to top
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

// Simplified Header component
const AnimatedHeader = () => {
  return <Header />;
};

// Routes wrapper to access location for AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Work />} />
        <Route path="/case-study-1" element={<CaseStudy1 />} />
        <Route path="/case-study-id" element={<CaseStudyID />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router basename="/portfolio">
      <div className="App">
        <AnimatedHeader />
        <ScrollToTop />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
