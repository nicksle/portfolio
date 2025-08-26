import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkItem.css';
import Icon from '../../../../../../../../components/Icon';
import { ICON_PATHS } from '../../../../../../../../utils/iconPaths';

const WorkItem = ({ index, image, title, description, navigateTo, onCtaClick }) => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (onCtaClick) {
      // Use custom click handler if provided
      onCtaClick();
    } else if (navigateTo) {
      // Fall back to default navigation behavior
      navigate(navigateTo);
    }
  };

  return (
    <div className="work-item-root">
      <div className="work-item-index S1">{index}</div>
      <div className="work-item-indent">
        <div className="work-item-card-frame">
          <div className="work-item-card-head">
            <div className="work-item-image">
              <img src={image} alt={title} />
            </div>
            <div className="work-item-card-content">
              <div className="work-item-title H3">{title}</div>
              <div className="work-item-description B2">{description}</div>
            </div>
          </div>
          <div className={`work-item-cta ${(navigateTo || onCtaClick) ? 'clickable' : ''}`} onClick={handleCtaClick}>
            <span className="work-item-cta-text S1">Read More</span>
            <span className="work-item-arrow">
              <Icon 
                svgPath={ICON_PATHS.arrowRightSimple} 
                size="small" 
                className="work-item-arrow-icon"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkItem; 