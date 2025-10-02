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


const Content = ({ isActive = false, id, index, subtitle, title, icon, secondIcon, period, position, children, onNext }) => {
  const [headOpacity, setHeadOpacity] = useState(1);
  const contentRef = useRef(null);
  const bodyRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    if (!isActive) return;

    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Start animation slightly before element enters viewport
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log('Intersection observed:', entry.target.className, 'isIntersecting:', entry.isIntersecting);
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          console.log('Added fade-in-visible to:', entry.target.className);
          // Once animation is complete, unobserve to improve performance
          setTimeout(() => {
            fadeInObserver.unobserve(entry.target);
          }, 1000);
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Observe all content items that should fade in
      const contentItems = contentRef.current?.querySelectorAll('.fade-in-item:not(.fade-in-visible)');
      if (contentItems && contentItems.length > 0) {
        contentItems.forEach(item => {
          fadeInObserver.observe(item);
          console.log('Observing item:', item.className, 'opacity:', window.getComputedStyle(item).opacity);
        });
        console.log(`Observing ${contentItems.length} fade-in items`);
        
        // Log specific types for debugging
        const cardItems = contentRef.current?.querySelectorAll('.fade-in-item.card');
        const tileItems = contentRef.current?.querySelectorAll('.fade-in-item.tile');
        const textItems = contentRef.current?.querySelectorAll('.fade-in-item.text');
        const fullCardItems = contentRef.current?.querySelectorAll('.fade-in-item.full-card');
        
        if (cardItems) console.log(`Found ${cardItems.length} card items`);
        if (tileItems) console.log(`Found ${tileItems.length} tile items`);
        if (textItems) console.log(`Found ${textItems.length} text items`);
        if (fullCardItems) console.log(`Found ${fullCardItems.length} full-card items`);
      } else {
        console.log('No fade-in items found to observe');
        // Debug what's actually in the DOM
        const allItems = contentRef.current?.querySelectorAll('*');
        if (allItems) {
          console.log('All elements in content:', allItems.length);
          Array.from(allItems).forEach(item => {
            if (item.className && item.className.includes('fade-in')) {
              console.log('Found fade-in element:', item.className);
            }
          });
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      fadeInObserver.disconnect();
    };
  }, [isActive]);

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
      setIsAtBottom(false);

      // Reset fade-in animations
      const fadeInItems = contentRef.current?.querySelectorAll('.fade-in-item');
      if (fadeInItems) {
        fadeInItems.forEach(item => {
          item.classList.remove('fade-in-visible');
        });
      }

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
    
    if (overscrollAmount >= maxOverscroll) {
      setScrollProgress(1);
    } else if (overscrollAmount > 0) {
      const progress = Math.min(1, overscrollAmount / maxOverscroll);
      setScrollProgress(progress);
    } else {
      setScrollProgress(0);
    }

    // Check if user has reached the bottom
    const { scrollTop: currentScrollTop, scrollHeight, clientHeight } = e.target;
    const distanceFromBottom = scrollHeight - clientHeight - currentScrollTop;
    
    if (distanceFromBottom < 10) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
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
        secondIcon={secondIcon}
        period={period}
        position={position}
        style={{ 
          opacity: headOpacity,
          transition: 'opacity 0.1s linear'
        }}
      />
      <Body ref={bodyRef} onScrollProgress={scrollProgress}>
        {children}
      </Body>
      {onNext && (
        <div 
          className="content-next-button"
          style={{
            transform: isAtBottom ? 'translateY(0px)' : 'translateY(64px)',
            transition: 'transform 0.3s ease',
            position: 'sticky',
            bottom: '0',
            left: '0',
            right: '0',
            height: '64px',
            background: 'linear-gradient(transparent, var(--color-base) 20%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '10'
          }}
        >
          <button 
            onClick={onNext} 
            className="next-button"
            style={{
              transform: 'none'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Content; 