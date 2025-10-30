import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import './Body.css';
import NextButton from './BodyComponent/NextButton/NextButton';

const Body = forwardRef(({ children, onScrollProgress, onNextSection, showNextButton = true }, ref) => {
  return (
    <motion.div
      className="body"
      ref={ref}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={child.key || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px", amount: 0.3 }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          {child}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px", amount: 0.3 }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      >
        <NextButton
          onClick={onNextSection}
          isVisible={showNextButton && onNextSection}
        />
      </motion.div>
    </motion.div>
  );
});

export default Body;
