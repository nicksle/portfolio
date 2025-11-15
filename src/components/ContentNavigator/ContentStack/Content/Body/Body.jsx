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
        {children}
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
