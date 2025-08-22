import React from 'react';
import './Head.css';
import EyeIcon from '../../../../../assets/icons/EyeIcon';

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
  icon = EyeIcon,
  period = '2024',
  style = {}
}) => (
  <div className="head" style={style}>
    <div className="head-top">
      <span style={subtitleStyle}>{index}</span>
      <span style={subtitleStyle}>{subtitle}</span>
    </div>
    <div className="head-title">
      <span style={titleStyle}>{title}</span>
    </div>
    <div className="head-bottom">
      {icon && React.isValidElement(icon) ? 
        React.cloneElement(icon, { style: { width: 'var(--icon-size-small)', height: 'var(--icon-height-small)' } }) : 
        icon ? <img src={icon} alt="icon" style={{ width: 'var(--icon-size-small)', height: 'var(--icon-height-small)' }} /> : null
      }
      <span style={subtitleStyle}>{period}</span>
    </div>
  </div>
);

export default Head;
