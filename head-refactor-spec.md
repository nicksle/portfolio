# HEAD COMPONENT REFACTOR SPECIFICATION

## Overview
Refactoring Head from a rigid single component into a flexible compound component system with three independently configurable child components.

## Current Problems
- Props are hardcoded to specific positions (index always top-left, position always top-right, etc.)
- No flexibility to swap content positions
- `subtitle` and `secondIcon` props are defined but unused
- Cannot reuse Head with different content arrangements

## New Architecture

### Component Hierarchy
```
Head (Container)
├── HeadTop (Flexible row: left/right slots)
├── HeadTitle (Fixed: displays title only)
└── HeadBottom (Flexible row: left/right slots)
```

### File Structure
```
Head/
├── Head.jsx           # Main container component
├── Head.css           # Shared styles
├── HeadTop.jsx        # Top row with left/right slots
├── HeadTitle.jsx      # Title display (fixed)
└── HeadBottom.jsx     # Bottom row with left/right slots
```

## Component Specifications

### Head.jsx (Container)
**Purpose:** Wrapper that provides layout and accepts three specific children

**Props:**
```javascript
{
  children: ReactNode  // Required: Must contain HeadTop, HeadTitle, HeadBottom
}
```

**Responsibilities:**
- Applies base `.head` styling
- Maintains flexbox column layout with gap
- No logic, pure container

---

### HeadTop.jsx
**Purpose:** Configurable top row with left and right content slots

**Props:**
```javascript
{
  left: ReactNode,   // Optional: Content for left position
  right: ReactNode   // Optional: Content for right position
}
```

**Layout:**
- Flexbox row, space-between
- Fixed height: `var(--head-row-height, 16px)`
- Default empty if no props provided

---

### HeadTitle.jsx
**Purpose:** Fixed center title display

**Props:**
```javascript
{
  children: ReactNode  // Required: Title text/content
}
```

**Layout:**
- Fixed height: `var(--head-title-height, 48px)`
- Text aligned left with padding
- Applies title typography styles

---

### HeadBottom.jsx
**Purpose:** Configurable bottom row with left and right content slots

**Props:**
```javascript
{
  left: ReactNode,   // Optional: Content for left position (typically icon)
  right: ReactNode   // Optional: Content for right position
}
```

**Layout:**
- Identical to HeadTop layout
- Flexbox row, space-between
- Fixed height: `var(--head-row-height, 16px)`

## Usage Examples

### Default Configuration (current behavior)
```jsx
<Head>
  <HeadTop 
    left={<Text variant="subtitle">{index}</Text>}
    right={<Text variant="subtitle">{position}</Text>}
  />
  <HeadTitle>{title}</HeadTitle>
  <HeadBottom 
    left={<Icon src={icon} />}
    right={<Text variant="subtitle">{period}</Text>}
  />
</Head>
```

### Alternative Configuration
```jsx
<Head>
  <HeadTop 
    left={<Text variant="subtitle">{subtitle}</Text>}
    right={<Text variant="subtitle">{period}</Text>}
  />
  <HeadTitle>{title}</HeadTitle>
  <HeadBottom 
    left={<Icon src={secondIcon} />}
    right={<Icon src={icon} />}
  />
</Head>
```

## Migration Notes

### In Content.jsx
Instead of passing individual props to Head:
```javascript
// OLD
<Head 
  index={index}
  title={title}
  icon={icon}
  period={period}
  position={position}
/>

// NEW
<Head>
  <HeadTop 
    left={<Text variant="subtitle">{index}</Text>}
    right={<Text variant="subtitle">{position}</Text>}
  />
  <HeadTitle>{title}</HeadTitle>
  <HeadBottom 
    left={<Icon src={icon} />}
    right={<Text variant="subtitle">{period}</Text>}
  />
</Head>
```

## CSS Requirements

### Maintain Existing Classes
- `.head` - Container styles (unchanged)
- `.head-top` - Applied to HeadTop wrapper
- `.head-title` - Applied to HeadTitle wrapper
- `.head-bottom` - Applied to HeadBottom wrapper

### Remove Obsolete Classes
- `.head-icon-wrapper`
- `.head-icon`
- `.head-icon-svg`
- `.head-icon-img`

(Icon styling now handled by Icon component itself)

## Design Tokens Used
- `--spacing-xl` (24px) - Head padding
- `--spacing-md` (12px) - Gap between rows
- `--spacing-lg` (16px) - Title left padding
- `--head-row-height` (16px) - Top/bottom row height
- `--head-title-height` (48px) - Title row height
- Typography tokens for Text component

## Benefits
1. **Flexibility:** Any content can go in any slot
2. **Reusability:** Same Head structure for different layouts
3. **Clarity:** Props explicitly define position
4. **Maintainability:** Each sub-component has single responsibility
5. **Composability:** Easy to add new row types if needed
