import React from 'react';
import './Head.css';

const subtitleStyle = {
  fontFamily: 'var(--font-family-subtitle)',
  fontSize: 'var(--font-size-subtitle)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-tertiary)'
};

const titleStyle = {
  fontFamily: 'var(--font-family-title)',
  fontSize: 'var(--font-size-title-1)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-primary)'
};

const Head = ({
  index = '01',
  subtitle = 'Subtitle',
  title = 'Dummy Title',
  icon = null,
  secondIcon = null,
  period = '2024',
  style = {}
}) => {
  // Handle icon rendering
  const renderIcon = () => {
    if (!icon) return null;
    
    // If icon is a React component (function), render it
    if (typeof icon === 'function') {
      const IconComponent = icon;
      return <IconComponent style={{ width: 'var(--icon-size-small)', height: 'var(--icon-height-small)' }} />;
    }
    
    // If icon is already a React element, clone it with styles
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { 
        style: { 
          width: 'var(--icon-size-small)', 
          height: 'var(--icon-height-small)' 
        } 
      });
    }
    
    // If icon is a string (image src), render as img
    if (typeof icon === 'string') {
      return <img src={icon} alt="icon" style={{ width: 'var(--icon-size-small)', height: 'var(--icon-height-small)' }} />;
    }
    
    return null;
  };

  // Handle second icon rendering
  const renderSecondIcon = () => {
    if (!secondIcon) return null;
    
    // If secondIcon is a React component (function), render it
    if (typeof secondIcon === 'function') {
      const IconComponent = secondIcon;
      return <IconComponent style={{ width: 'var(--icon-size-small)', height: 'var(--icon-height-small)' }} />;
    }
    
    // If secondIcon is already a React element, clone it with styles
    if (React.isValidElement(secondIcon)) {
      return React.cloneElement(secondIcon, { 
        style: { 
          width: 'var(--icon-size-small)', 
          height: 'var(--icon-height-small)' 
        } 
      });
    }
    
    // If secondIcon is a string (image src), render as img
    if (typeof secondIcon === 'string') {
      return <img src={secondIcon} alt="second icon" style={{ width: 'var(--icon-size-small)', height: 'var(--icon-height-small)' }} />;
    }
    
    return null;
  };

  return (
    <div className="head" style={style}>
      <div className="head-top">
        <span style={subtitleStyle}>{index}</span>
        <span style={subtitleStyle}>{subtitle}</span>
      </div>
      <div className="head-title">
        <span style={titleStyle}>{title}</span>
      </div>
      <div className="head-bottom">
        {renderIcon()}
        {renderSecondIcon()}
      </div>
    </div>
  );
};

export default Head;
