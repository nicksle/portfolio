import React, { useState } from 'react';
import './Card.css';

const S1_STYLE = {
  fontFamily: 'SF Mono, monospace',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--tertiary)'
};

const H3_STYLE = {
  fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  color: 'var(--active)'
};

const B2_STYLE = {
  fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
  fontSize: '20px',
  fontWeight: 400,
  color: 'var(--active)'
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
      <span className="card-index" style={S1_STYLE}>{index}</span>
      <div className="card-indent">
        <div className={`card-frame ${isExpanded ? 'expanded' : ''}`}>
          <div className="card-head">
            <div className="card-content">
              <div className="card-icon-wrapper">
                <img src={icon} alt="icon" className="card-icon" />
              </div>
              <h3 style={H3_STYLE}>{title}</h3>
              <p style={B2_STYLE}>{description}</p>
            </div>
            <div className="card-cta" onClick={handleCtaClick}>
              <span style={S1_STYLE}>{ctaText}</span>
              <div className="cta-icon-wrapper">
                <img src={ctaIcon} alt="cta" className="cta-icon" />
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