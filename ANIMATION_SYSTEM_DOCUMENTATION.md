# Animation System Documentation

## Overview

This project uses a hybrid animation approach combining **Framer Motion** for complex orchestrated animations and **CSS transitions** for simple interactive effects. The animation system is built with performance, accessibility, and maintainability in mind.

## Core Animation Technologies

### 1. Framer Motion
- **Library**: `framer-motion@12.17.3`
- **Primary Use**: Page transitions, complex orchestrated animations, scroll-based animations
- **Performance**: GPU-accelerated animations with built-in optimization

### 2. CSS Transitions
- **Primary Use**: Interactive hover states, micro-interactions, simple transitions
- **Performance**: Native browser optimization
- **Consistency**: Uses design system tokens for timing and easing

## Animation Architecture

### Page-Level Animations

#### App Router (`src/App.jsx`)
```javascript
import { AnimatePresence } from 'framer-motion';

// Wraps all route transitions
<AnimatePresence mode="wait" initial={false}>
  <Routes location={location} key={location.pathname}>
    <Route path="/" element={<Work />} />
    <Route path="/case-study-1" element={<CaseStudy1 />} />
  </Routes>
</AnimatePresence>
```

**Behavior**: Smooth transitions between pages with fade/scale effects

#### Work Page (`src/components/Pages/Work/Work.jsx`)
```javascript
// Complex multi-phase animation sequence
const [animationPhase, setAnimationPhase] = useState('idle'); 
// 'idle' | 'collapsing' | 'fading' | 'navigating'

<motion.div
  animate={isReady ? {
    opacity: 1,
    scale: 1,
    y: 0
  } : {
    opacity: 0,
    scale: 0.8,
    y: 50
  }}
  transition={{ duration: 0.8, ease: "easeInOut" }}
>
```

**Features**:
- Multi-phase animation orchestration
- Scroll-based motion values
- Animation state management
- Debug logging for animation events

#### Case Study Page (`src/components/Pages/Tanda/CaseStudy1/CaseStudy.jsx`)
```javascript
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
```

**Behavior**: Simple fade/scale entrance with subtle easing

### Component-Level Animations

#### Header Component (`src/components/Header/Header.jsx`)
```javascript
const { scrollY } = useScroll();

<motion.header
  animate={{
    y: headerState === 'visible' ? 0 : -80,
    opacity: 1
  }}
  transition={{
    y: { duration: 0.5, ease: "easeInOut" },
    opacity: { opacity: 0.3, ease: "easeInOut" }
  }}
>
```

**Features**:
- Scroll-based visibility
- Smooth slide animation
- Position tracking with `useScroll`

### Content Navigation Animations

#### Content Component (`src/components/ContentNavigator/ContentStack/Content/`)
```css
/* CSS-based staggered animations */
.content.active .body-component:nth-child(1) { transition-delay: 0.2s; }
.content.active .body-component:nth-child(2) { transition-delay: 0.3s; }
.content.active .body-component:nth-child(3) { transition-delay: 0.4s; }

.content.active .body-component {
  opacity: 1;
  transform: translateY(0);
}
```

**Features**:
- Staggered content reveals
- Smooth height/opacity transitions
- CSS-based performance optimization

## Design System Integration

### Transition Tokens (`src/design-tokens.css`)
```css
/* Standardized timing tokens */
--transition-fast: all 0.3s ease;
--transition-medium: all 0.5s ease;
--transition-slow: all 0.8s ease;
```

### Utility Functions (`src/utils/designTokens.js`)
```javascript
export const getTransition = (transitionName, fallback = 'all 0.3s ease') => {
  return getToken(`transitions.${transitionName}`, fallback);
};
```

## Animation Patterns

### 1. **Entrance Animations**
- **Framer Motion**: Complex multi-property entrances
- **CSS**: Simple opacity/fade transitions

### 2. **Interactive Hover States**
```css
.card:hover {
  transform: translateY(-2px);
  transition: transform var(--transition-fast);
}
```

### 3. **Scroll-Based Animations**
```javascript
const { scrollY } = useScroll();
// Used for header hide/show, parallax effects
```

### 4. **State-Based Transitions**
```css
.content.active {
  opacity: 1;
  transform: translateY(0);
}
```

### 5. **Micro-Interactions**
```css
.button:active {
  transform: translateY(1px);
}
```

## Performance Considerations

### GPU Acceleration
- **Transform animations**: Using `translateY()`, `translateX()`, `scale()`
- **Avoid**: Animating `width`, `height`, `top`, `left` properties

### Transition Timing
- **Fast**: 0.2-0.3s for micro-interactions
- **Medium**: 0.5s for component transitions  
- **Slow**: 0.8s for page-level animations

### Easing Functions
- **Custom**: `cubic-bezier(0.4, 0, 0.2, 1)` for content system
- **Standard**: `ease`, `easeInOut`, `easeOut` for framer-motion
- **Subtle**: `easeOut` for entrance animations

## Accessibility Support

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .fade-in-item {
    transition: none;
    transform: none;
  }
}
```

### Motion Variants
- **Debug Mode**: Console logging for animation events
- **State Management**: Clear animation phase tracking
- **Graceful Fallbacks**: CSS fallbacks for JavaScript animations

## File Organization

### Animation-Related Files
```
src/
├── App.jsx                          # Page transitions
├── components/
│   ├── Header/Header.jsx            # Scroll animations
│   ├── Pages/
│   │   ├── Work/Work.jsx           # Complex orchestration
│   │   └── Tanda/CaseStudy1/       # Simple transitions
│   └── ContentNavigator/           # Staggered reveals
├── design-tokens.css               # Animation tokens
└── utils/designTokens.js           # Token utilities
```

### CSS Animation Patterns
```
src/components/
├── Header/Header.css               # Transform animations
├── ContentNavigator/
│   └── ContentStack/Content/       # Transition tokens
└── BodyComponent/                  # Hover/micro-interactions
```

## Debugging & Development

### Console Logging
```javascript
onAnimationStart={(definition) => console.log('Animation started:', definition)}
onAnimationComplete={(definition) => console.log('Animation complete:', definition)}
onUpdate={(latest) => console.log('Animation update:', latest)}
```

### Animation State Tracking
```javascript
const [animationPhase, setAnimationPhase] = useState('idle');
// Track complex multi-phase animations
```

## Common Animation Techniques

### 1. **Staggered Animations**
```css
.component:nth-child(1) { transition-delay: 0.1s; }
.component:nth-child(2) { transition-delay: 0.2s; }
.component:nth-child(3) { transition-delay: 0.3s; }
```

### 2. **Scroll-Driven Animations**
```javascript
const { scrollY } = useScroll();
const opacity = useTransform(scrollY, [0, 100], [1, 0]);
```

### 3. **Conditional Animations**
```javascript
animate={condition ? { scale: 1 } : { scale: 0.8 }}
```

### 4. **Animation Sequences**
```javascript
onAnimationComplete={() => {
  setAnimationPhase('next-phase');
}}
```

## Best Practices

### ✅ Do
- Use `transform` properties for position changes
- Apply transition tokens consistently
- Test with reduced motion preferences
- Use `will-change` for GPU optimization
- Log animation events during development

### ❌ Avoid
- Animating layout properties (`width`, `height`)
- Complex nested animation dependencies
- Animations without proper fallbacks
- Blocking animations during loading
- Excessive animation duration (>1s for UI)

## Troubleshooting

### Common Issues
1. **Layout Shifts**: Use `transform` instead of changing dimensions
2. **Performance**: Review GPU layer creation with Chrome DevTools
3. **Timing**: Ensure animation durations match user expectations
4. **Accessibility**: Test with motion-reduced browser settings

### Performance Monitoring
- Check Chrome DevTools Performance tab
- Monitor FPS during animations
- Use Lighthouse for accessibility testing

---

*This animation system prioritizes smooth, accessible interactions while maintaining performance across all devices and preferences.*
