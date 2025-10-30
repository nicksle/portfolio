import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './IntroAnimation.css';
import Header from '../../Header/Header';
import Intro1 from './Intro1/Intro1';
import Intro2 from './Intro2/Intro2';

const IntroAnimation = () => {
  const navigate = useNavigate();
  const [animationPhase, setAnimationPhase] = useState('intro1');
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  // Phases: 'intro1' | 'intro2' | 'navigating' | 'header-transitioning'

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

  return (
    <div className="intro-animation">
      <motion.div
        className={`view-container ${animationPhase === 'intro2' ? 'expanded' : ''} ${animationPhase === 'navigating' ? 'exiting' : ''}`}
        initial={{ height: 600 }}
      >
        <motion.div
          className="intro-content"
          animate={{
            translateY: animationPhase === 'intro1' ? 0 : animationPhase === 'intro2' ? -600 : -1200
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
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
