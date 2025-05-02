import React from 'react';
import './NavTabItem.css';
import EyeIcon from '../../../assets/icons/eye.svg';
import EyeClosedIcon from '../../../assets/icons/eye-closed.svg';

const S1_STYLE = {
  fontFamily: 'SF Mono, monospace',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--tertiary)'
};

const NavTabItem = ({ 
  id, 
  isActive, 
  onClick, 
  title,
  index = ''
}) => {
  return (
    <div
      className={`nav-tab-item ${isActive ? 'active' : ''}`}
      role="tab"
      tabIndex={0}
      onClick={() => onClick(id)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick(id)}
    >
      <div className="navtab-item-top">
        <span style={S1_STYLE}>{index}</span>
      </div>
      <div className="navtab-item-title">
        <span>{title}</span>
      </div>
      <div className="navtab-item-bottom">
        <img
          src={isActive ? EyeIcon : EyeClosedIcon}
          alt={isActive ? 'eye open' : 'eye closed'}
          className={`navtab-eye-svg${isActive ? ' active' : ''}`}
          height={12}
        />
      </div>
    </div>
  );
};

export default NavTabItem; 