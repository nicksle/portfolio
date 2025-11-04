import React, { useState, useEffect, useRef, useLayoutEffect, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ContentNavigator.css';
import Icon from '../Icon/Icon';
import { ICON_PATHS } from '../../utils/iconPaths';

// ContentNavigatorButton component - supports different button types
export const ContentNavigatorButton = ({
  type = 'next', // 'next', 'back', 'up'
  onClick,
  isVisible = true,
  className = '',
  style = {}
}) => {
  if (!isVisible) return null;

  const buttonConfig = {
    next: {
      text: 'Next Section',
      icon: ICON_PATHS.arrowRight
    },
    back: {
      text: 'Previous Section',
      icon: ICON_PATHS.arrowRight // Will be rotated via CSS
    },
    up: {
      text: 'Back to Top',
      icon: ICON_PATHS.arrowDown // Will be rotated via CSS
    }
  };

  const config = buttonConfig[type] || buttonConfig.next;

  return (
    <div className={`content-navigator-button-container ${className}`} style={style}>
      <button
        className={`content-navigator-button content-navigator-button-${type}`}
        onClick={onClick}
      >
        <span className="content-navigator-button-text">{config.text}</span>
        <Icon
          svgPath={config.icon}
          size="small"
          className="content-navigator-button-icon"
        />
      </button>
    </div>
  );
};

const ContentNavigator = ({ children, activeId, enableAnimations = true }) => {
  // Separate children into TabNav and content
  const childrenArray = Children.toArray(children);
  const tabNav = childrenArray.find(child => child.props?.className?.includes?.('tab-nav') || child.type?.name === 'TabNav');
  const content = childrenArray.filter(child => child !== tabNav);

  // Simple render without built-in animations - let parent pages handle animations
  return (
    <div className="content-navigator">
      {tabNav}
      {content}
    </div>
  );
};

export default ContentNavigator;
