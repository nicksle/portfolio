import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './components/Header/Header';
import IntroAnimation from './components/Pages/Intro/IntroAnimation';
import Work from './components/Pages/Work/Work';
import About from './components/Pages/About/About';
import Contact from './components/Pages/Contact/Contact';
import Resume from './components/Pages/Resume/Resume';
import CaseStudy1 from './components/Pages/Tanda/CaseStudy1/CaseStudy';
import CaseStudyID from './components/Pages/Tanda/CaseStudy1/CaseStudyID';
import DitherPlayground from './components/DitherPlayground/DitherPlayground';
import PixelBlastPlayground from './components/PixelBlastPlayground/PixelBlastPlayground';
import AuroraPlayground from './components/AuroraPlayground/AuroraPlayground';
import GradualBlurPlayground from './components/GradualBlurPlayground/GradualBlurPlayground';

// Wrapper component to handle scroll to top
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

// Routes wrapper to access location for AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  const isIntroRoute = location.pathname === '/';

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<IntroAnimation />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/case-study-1" element={<CaseStudy1 />} />
        <Route path="/case-study-id" element={<CaseStudyID />} />
        <Route path="/dither-playground" element={<DitherPlayground />} />
        <Route path="/pixelblast-playground" element={<PixelBlastPlayground />} />
        <Route path="/aurora-playground" element={<AuroraPlayground />} />
        <Route path="/gradualblur-playground" element={<GradualBlurPlayground />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

// Conditional Header wrapper
const ConditionalHeader = () => {
  const location = useLocation();
  const isIntroRoute = location.pathname === '/';

  // Don't show header on intro route (it's part of IntroAnimation)
  if (isIntroRoute) {
    return null;
  }

  return <Header />;
};

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <ConditionalHeader />
        <ScrollToTop />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
