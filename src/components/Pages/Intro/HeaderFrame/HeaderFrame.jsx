import React, { useState, useEffect } from 'react';
import './HeaderFrame.css';
import Intro1 from './Intro1/Intro1';
import Intro2 from './Intro2/Intro2';

const HeaderFrame = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);

  useEffect(() => {
    const widthTimer = setTimeout(() => {
      setIsExpanded(true);
    }, 1000); // 1 second delay

    const heightTimer = setTimeout(() => {
      setIsHeightExpanded(true);
    }, 2000); // 2 seconds delay (1 second after width expansion)

    return () => {
      clearTimeout(widthTimer);
      clearTimeout(heightTimer);
    };
  }, []);

  return (
    <div className={`header-frame ${isExpanded ? 'expanded' : ''} ${isHeightExpanded ? 'height-expanded' : ''}`}>
      <Intro1 />
      <Intro2 />
    </div>
  );
};

export default HeaderFrame; 