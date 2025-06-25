import React, { forwardRef } from 'react';
import './Body.css';

const Body = forwardRef(({ children, onScrollProgress }, ref) => {
  return (
    <div className="body" ref={ref}>
      {children}
    </div>
  );
});

export default Body;
