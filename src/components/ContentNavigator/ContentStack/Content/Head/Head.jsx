import React from 'react';
import './Head.css';

/**
 * Head Component - Flexible content header with configurable layout
 * 
 * @example
 * // Default layout (current behavior)
 * <Head 
 *   index="01" 
 *   title="TANDA" 
 *   icon={lightbulbIcon} 
 *   period="2024" 
 *   position="Senior Product Designer" 
 * />
 * 
 * @example
 * // Custom layout - swap subtitle and period positions
 * <Head 
 *   index="01" 
 *   subtitle="Product Design" 
 *   title="TANDA" 
 *   icon={lightbulbIcon} 
 *   secondIcon={searchIcon}
 *   period="2024" 
 *   position="Senior Product Designer"
 *   topLeft="subtitle"
 *   topRight="period"
 *   bottomLeft="secondIcon"
 *   bottomRight="position"
 * />
 */

const Head = ({ 
  // Content data
  index, 
  subtitle, 
  title, 
  icon, 
  secondIcon, 
  period, 
  position, 
  style,
  // NEW: Mapping props (optional, with defaults)
  topLeft = "index",
  topRight = "position", 
  bottomLeft = "icon",
  bottomRight = "period"
}) => {
  const subtitleStyle = {
    fontFamily: 'var(--font-family-subtitle)',
    fontSize: 'var(--font-size-subtitle)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-tertiary)'
  };

  const titleStyle = {
    fontFamily: 'var(--font-family-title)',
    fontSize: 'var(--font-size-title-xxl)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-primary)'
  };

  // Content mapping object
  const contentMap = {
    index,
    subtitle,
    title,
    icon,
    secondIcon,
    period,
    position
  };

  // Helper function to render content based on mapping
  const renderContent = (contentKey) => {
    const content = contentMap[contentKey];
    
    // Handle icon content
    if (contentKey === 'icon' || contentKey === 'secondIcon') {
      if (!content) return null;
      
      return (
        <div className="head-icon-wrapper">
          <div className="head-icon">
            {React.isValidElement(content) ? (
              <div className="head-icon-svg">
                {content}
              </div>
            ) : (
              <img src={content} alt="icon" className="head-icon-img" />
            )}
          </div>
        </div>
      );
    }
    
    // Handle text content
    return content ? <span style={subtitleStyle}>{content}</span> : null;
  };

  return (
    <div className="head" style={style}>
      <div className="head-top">
        {renderContent(topLeft)}
        {renderContent(topRight)}
      </div>
      <div className="head-title">
        <span style={titleStyle}>{title}</span>
      </div>
      <div className="head-bottom">
        {renderContent(bottomLeft)}
        {renderContent(bottomRight)}
      </div>
    </div>
  );
};

export default Head;
