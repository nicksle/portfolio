import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Intro1.css';
import { LayeredLogo } from '../../../Logo';
import Nick01 from '../../../../assets/Intro2/Nick/Nick01.jpg';
import Nick02 from '../../../../assets/Intro2/Nick/Nick02.jpg';
import Island from '../../../../assets/Intro2/MacScreen/Island.svg';
import Sun from '../../../../assets/Intro2/MacScreen/Sun.svg';

const Intro1 = ({ onNext, onLogoHover }) => {
  const [isImageHovered, setIsImageHovered] = useState(false);

  return (
    <div className="intro1-section">
      {/* Row 1 */}
      <div className="grid-cell svg-cell" onMouseEnter={onLogoHover}>
        <LayeredLogo size="large" />
      </div>
      <div className="grid-cell text-r1">
        <span>nkle.design</span>
      </div>

      {/* Row 2 */}
      <div className="grid-cell text-r2">
        <span>Hello world!</span>
        <div className="carousel">
          <div className="carousel-content">
            <span>Hello World</span>
            <span>¡Hola Mundo!</span>
            <span>Xin chào thế giới!</span>
            <span>Bonjour le monde</span>
            <span>Hallo Welt</span>
            <span>Hello World</span>
            <span>¡Hola Mundo!</span>
            <span>Xin chào thế giới!</span>
            <span>Bonjour le monde</span>
            <span>Hallo Welt</span>
          </div>
        </div>
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
      <div className="grid-cell blank-r4-c7">
        <svg className="laptop-icon" width="116" height="122" viewBox="0 0 116 122" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="screen-clip">
              <rect x="18" y="20" width="80" height="57" />
            </clipPath>
          </defs>

          <g clipPath="url(#screen-clip)">
            <rect className="laptop-screen" x="18" y="20" width="80" height="57" />
            <image
              className="laptop-screen-island"
              href={Island}
              x="22"
              y="39"
              width="72"
              height="31"
            />
            <image
              className="laptop-screen-sun"
              href={Sun}
              x="78"
              y="24"
              width="14"
              height="14"
            />
          </g>

          <path className="laptop-path" d="M116 108H108V122H8V108H0V0H116V108ZM12 118H104V108H12V118ZM4 104H112V4H4V104ZM102 94H61V90H102V94ZM102 81H14V16H102V81ZM18 77H98V20H18V77Z" />
        </svg>
      </div>
      <div className="grid-cell blank-r4-c8 clickable" onClick={onNext}>
        <span>→</span>
      </div>
    </div>
  );
};

export default Intro1;
