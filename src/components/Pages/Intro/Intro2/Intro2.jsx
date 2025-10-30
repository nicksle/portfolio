import React from 'react';
import './Intro2.css';

const Intro2 = () => {
  return (
    <div className="intro2-section">
      {/* Row 1 */}
      <div className="grid-cell text-r1">
        <span>I'm a product designer</span>
      </div>
      <div className="grid-cell blank-r1-c6"></div>
      <div className="grid-cell image-r1r2">
        <span>Image</span>
      </div>

      {/* Row 2 */}
      <div className="grid-cell blank-r2-c1"></div>
      <div className="grid-cell blank-r2-c2"></div>
      <div className="grid-cell text-r2">
        <span>queer creative</span>
      </div>

      {/* Row 3 */}
      <div className="grid-cell blank-r3-c1">
        <span>&</span>
      </div>
      <div className="grid-cell text-r3">
        <span>pop music enthusiast</span>
      </div>
      <div className="grid-cell blank-r3-c7"></div>
      <div className="grid-cell blank-r3-c8"></div>

      {/* Row 4 */}
      <div className="grid-cell blank-r4-c1"></div>
      <div className="grid-cell blank-r4-c2"></div>
      <div className="grid-cell blank-r4-c3"></div>
      <div className="grid-cell text-r4">
        <span>based in San Francisco</span>
      </div>
    </div>
  );
};

export default Intro2;
