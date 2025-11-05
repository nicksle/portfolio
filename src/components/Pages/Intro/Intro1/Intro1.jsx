import React from 'react';
import './Intro1.css';
import gmLogo from '../../../../assets/logo/GMLogo.svg';

const Intro1 = ({ onNext }) => {
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
      <div className="grid-cell image-cell">
        <span>Image</span>
      </div>

      {/* Row 3 */}
      <div className="grid-cell blank-r3-c1"></div>
      <div className="grid-cell text-r3">
        <div className="text-r3-content">
          <span>My names Nick<span className="asterisk">*</span></span>
          <span className="subtitle-text">*Nicholas Nhan-Vinh Le</span>
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid-cell text-r4">
        <span>Welcome to my website</span>
      </div>
      <div className="grid-cell blank-r4-c7"></div>
      <div className="grid-cell blank-r4-c8 clickable" onClick={onNext}>
        <span>→</span>
      </div>
    </div>
  );
};

export default Intro1;
