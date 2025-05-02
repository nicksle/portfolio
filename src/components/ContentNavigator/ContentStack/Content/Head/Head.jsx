import React from 'react';
import './Head.css';
import IconSvg from '../../../../../assets/icons/eye.svg'; // Corrected path

const S1_STYLE = {
  fontFamily: 'SF Mono, monospace',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--tertiary)'
};

const H1_STYLE = {
  fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
  fontSize: '64px',
  fontWeight: 500,
  color: 'var(--active)'
};

const Head = ({
  index = '01',
  subtitle = 'Subtitle',
  title = 'Dummy Title',
  icon = IconSvg,
  period = '2024',
  style = {}
}) => (
  <div className="head" style={style}>
    <div className="head-top">
      <span style={S1_STYLE}>{index}</span>
      <span style={S1_STYLE}>{subtitle}</span>
    </div>
    <div className="head-title">
      <span style={H1_STYLE}>{title}</span>
    </div>
    <div className="head-bottom">
      <img src={icon} alt="icon" style={{ width: 24, height: 16 }} />
      <span style={S1_STYLE}>{period}</span>
    </div>
  </div>
);

export default Head;
