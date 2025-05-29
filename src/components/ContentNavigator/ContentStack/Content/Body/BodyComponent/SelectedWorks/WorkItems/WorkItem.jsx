import React from 'react';
import './WorkItem.css';

const WorkItem = ({ index, image, title, description }) => {
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
          <div className="work-item-cta">
            <span className="work-item-cta-text S1">Read More</span>
            <span className="work-item-cta-arrow">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkItem; 