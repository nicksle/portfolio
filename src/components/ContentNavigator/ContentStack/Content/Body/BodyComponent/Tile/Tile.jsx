import React from 'react';
import './Tile.css';
import Text from '../Text/Text';

const textStyles = {
  index: {
    fontFamily: 'var(--font-family-subtitle)',
    fontSize: 'var(--font-size-subtitle)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-tertiary)'
  },
  title: {
    fontFamily: 'var(--font-family-title)',
    fontSize: 'var(--font-size-title-base)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-primary)'
  },
  body: {
    fontFamily: 'var(--font-family-body)',
    fontSize: 'var(--font-size-body-xs)',
    fontWeight: 'var(--font-weight-regular)',
    color: 'var(--color-primary)'
  }
};

const defaultIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 7H2V9H0V7ZM4 11H2V9H4V11ZM8 13V11H4V13H2V15H4V13H8ZM16 13H8V15H6V17H8V15H16V17H18V15H16V13ZM20 11H16V13H20V15H22V13H20V11ZM22 9V11H20V9H22ZM22 9V7H24V9H22Z" fill="currentColor"/>
  </svg>
);

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
          <span style={textStyles.index}>{index}</span>
          <div className="tile-head-icon">
            {icon ? (
              <div className="tile-icon-svg">
                {icon}
              </div>
            ) : (
              <div className="tile-icon-svg">
                {defaultIcon}
              </div>
            )}
          </div>
        </div>
        <div className="tile-head-title">
          <Text style="titleBase">{title}</Text>
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
          style={textStyles.body}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>
  );
};

export default Tile;
