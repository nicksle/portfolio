import React from 'react';
import './Text.css';

const B1_STYLE = {
  fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
  fontSize: '32px',
  fontWeight: 400,
  color: 'var(--active)',
  lineHeight: 1.2
};

const Text = ({ 
  children, 
  style = {} 
}) => {
  return (
    <p 
      className="text-component" 
      style={{
        ...B1_STYLE,
        ...style
      }}
    >
      {children}
    </p>
  );
};

export default Text;
