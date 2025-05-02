import React, { forwardRef } from 'react';
import './Body.css';

const Body = forwardRef(({ children, onScrollProgress }, ref) => {
  return (
    <div className="body" ref={ref}>
      {children}
      <div className="body-loading-bar">
        <div className="body-loading-progress" style={{ width: `${onScrollProgress}%` }} />
      </div>
    </div>
  );
});

export default Body;
