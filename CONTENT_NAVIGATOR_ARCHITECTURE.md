# ContentNavigator Component Architecture

## Overview
The ContentNavigator is a complex React component system that manages a stack-based content navigation interface. It provides a tabbed navigation system with animated content transitions and scroll-based interactions.

## Component Hierarchy

```
ContentNavigator (Root Container)
├── TabNav (Navigation Tabs)
│   └── NavTabItem (Individual Tab Items)
└── ContentStack (Content Management)
    └── Content (Individual Content Panes)
        ├── Head (Content Header)
        └── Body (Content Body)
            └── BodyComponent (Content Wrapper)
                ├── Text (Text Content)
                ├── Image (Image Content)
                ├── Tile (Simple Content Tiles)
                ├── TileColumn (Column of Tiles)
                ├── CardGroup (Group of Cards)
                │   └── Card (Individual Cards)
                ├── FullCard (Large Content Cards)
                └── SelectedWorks (Work Showcase)
                    └── WorkItem (Individual Work Items)
```

## Core Components

### 1. ContentNavigator (Root)
**File:** `src/components/ContentNavigator/ContentNavigator.jsx`
- **Purpose:** Main container that provides layout constraints
- **Props:** `children` (TabNav and ContentStack components)
- **Key Features:**
  - Max width of 1200px with auto margins
  - Responsive padding adjustments
  - Flex column layout

### 2. TabNav (Navigation)
**File:** `src/components/ContentNavigator/TabNav/TabNav.jsx`
- **Purpose:** Manages tab navigation state
- **Props:** 
  - `activeId` (string) - Currently active tab ID
  - `onTabChange` (function) - Tab change handler
  - `children` (NavTabItem components)
- **Key Features:**
  - Clones children with active state and click handlers
  - Manages tab switching logic

### 3. NavTabItem (Tab Button)
**File:** `src/components/ContentNavigator/TabNav/NavTabItem.jsx`
- **Purpose:** Individual tab button component
- **Props:**
  - `id` (string) - Unique identifier
  - `isActive` (boolean) - Active state
  - `onClick` (function) - Click handler
  - `title` (string) - Tab title
  - `index` (string) - Tab index number
- **Key Features:**
  - Shows eye/eye-closed icon based on active state
  - Keyboard navigation support
  - Uses design tokens for styling

### 4. ContentStack (Stack Manager)
**File:** `src/components/ContentNavigator/ContentStack/ContentStack.jsx`
- **Purpose:** Manages the stack of content panes
- **Props:**
  - `activeId` (string) - Active content ID
  - `children` (Content components)
- **Key Features:**
  - Absolute positioning for content layering
  - Z-index management (active content on top)
  - Transition animations between content
  - Pointer events management (only active content is interactive)

### 5. Content (Content Pane)
**File:** `src/components/ContentNavigator/ContentStack/Content/Content.jsx`
- **Purpose:** Individual content pane with scroll management
- **Props:**
  - `isActive` (boolean) - Active state
  - `id` (string) - Unique identifier
  - `index` (number) - Content index
  - `subtitle` (string) - Content subtitle
  - `title` (string) - Content title
  - `icon` (string) - Primary icon
  - `secondIcon` (string) - Secondary icon
  - `period` (string) - Time period
  - `position` (string) - Position/role
  - `children` (BodyComponent children)
  - `onNext` (function) - Next button handler
- **Key Features:**
  - Scroll-based head opacity fade
  - Intersection Observer for fade-in animations
  - Overscroll detection for navigation
  - State reset when becoming inactive
  - Sticky "Next" button at bottom

### 6. Head (Content Header)
**File:** `src/components/ContentNavigator/ContentStack/Content/Head/Head.jsx`
- **Purpose:** Content header with title, subtitle, and metadata
- **Props:** All content metadata (title, subtitle, icon, etc.)
- **Key Features:**
  - Fades out on scroll
  - Displays content metadata
  - Icon integration

### 7. Body (Content Body)
**File:** `src/components/ContentNavigator/ContentStack/Content/Body/Body.jsx`
- **Purpose:** Container for body components
- **Props:**
  - `children` (BodyComponent children)
  - `onScrollProgress` (function) - Scroll progress callback
- **Key Features:**
  - Simple wrapper for body content
  - Forward ref support

### 8. BodyComponent (Content Wrapper)
**File:** `src/components/ContentNavigator/ContentStack/Content/Body/BodyComponent/BodyComponent.jsx`
- **Purpose:** Wrapper that adds fade-in animations to content
- **Props:**
  - `children` (Content components)
  - `rows` (number) - Grid rows (default: 1)
  - `style` (object) - Additional styles
- **Key Features:**
  - Automatically wraps children with fade-in classes
  - Component type detection for specific animations
  - Special handling for CardGroup components
  - Grid layout support

## Content Components

### Text
**File:** `src/components/ContentNavigator/ContentStack/Content/Body/BodyComponent/Text/Text.jsx`
- **Purpose:** Text content display
- **Features:** Typography styling, responsive design

### Image
**File:** `src/components/ContentNavigator/ContentStack/Content/Body/BodyComponent/Image/Image.jsx`
- **Purpose:** Image content display
- **Features:** Responsive images, aspect ratio handling

### Tile
**File:** `src/components/ContentNavigator/ContentStack/Content/Body/BodyComponent/Tile/Tile.jsx`
- **Purpose:** Simple content tiles
- **Features:** Grid layout, hover effects

### TileColumn
**File:** `src/components/ContentNavigator/ContentStack/Content/Body/BodyComponent/TileColumn/TileColumn.jsx`
- **Purpose:** Column of tiles
- **Features:** Vertical tile arrangement

### CardGroup
**File:** `src/components/ContentNavigator/ContentStack/Content/Body/BodyComponent/CardGroup/CardGroup.jsx`
- **Purpose:** Group of interactive cards
- **Features:** 
  - Grid layout for cards
  - Card expansion/collapse animations
  - Individual card management

### Card
**File:** `src/components/ContentNavigator/ContentStack/Content/Body/BodyComponent/CardGroup/Card/Card.jsx`
- **Purpose:** Individual interactive card
- **Features:**
  - Hover effects
  - Expansion animations
  - Content display

### FullCard
**File:** `src/components/ContentNavigator/ContentStack/Content/Body/BodyComponent/FullCard/FullCard.jsx`
- **Purpose:** Large content cards
- **Features:** 
  - Full-width content display
  - Expansion capabilities
  - Rich content support

### SelectedWorks
**File:** `src/components/ContentNavigator/ContentStack/Content/Body/BodyComponent/SelectedWorks/SelectedWorks.jsx`
- **Purpose:** Work showcase section
- **Features:**
  - Work item display
  - Filtering capabilities

### WorkItem
**File:** `src/components/ContentNavigator/ContentStack/Content/Body/BodyComponent/SelectedWorks/WorkItems/WorkItem.jsx`
- **Purpose:** Individual work item
- **Features:** Work metadata display, hover effects

## Key Design Patterns

### 1. Compound Component Pattern
- ContentNavigator uses compound components (TabNav + ContentStack)
- Each component handles specific concerns
- Props are passed down through the component tree

### 2. Render Props / Children Pattern
- Heavy use of `React.Children` utilities
- Components clone and enhance their children
- Dynamic prop injection based on state

### 3. Stack-based Navigation
- ContentStack manages multiple content panes
- Only one content pane is active at a time
- Z-index layering for smooth transitions

### 4. Animation System
- CSS transitions for smooth animations
- Intersection Observer for scroll-based animations
- Fade-in animations for content components
- Staggered animations for multiple items

### 5. State Management
- Active state flows down from parent
- Local state for scroll progress and animations
- State reset when components become inactive

## CSS Architecture

### Design Tokens
- All styling uses CSS custom properties from `design-tokens.css`
- Consistent spacing, colors, and typography
- Responsive breakpoints defined in tokens

### Layout System
- Flexbox for main layouts
- CSS Grid for content components
- Absolute positioning for stack layering
- Sticky positioning for headers and buttons

### Animation System
- CSS transitions with cubic-bezier easing
- Transform-based animations for performance
- Opacity transitions for fade effects
- Staggered delays for sequential animations

## Usage Example

```jsx
<ContentNavigator>
  <TabNav activeId={activeId} onTabChange={setActiveId}>
    <NavTabItem id="work" title="Work" index="01" />
    <NavTabItem id="about" title="About" index="02" />
  </TabNav>
  
  <ContentStack activeId={activeId}>
    <Content id="work" title="My Work" subtitle="Selected Projects">
      <BodyComponent>
        <FullCard>
          <Text>Project description...</Text>
          <Image src="project.jpg" />
        </FullCard>
      </BodyComponent>
    </Content>
    
    <Content id="about" title="About Me" subtitle="My Story">
      <BodyComponent>
        <Text>About content...</Text>
      </BodyComponent>
    </Content>
  </ContentStack>
</ContentNavigator>
```

## Key Features for AI Agents

1. **Component Composition:** All content components are designed to be composable
2. **Animation System:** Automatic fade-in animations with intersection observer
3. **Responsive Design:** Mobile-first approach with responsive breakpoints
4. **Accessibility:** Keyboard navigation and ARIA roles
5. **Performance:** Optimized animations with `will-change` and `transform`
6. **State Management:** Clear prop flow and state reset patterns
7. **Design System:** Consistent use of design tokens throughout

## File Structure
```
ContentNavigator/
├── ContentNavigator.jsx          # Root container
├── ContentNavigator.css          # Root styles
├── TabNav/
│   ├── TabNav.jsx               # Navigation container
│   ├── TabNav.css               # Navigation styles
│   ├── NavTabItem.jsx           # Individual tab
│   └── NavTabItem.css           # Tab styles
└── ContentStack/
    ├── ContentStack.jsx         # Stack manager
    ├── ContentStack.css         # Stack styles
    └── Content/
        ├── Content.jsx          # Content pane
        ├── Content.css          # Content styles
        ├── Head/
        │   ├── Head.jsx         # Content header
        │   └── Head.css         # Header styles
        └── Body/
            ├── Body.jsx         # Body container
            ├── Body.css         # Body styles
            └── BodyComponent/
                ├── BodyComponent.jsx    # Content wrapper
                ├── BodyComponent.css    # Wrapper styles
                ├── Text/               # Text component
                ├── Image/              # Image component
                ├── Tile/               # Tile component
                ├── TileColumn/         # Tile column
                ├── CardGroup/          # Card group
                │   └── Card/           # Individual card
                ├── FullCard/           # Large card
                └── SelectedWorks/      # Work showcase
                    └── WorkItems/      # Work items
```
