import React from 'react';
import './Tile.css';
import Text from '../Text/Text';

const H3_STYLE = {
  fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  color: 'var(--active)'
};

const B3_STYLE = {
  fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: 'var(--active)'
};

const S1_STYLE = {
  fontFamily: 'SF Mono, monospace',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--tertiary)'
};

const Tile = ({ 
  index,
  title,
  bottomLeft,
  bottomRight,
  body,
  className = '',
  style = {},
  icon
}) => {
  return (
    <div className={`tile ${className}`} style={style}>
      <div className="tile-head">
        <div className="tile-head-top">
          <span style={S1_STYLE}>{index}</span>
          <div className="tile-head-icon">
            {icon || <div className="tile-icon-placeholder" />}
          </div>
        </div>
        <div className="tile-head-title">
          <Text style="H3">{title}</Text>
        </div>
        <div className="tile-head-bottom">
          {bottomLeft}
          {bottomRight}
        </div>
      </div>
      <div className="tile-divider" />
      <div className="tile-body">
        <div 
          className="tile-body-text"
          style={B3_STYLE}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>
  );
};

export default Tile;
