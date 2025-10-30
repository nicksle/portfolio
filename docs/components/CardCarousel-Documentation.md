# CardCarousel Component System

A React component system that provides static headers with horizontally scrollable body content sections, linked by ID.

## Overview

The CardCarousel system consists of three main components:
- **CardCarousel**: Main container that manages head and body stacks
- **HeadItem**: Individual header components with index and title
- **BodyItem**: Scrollable body containers with flexible children

## File Structure

```
src/components/ContentNavigator/ContentStack/Content/Body/BodyComponent/CardGroup/Card/
├── CardCarousel.jsx
├── CardCarousel.css
├── HeadItem.jsx
├── HeadItem.css
├── BodyItem.jsx
└── BodyItem.css
```

## Components

### CardCarousel.jsx

Main container component that accepts `headItems` and `bodyItems` props to render separate stacks.

```jsx
import React from 'react';
import HeadItem from './HeadItem';
import BodyItem from './BodyItem';
import './CardCarousel.css';

const CardCarousel = ({ 
  headItems = [], // Array of { id, index, title }
  bodyItems = [], // Array of { id, children }
  className = '' 
}) => {
  return (
    <div className={`card-carousel ${className}`}>
      {/* Head Stack - Static */}
      <div className="card-carousel-head-stack">
        {headItems.map((item, index) => (
          <HeadItem
            key={item.id || index}
            id={item.id}
            index={item.index}
            title={item.title}
          />
        ))}
      </div>
      
      {/* Body Stack - Scrollable */}
      <div className="card-carousel-body-stack">
        {bodyItems.map((item, index) => (
          <BodyItem
            key={item.id || index}
            id={item.id}
          >
            {item.children}
          </BodyItem>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
```

### HeadItem.jsx

Individual header component that displays an index (14px mono font) and title (H3 styling).

```jsx
import React from 'react';
import './HeadItem.css';

const HeadItem = ({ 
  id, 
  index, 
  title,
  className = '' 
}) => {
  return (
    <div className={`head-item ${className}`} data-id={id}>
      <span className="head-item-index">{index}</span>
      <h3 className="head-item-title">{title}</h3>
    </div>
  );
};

export default HeadItem;
```

### BodyItem.jsx

Scrollable body container with Framer Motion animations for children.

```jsx
import React, { Children } from 'react';
import { motion } from 'framer-motion';
import './BodyItem.css';

const BodyItem = ({ 
  id, 
  children,
  className = '' 
}) => {
  const processedChildren = Children.map(children, (child, index) => {
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ 
          once: false,
          amount: 0.2,
          root: null
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
        className="body-item-child"
      >
        {child}
      </motion.div>
    );
  });

  return (
    <div className={`body-item ${className}`} data-id={id}>
      <div className="body-item-content">
        {processedChildren}
      </div>
    </div>
  );
};

export default BodyItem;
```

## Styles

### CardCarousel.css

```css
.card-carousel {
  height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  overflow: hidden;
}

.card-carousel-head-stack {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.card-carousel-body-stack {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  display: flex;
}
```

### HeadItem.css

Uses S1 (14px mono) design token for index and H3 styling for title.

```css
.head-item {
  min-width: 520px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg, 16px) var(--spacing-xl, 24px);
  background: var(--color-base, #0e0e10);
  border-bottom: 1px solid var(--color-inactive, #30302a);
}

.head-item:last-child {
  border-bottom: none;
}

.head-item-index {
  font-family: 'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  color: var(--color-tertiary, #999988);
  margin: 0;
  padding: 0;
}

.head-item-title {
  font-family: 'Satoshi', Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;
  color: var(--color-primary, #ffffe3);
  margin: 4px 0 0 8px;
  padding: 0;
}
```

### BodyItem.css

Provides 24px gaps between children and proper image/video styling.

```css
.body-item {
  height: var(--card-height-default, 540px);
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.body-item-content {
  height: 100%;
  display: flex;
  gap: 24px;
  padding: var(--spacing-xl, 24px);
  align-items: center;
  min-width: max-content;
}

.body-item-child {
  display: flex;
  flex-shrink: 0;
}

.body-item-child img,
.body-item-child video {
  height: auto;
  max-height: var(--card-height-default, 540px);
  width: auto;
  max-width: none;
  object-fit: contain;
}

/* Annotation styling */
.body-item-child.annotation {
  padding: var(--spacing-md, 12px);
  background: var(--color-secondary, #1e1e1e);
  border: 1px solid var(--color-inactive, #30302a);
  border-radius: var(--border-radius-sm, 4px);
  color: var(--color-primary);
}
```

## Integration with Card Component

### Card.jsx Updates

Add these props to the Card component:

```jsx
const Card = ({ 
  // ... existing props
  headItems = [], // Array of { id, index, title } for CardCarousel head stack
  bodyItems = [], // Array of { id, children } for CardCarousel body stack
  // ... other props
}) => {
  // ... existing code

  return (
    // ... existing JSX
    <div className={`body-scroll ${headItems.length > 0 || bodyItems.length > 0 ? 'carousel-mode' : ''}`}>
      {headItems.length > 0 || bodyItems.length > 0 ? (
        <CardCarousel headItems={headItems} bodyItems={bodyItems} />
      ) : (
        animatedChildren
      )}
    </div>
    // ... rest of JSX
  );
};
```

## Usage Example

### In CaseStudy.jsx

```jsx
<Card
  index="01"
  title="User Flow Audit"
  description="We conducted a comprehensive walkthrough..."
  ctaText="View Details"
  ctaIcon={<Icon svgPath={ICON_PATHS.eye} size="small" />}
  headItems={[
    {
      id: "01",
      index: "01",
      title: "Sign Up & Account Creation"
    },
    {
      id: "02", 
      index: "02",
      title: "Onboarding Process"
    },
    {
      id: "03",
      index: "03", 
      title: "Account Activation & Setup"
    }
  ]}
  bodyItems={[
    {
      id: "01",
      children: [
        <img src={SignUpScreen} alt="Sign Up Screen" />,
        <img src={PhoneVerification} alt="Phone Verification" />,
        <img src={CreateAccount} alt="Create Account" />
      ]
    },
    {
      id: "02",
      children: [
        <img src={OnboardingSVG} alt="Onboarding" />,
        <img src={EmailVerification} alt="Email Verification" />,
        <img src={KYC} alt="KYC" />,
        <img src={KYCFailStates} alt="KYC Fail States" />
      ]
    },
    {
      id: "03",
      children: [
        <img src={LinkBank} alt="Link Bank" />,
        <img src={UserActivation} alt="User Activation" />
      ]
    }
  ]}
/>
```

## Key Features

- **Static Headers**: Head items remain fixed while body content scrolls
- **ID Linking**: Head items and body items are linked by matching `id` props
- **24px Gaps**: Consistent spacing between children in body sections
- **Framer Motion**: Smooth animations as children scroll into view
- **Design Tokens**: Proper S1 (14px mono) and H3 styling for headers
- **520px Min Width**: Head items have a minimum width for proper layout
- **Flexible Children**: Body items support images, videos, and annotations

## Animation Details

- Children fade in with scale animation when scrolling into view
- Viewport threshold set to 0.2 for early trigger
- 0.5s duration with easeOut timing
- Layout animations handled by Framer Motion's LayoutGroup system
