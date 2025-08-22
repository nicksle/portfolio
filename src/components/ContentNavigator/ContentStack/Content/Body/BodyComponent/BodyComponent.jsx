import React, { Children, cloneElement } from 'react';
import './BodyComponent.css';

const BodyComponent = ({ 
  children, 
  rows = 1, // Default to 1 row
  style = {} 
}) => {
  // Wrap children with fade-in animation classes
  const enhancedChildren = Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      // Determine the component type for specific animation delays
      let componentType = 'default';
      if (child.type && child.type.name) {
        const componentName = child.type.name.toLowerCase();
        if (componentName.includes('tile')) componentType = 'tile';
        else if (componentName.includes('cardgroup')) componentType = 'card-group';
        else if (componentName.includes('card')) componentType = 'card';
        else if (componentName.includes('text')) componentType = 'text';
        else if (componentName.includes('image')) componentType = 'image';
        else if (componentName.includes('fullcard')) componentType = 'full-card';
      }
      
      // Special handling for CardGroup - don't wrap it since it handles its own cards
      if (componentType === 'card-group') {
        return child;
      }
      
      // Don't wrap Card components that already have fade-in classes (from CardGroup)
      if (componentType === 'card' && child.props.className && child.props.className.includes('fade-in-item')) {
        return child;
      }
      
      // Ensure FullCard gets proper fade-in treatment
      if (componentType === 'full-card') {
        return cloneElement(child, {
          className: `fade-in-item full-card ${child.props.className || ''}`.trim(),
          key: child.key || index
        });
      }
      
      return cloneElement(child, {
        className: `fade-in-item ${componentType} ${child.props.className || ''}`.trim(),
        key: child.key || index
      });
    }
    return child;
  });

  return (
    <div 
      className="body-component" 
      style={{
        ...style,
        gridTemplateRows: `repeat(${rows}, auto)`,
      }}
    >
      {enhancedChildren}
    </div>
  );
};

export default BodyComponent;
