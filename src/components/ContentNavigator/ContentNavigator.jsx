import React from 'react';
import './ContentNavigator.css';

const ContentNavigator = ({ children }) => {
  return (
    <div className="content-navigator">
      {children}
    </div>
  );
};

export default ContentNavigator;
