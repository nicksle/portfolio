import React from 'react';
import './Intro1.css';

const Intro1 = ({ onNext }) => {
  return (
    <div className="intro1-section">
      {/* Row 1 */}
      <div className="grid-cell svg-cell">
        <span>SVG</span>
      </div>
      <div className="grid-cell text-r1">
        <span>nkle.design</span>
      </div>

      {/* Row 2 */}
      <div className="grid-cell text-r2">
        <span>hello world!</span>
      </div>
      <div className="grid-cell blank-r2-c5"></div>
      <div className="grid-cell image-cell">
        <span>Image</span>
      </div>

      {/* Row 3 */}
      <div className="grid-cell blank-r3-c1"></div>
      <div className="grid-cell text-r3">
        <span>My names Nick</span>
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
