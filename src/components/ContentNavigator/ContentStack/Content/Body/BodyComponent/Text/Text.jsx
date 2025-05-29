import React from 'react';
import './Text.css';

const STYLES = {
  H1: {
    fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
    fontSize: '64px',
    fontWeight: 500,
    color: 'var(--active)',
    lineHeight: 1.2
  },
  H2: {
    fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
    fontSize: '48px',
    fontWeight: 500,
    color: 'var(--active)',
    lineHeight: 1.2
  },
  H3: {
    fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
    fontSize: '24px',
    fontWeight: 500,
    color: 'var(--active)',
    lineHeight: 1.2
  },
  B1: {
    fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
    fontSize: '32px',
    fontWeight: 400,
    color: 'var(--active)',
    lineHeight: 1.2
  },
  B2: {
    fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
    fontSize: '20px',
    fontWeight: 400,
    color: 'var(--active)',
    lineHeight: 1.2
  },
  B3: {
    fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    color: 'var(--active)',
    lineHeight: 1.2
  },
  S1: {
    fontFamily: 'SF Mono, monospace',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--tertiary)',
    lineHeight: 1.2
  }
};

const Text = ({ 
  children, 
  style = 'B1' 
}) => {
  const textStyle = typeof style === 'string' ? STYLES[style] || STYLES.B1 : style;

  return (
    <p 
      className="text-component" 
      style={textStyle}
    >
      {children}
    </p>
  );
};

export default Text;
