import React, { forwardRef } from 'react';
import './Body.css';

const Body = forwardRef(({ children, onScrollProgress }, ref) => {
  return (
    <div className="body" ref={ref}>
      {children}
      <div 
        className="body-overscroll-indicator"
        style={{
          opacity: onScrollProgress,
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 5L12 19M12 19L5 12M12 19L19 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
});

export default Body;
