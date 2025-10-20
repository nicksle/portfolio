import React, { Children, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Annotations from './Annotations';
import './BodyItem.css';

const BodyItem = ({ 
  id, 
  children,
  annotationItems, // Keep for backward compatibility
  annotationSets, // New prop for multiple annotation sets
  className = '' 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    once: false // Allow animation to repeat on scroll
  });

  // Helper function to render content with integrated annotations
  const renderContentWithAnnotations = () => {
    const childArray = Children.toArray(children);
    const result = [];
    let childIndex = 0;

    // If annotationSets is provided, use it
    if (annotationSets && annotationSets.length > 0) {
      annotationSets.forEach((annotationSet, setIndex) => {
        const { position, items } = annotationSet;
        
        // Add children before this annotation position
        while (childIndex < position && childIndex < childArray.length) {
          result.push(
            <div key={`child-${childIndex}`} className="body-item-child">
              {childArray[childIndex]}
            </div>
          );
          childIndex++;
        }
        
        // Add the annotation set
        if (items && items.length > 0) {
          result.push(
            <div key={`annotations-${setIndex}`} className="body-item-annotations">
              <Annotations annotationItems={items} />
            </div>
          );
        }
      });
      
      // Add any remaining children
      while (childIndex < childArray.length) {
        result.push(
          <div key={`child-${childIndex}`} className="body-item-child">
            {childArray[childIndex]}
          </div>
        );
        childIndex++;
      }
    } else {
      // Fallback to original behavior
      const processedChildren = Children.map(children, (child, index) => {
        return (
          <div key={index} className="body-item-child">
            {child}
          </div>
        );
      });
      result.push(...processedChildren);
    }

    return result;
  };

  return (
    <motion.div 
      ref={ref}
      className={`body-item ${className}`} 
      data-id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="body-item-content">
        {renderContentWithAnnotations()}
        {!annotationSets && annotationItems && annotationItems.length > 0 && (
          <div className="body-item-annotations">
            <Annotations annotationItems={annotationItems} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BodyItem;
