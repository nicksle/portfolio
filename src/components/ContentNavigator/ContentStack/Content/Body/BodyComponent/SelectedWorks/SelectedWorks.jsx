import React from 'react';
import './SelectedWorks.css';

const SelectedWorks = ({ title, description, children }) => {
  return (
    <div className="selected-works-2col">
      <div className="selected-works-head">
        <h2 className="selected-works-title">{title}</h2>
        <p className="selected-works-description">{description}</p>
      </div>
      <div className="selected-works-body">
        {children}
      </div>
    </div>
  );
};

export default SelectedWorks;
