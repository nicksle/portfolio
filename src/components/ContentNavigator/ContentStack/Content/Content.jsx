import React, { useState, useRef, useEffect } from 'react';
import './Content.css';
import Head from './Head/Head';
import Body from './Body/Body';
import BodyComponent from './Body/BodyComponent/BodyComponent';
import Text from './Body/BodyComponent/Text/Text';
import Image from './Body/BodyComponent/Image/Image';
import Card from './Body/BodyComponent/CardGroup/Card/Card';
import CardGroup from './Body/BodyComponent/CardGroup/CardGroup';
import FullCard from './Body/BodyComponent/FullCard/FullCard';
import IconSvg from '../../../../assets/icons/eye.svg';

const Content = ({ isActive = false, id, index, subtitle, title, icon, period, children, onNext }) => {
  const [headOpacity, setHeadOpacity] = useState(1);
  const contentRef = useRef(null);
  const bodyRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reset all states when content becomes inactive
  useEffect(() => {
    if (!isActive) {
      // Reset scroll position
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
      
      // Reset all states
      setScrollProgress(0);
      setHeadOpacity(1);
      setIsScrolling(false);

      // Reset any expanded cards
      const expandedCards = document.querySelectorAll('.card-frame.expanded');
      expandedCards.forEach(card => {
        card.classList.remove('expanded');
        // Reset the card's internal state
        const cardElement = card.closest('.card');
        if (cardElement) {
          cardElement.classList.remove('expanded');
          cardElement.classList.remove('unexpanded');
        }
      });

      // Reset any unexpanded cards
      const unexpandedCards = document.querySelectorAll('.card.unexpanded');
      unexpandedCards.forEach(card => {
        card.classList.remove('unexpanded');
      });

      // Reset any active states in body components
      const activeComponents = document.querySelectorAll('.body-component.active');
      activeComponents.forEach(component => {
        component.classList.remove('active');
      });

      // Reset any expanded full cards
      const expandedFullCards = document.querySelectorAll('.full-card.expanded');
      expandedFullCards.forEach(card => {
        card.classList.remove('expanded');
      });

      // Reset any hover states
      const hoveredElements = document.querySelectorAll(':hover');
      hoveredElements.forEach(element => {
        element.blur();
      });

      // Reset any scroll positions in body scroll containers
      const bodyScrolls = document.querySelectorAll('.body-scroll');
      bodyScrolls.forEach(scroll => {
        scroll.scrollLeft = 0;
      });
    }
  }, [isActive]);

  const handleScroll = (e) => {
    if (!contentRef.current) return;
    
    const scrollTop = e.target.scrollTop;
    // Calculate opacity based on scroll position
    // Start fading at 0, completely fade out by 74px scroll
    const opacity = Math.max(0, Math.min(1, 1 - (scrollTop / 74)));
    setHeadOpacity(opacity);

    // Calculate overscroll progress
    const overscrollAmount = Math.abs(Math.min(0, scrollTop));
    const maxOverscroll = 24; // Maximum overscroll distance in pixels
    
    console.log('Overscroll Amount:', overscrollAmount);
    console.log('Scroll Top:', scrollTop);
    
    if (overscrollAmount >= maxOverscroll) {
      console.log('Reached max overscroll!');
      setScrollProgress(1);
    } else if (overscrollAmount > 0) {
      const progress = Math.min(1, overscrollAmount / maxOverscroll);
      console.log('Progress:', progress);
      setScrollProgress(progress);
    } else {
      setScrollProgress(0);
    }

    // Calculate distance from bottom for next content trigger
    const { scrollTop: currentScrollTop, scrollHeight, clientHeight } = e.target;
    const distanceFromBottom = scrollHeight - clientHeight - currentScrollTop;

    if (distanceFromBottom < 1 && !isScrolling && onNext) {
      setIsScrolling(true);
      // Add a small delay before triggering the next content
      setTimeout(() => {
        onNext();
        setIsScrolling(false);
      }, 500);
    }
  };

  return (
    <div 
      className={`content ${isActive ? 'active' : ''}`} 
      ref={contentRef}
      onScroll={handleScroll}
    >
      <Head
        index={index}
        subtitle={subtitle}
        title={title}
        icon={icon}
        period={period}
        style={{ 
          opacity: headOpacity,
          transition: 'opacity 0.1s linear' // Add smooth transition
        }}
      />
      <Body ref={bodyRef} onScrollProgress={scrollProgress}>
        {children}
      </Body>
    </div>
  );
};

export default Content; 