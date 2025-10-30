import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './IntroAnimation.css';
import Header from '../../Header/Header';
import Intro1 from './Intro1/Intro1';
import Intro2 from './Intro2/Intro2';

const IntroAnimation = () => {
  const navigate = useNavigate();
  const [animationPhase, setAnimationPhase] = useState('initial');
  // Phases: 'initial' | 'expandX' | 'expandY' | 'intro1' | 'intro2' | 'navigating'

  // Auto-trigger animation sequence on mount
  useEffect(() => {
    // Initial delay before starting expansion
    const timer1 = setTimeout(() => {
      setAnimationPhase('expandX');
    }, 500);

    // After horizontal expansion, trigger vertical
    const timer2 = setTimeout(() => {
      setAnimationPhase('expandY');
    }, 1400); // 500ms initial + 600ms expandX + 300ms delay

    // After vertical expansion, set to intro1 (user can interact)
    const timer3 = setTimeout(() => {
      setAnimationPhase('intro1');
    }, 2000); // 1400ms + 600ms expandY

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const scrollToIntro2 = () => {
    setAnimationPhase('intro2');
  };

  const navigateToWork = () => {
    setAnimationPhase('navigating');

    // Timeline:
    // 0.0s - 0.8s: ViewContainer translates out of view
    // 0.8s: Navigate to /work

    setTimeout(() => {
      navigate('/work');
    }, 800); // Navigate after translate completes
  };

  // Calculate ViewContainer dimensions based on phase
  const getContainerDimensions = () => {
    switch (animationPhase) {
      case 'initial':
        return { width: 450, height: 150 }; // SVG cell only (3 cells × 1 row)
      case 'expandX':
        return { width: 1200, height: 150 }; // Full width, still 1 row
      case 'expandY':
      case 'intro1':
        return { width: 1200, height: 600 }; // Full Intro1
      case 'intro2':
        return { width: 1200, height: 664 }; // Intro2 + Header
      case 'navigating':
        return { width: 1200, height: 664 }; // Maintain size while exiting
      default:
        return { width: 450, height: 150 };
    }
  };

  const dimensions = getContainerDimensions();

  return (
    <div className="intro-animation">
      <motion.div
        className={`view-container ${animationPhase === 'navigating' ? 'exiting' : ''}`}
        animate={{
          width: dimensions.width,
          height: dimensions.height
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="intro-content"
          animate={{
            translateY: animationPhase === 'intro1' || animationPhase === 'expandY' || animationPhase === 'expandX' || animationPhase === 'initial' ? 0 : animationPhase === 'intro2' ? -600 : -1200
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut"
          }}
        >
          {/* Intro1 Section */}
          <Intro1 onNext={scrollToIntro2} />

          {/* Intro2 Section */}
          <Intro2 />

          {/* Header Section */}
          <Header
            isIntroMode={true}
            onWorkClick={navigateToWork}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroAnimation;
