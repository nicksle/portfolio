import React from 'react';
import './FullCard.css';

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

const FullCard = ({ 
  index,
  icon = null,
  title,
  description,
  ctaText,
  ctaIcon,
  children,
  style = {} 
}) => {
  return (
    <div className="full-card">
      <span className="full-card-index" style={S1_STYLE}>{index}</span>
      <div className="full-card-indent">
        <div className="full-card-frame">
          <div className="full-card-head">
            <div className="full-card-content">
              {icon && <img src={icon} alt="icon" className="full-card-icon" />}
              <h3 style={H3_STYLE}>{title}</h3>
              <p style={B2_STYLE}>{description}</p>
            </div>
            <div className="full-card-cta">
              <span style={S1_STYLE}>{ctaText}</span>
              <img src={ctaIcon} alt="cta" className="full-card-cta-icon" />
            </div>
          </div>
          <div className="full-card-body">
            <div className="full-card-body-scroll">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCard;
