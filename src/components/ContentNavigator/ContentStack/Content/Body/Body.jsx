import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import './Body.css';
import NextButton from './BodyComponent/NextButton/NextButton';

const Body = forwardRef(({ children, onScrollProgress, onNextSection, showNextButton = true }, ref) => {
  return (
    <div className="body" ref={ref}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={child.key || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.6 + (index * 0.1), // Start after head animation, stagger each item
            ease: "easeOut"
          }}
        >
          {child}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.6 + (React.Children.count(children) * 0.1) + 0.2, // After all body items
          ease: "easeOut"
        }}
      >
        <NextButton 
          onClick={onNextSection}
          isVisible={showNextButton && onNextSection}
        />
      </motion.div>
    </div>
  );
});

export default Body;
