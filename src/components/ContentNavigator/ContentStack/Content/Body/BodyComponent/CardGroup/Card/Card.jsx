import React, { useState } from 'react';
import './Card.css';

// Helper function to render SVG icons
const renderIcon = (icon, className) => {
  console.log('renderIcon called with:', icon, 'type:', typeof icon, 'isValidElement:', React.isValidElement(icon));
  
  if (typeof icon === 'string' && icon.endsWith('.svg')) {
    // For SVG files, we need to use img tag but can't style with color
    console.log('Rendering as SVG file with img tag');
    return <img src={icon} alt="icon" className={className} />;
  } else if (React.isValidElement(icon)) {
    // For React SVG components, clone with className
    console.log('Rendering as React component with cloneElement');
    return React.cloneElement(icon, { className });
  } else {
    // Fallback for other cases
    console.log('Rendering as fallback with img tag');
    return <img src={icon} alt="icon" className={className} />;
  }
};

// Styles using CSS custom properties - consistent with Text component
const textStyles = {
  index: {
    fontFamily: 'var(--font-family-subtitle)',
    fontSize: 'var(--font-size-subtitle)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-tertiary)'
  },
  heading: {
    fontFamily: 'var(--font-family-title)',
    fontSize: 'var(--font-size-title-base)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-primary)'
  },
  body: {
    fontFamily: 'var(--font-family-body)',
    fontSize: 'var(--font-size-body-sm)',
    fontWeight: 'var(--font-weight-regular)',
    color: 'var(--color-primary)'
  }
};

const Card = ({ 
  index,
  icon,
  title,
  description,
  ctaText,
  ctaIcon,
  children,
  onExpand,
  isExpanded: controlledExpanded,
  className = '',
  style = {} 
}) => {
  console.log('Card props - icon:', icon, 'icon type:', typeof icon, 'icon isValidElement:', React.isValidElement(icon));
  console.log('Card props - ctaIcon:', ctaIcon, 'ctaIcon type:', typeof ctaIcon, 'ctaIcon isValidElement:', React.isValidElement(ctaIcon));
  
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleCtaClick = () => {
    const newExpandedState = !isExpanded;
    if (controlledExpanded === undefined) {
      setInternalExpanded(newExpandedState);
    }
    onExpand?.(newExpandedState);
  };

  return (
    <div className={`card ${isExpanded ? 'expanded' : ''} ${className}`}>
      <span className="card-index" style={textStyles.index}>{index}</span>
      <div className="card-indent">
        <div className={`card-frame ${isExpanded ? 'expanded' : ''}`}>
          <div className="card-head">
            <div className="card-content">
              <div className="card-icon-wrapper">
                <svg className="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4 11L4 13L16 13L16 15L18 15L18 13L20 13L20 11L18 11L18 9L16 9L16 11L4 11ZM14 7L16 7L16 9L14 9L14 7ZM14 7L12 7L12 5L14 5L14 7ZM14 17L16 17L16 15L14 15L14 17ZM14 17L12 17L12 19L14 19L14 17Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 style={textStyles.heading}>{title}</h3>
              <p 
                style={textStyles.body}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            <div className="card-cta" onClick={handleCtaClick}>
              <span className="cta-text" style={textStyles.index}>{ctaText}</span>
              <div className="cta-icon-wrapper">
                <svg className="cta-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4 11L4 13L16 13L16 15L18 15L18 13L20 13L20 11L18 11L18 9L16 9L16 11L4 11ZM14 7L16 7L16 9L14 9L14 7ZM14 7L12 7L12 5L14 5L14 7ZM14 17L16 17L16 15L14 15L14 17ZM14 17L12 17L12 19L14 19L14 17Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="body-scroll">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card; 