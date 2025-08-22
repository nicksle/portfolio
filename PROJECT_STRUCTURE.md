# Portfolio Project - Technical Documentation

## Project Overview
**Portfolio-v2** - A React-based portfolio website built with Vite, featuring a sophisticated content navigation system and case study presentations.

## Tech Stack
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.1.0
- **Styling**: CSS with CSS Variables
- **Animations**: Framer Motion 12.17.3
- **Deployment**: GitHub Pages (gh-pages)
- **Linting**: ESLint with React plugins

## Project Structure

```
portfolio/
├── src/                          # Source code
│   ├── components/               # React components
│   │   ├── ContentNavigator/    # Main navigation system
│   │   ├── Header/              # Site header component
│   │   └── Pages/               # Page components
│   ├── assets/                  # Static assets
│   │   ├── icons/               # SVG icons
│   │   └── TANDA/               # Case study assets
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── public/                       # Public assets
├── pages/                        # Additional pages
└── src_backup/                   # Backup of previous version
```

## Component Architecture

### 1. App.jsx
- **Purpose**: Root application component
- **Location**: `src/App.jsx`
- **Dependencies**: Routes to different page components

### 2. ContentNavigator System
The core navigation architecture that powers the case study presentations.

#### ContentNavigator.jsx
- **Purpose**: Main container for content navigation
- **Features**: 
  - Tab navigation system
  - Content stacking
  - Scroll-based interactions
- **Location**: `src/components/ContentNavigator/ContentNavigator.jsx`

#### TabNav System
- **Components**: 
  - `TabNav.jsx` - Container for navigation tabs
  - `NavTabItem.jsx` - Individual navigation tab items
- **Features**: Active state management, click handlers
- **Location**: `src/components/ContentNavigator/TabNav/`

#### ContentStack System
- **Purpose**: Manages multiple content sections with active/inactive states
- **Features**: 
  - Content switching
  - Transition animations
  - Scroll position management
- **Location**: `src/components/ContentNavigator/ContentStack/`

#### Content Components
- **Content.jsx**: Individual content section wrapper
- **Head.jsx**: Content header with title, subtitle, icon, and period
- **Body.jsx**: Content body container
- **BodyComponent.jsx**: Flexible content layout component

### 3. Body Components
Reusable content building blocks for creating rich case study content.

#### Core Components
- **Text.jsx**: Typography component with different styles (B1, B2, etc.)
- **Image.jsx**: Image display component
- **Tile.jsx**: Information card component
- **TileColumn.jsx**: Vertical stack of tiles
- **Card.jsx**: Expandable content card
- **CardGroup.jsx**: Horizontal layout of cards
- **FullCard.jsx**: Large expandable card with image gallery
- **SelectedWorks.jsx**: Portfolio work showcase
- **WorkItem.jsx**: Individual work item display
- **BreakLine.jsx**: Visual separator component

### 4. Page Components
- **Intro/**: Introduction page components
- **Tanda/**: Tanda case study components
- **Work/**: Work showcase components

## Case Study Structure (Tanda)

### Content Sections
1. **The Challenge** (Problem definition)
2. **Research & Discovery** (User research insights)
3. **Strategy** (Strategic approach)
4. **Solutions** (Implementation details)
5. **Retrospective** (Results and learnings)

### Data Flow
```
CaseStudy → ContentNavigator → TabNav → ContentStack → Content → Body → BodyComponents
```

## Styling System

### CSS Architecture
- **Global Styles**: `src/index.css` - CSS variables, typography, base styles
- **Component Styles**: Each component has its own CSS file
- **CSS Variables**: Consistent design tokens for colors, spacing, typography

### Design Tokens
- **Colors**: `--base`, `--active`, `--inactive`, `--tertiary`, `--hover`
- **Typography**: `--font-family-satoshi`, `--font-family-sf-mono`
- **Spacing**: Consistent spacing scale (8px, 16px, 24px, etc.)

## Key Features

### 1. Content Navigation
- Tab-based navigation between content sections
- Smooth transitions and animations
- Scroll-based content activation

### 2. Responsive Layout
- Grid-based layouts with CSS Grid
- Flexible content components
- Mobile-responsive design

### 3. Interactive Elements
- Expandable cards
- Image carousels
- Hover effects and animations

### 4. Performance
- Component-based architecture
- Efficient re-rendering
- Optimized animations with Framer Motion

## Development Workflow

### Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - Code linting
- `npm run deploy` - Deploy to GitHub Pages

### File Organization
- **Components**: Organized by feature/domain
- **Assets**: Categorized by project/case study
- **Styles**: Co-located with components

## Component Relationships

```
App.jsx
└── Pages/
    └── Tanda/CaseStudy1/
        └── CaseStudy.jsx
            └── ContentNavigator/
                ├── TabNav/
                │   ├── TabNav.jsx
                │   └── NavTabItem.jsx
                └── ContentStack/
                    └── Content/
                        ├── Head/
                        │   ├── Head.jsx
                        │   └── Head.css
                        └── Body/
                            └── BodyComponent/
                                ├── Text/
                                ├── Image/
                                ├── Tile/
                                ├── Card/
                                ├── FullCard/
                                └── ...
```

## Best Practices Implemented

1. **Component Composition**: Flexible, reusable components
2. **Props Interface**: Consistent prop patterns across components
3. **CSS Organization**: Co-located styles with components
4. **Performance**: Efficient re-rendering and state management
5. **Accessibility**: Semantic HTML and proper alt texts
6. **Responsive Design**: Mobile-first approach with CSS Grid

## Future Enhancements

1. **TypeScript**: Add type safety
2. **Testing**: Unit and integration tests
3. **Performance**: Lazy loading and code splitting
4. **Accessibility**: ARIA labels and keyboard navigation
5. **SEO**: Meta tags and structured data 