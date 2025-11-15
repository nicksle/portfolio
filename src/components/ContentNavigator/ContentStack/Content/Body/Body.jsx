import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import './Body.css';
import { ContentNavigatorButton } from '../../../ContentNavigator';

const Body = forwardRef(({
  children,
  onScrollProgress,
  onNextSection,
  onBackSection,
  onScrollToTop,
  showNextButton = true,
  showBackButton = false,
  currentIndex = null,
  nextIndex = null,
  previousIndex = null
}, ref) => {
  return (
    <>
      <div
        className="body"
        ref={ref}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px", amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
      <ContentNavigatorButton
        onScrollToTop={onScrollToTop}
        onBackSection={onBackSection}
        onNextSection={onNextSection}
        showBackButton={showBackButton}
        showNextButton={showNextButton}
        currentIndex={currentIndex}
        previousIndex={previousIndex}
        nextIndex={nextIndex}
      />
    </>
  );
});

export default Body;
