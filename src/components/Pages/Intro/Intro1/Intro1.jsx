import React, { useState } from 'react';
import './Intro1.css';
import gmLogo from '../../../../assets/logo/GMLogo.svg';
import Nick01 from '../../../../assets/Intro2/Nick/Nick01.jpg';
import Nick02 from '../../../../assets/Intro2/Nick/Nick02.jpg';

const Intro1 = ({ onNext }) => {
  const [isImageHovered, setIsImageHovered] = useState(false);

  return (
    <div className="intro1-section">
      {/* Row 1 */}
      <div className="grid-cell svg-cell">
        <img src={gmLogo} alt="GM Logo" className="logo-svg" />
      </div>
      <div className="grid-cell text-r1">
        <span>nkle.design</span>
      </div>

      {/* Row 2 */}
      <div className="grid-cell text-r2">
        <span>Hello world!</span>
      </div>
      <div className="grid-cell blank-r2-c5" id="Circles">
        <div className="circle circle-tl"></div>
        <div className="circle circle-tr"></div>
        <div className="circle circle-bl"></div>
        <div className="circle circle-br"></div>
      </div>
      <div
        className="grid-cell image-cell"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <img
          src={isImageHovered ? Nick02 : Nick01}
          alt="Nick"
          className="nick-image"
        />
      </div>

      {/* Row 3 */}
      <div className="grid-cell blank-r3-c1">
        <div className="rectangle rect-0"></div>
        <div className="rectangle rect-1"></div>
        <div className="rectangle rect-2"></div>
        <div className="rectangle rect-3"></div>
        <div className="rectangle rect-4"></div>
        <div className="rectangle rect-5"></div>
        <div className="rectangle rect-6"></div>
      </div>
      <div className="grid-cell text-r3">
        <div className="text-r3-content">
          <span>My names Nick<span className="asterisk">*</span></span>
          <span className="subtitle-text">*Nicholas Nhan-Vinh Le</span>
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid-cell text-r4">
        <div className="text-r4-content">
          <div className="text-r4-main">
            <div className="text-prefix">
              <p>Welcome to my </p>
            </div>
            <div className="text-island-container">
              <span className="text-island">website</span>
              <span className="text-island">island</span>
            </div>
          </div>
          <p className="text-r4-subtitle">Hope you like it. You ain't leaving</p>
        </div>
      </div>
      <div className="grid-cell blank-r4-c7"></div>
      <div className="grid-cell blank-r4-c8 clickable" onClick={onNext}>
        <span>→</span>
      </div>
    </div>
  );
};

export default Intro1;
