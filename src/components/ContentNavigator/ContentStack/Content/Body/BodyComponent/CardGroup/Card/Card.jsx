import React, { useState } from 'react';
import './Card.css';
import Icon from '../../../../../../../../components/Icon';
import { ICON_PATHS } from '../../../../../../../../utils/iconPaths';

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
                {icon || <Icon 
                  svgPath={ICON_PATHS.arrowRight} 
                  size="xl" 
                  className="card-icon"
                />}
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
                <Icon 
                  svgPath={ICON_PATHS.arrowRight} 
                  size="small" 
                  className="cta-icon"
                />
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