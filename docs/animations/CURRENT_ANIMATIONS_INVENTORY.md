# ContentNavigator Animation Inventory
*Current State - Visual Reference*

---

## 1. Page Entrance (CaseStudyID.jsx)

### Visual:
```
BEFORE                DURING              AFTER
┌────────┐           ┌────────┐          ┌────────┐
│        │           │        │          │        │
│  □□□   │    -->    │  ▢▢▢   │   -->    │  ███   │
│  □□□   │           │  ▢▢▢   │          │  ███   │
│        │           │        │          │        │
└────────┘           └────────┘          └────────┘
opacity: 0           opacity: 0.5         opacity: 1
scale: 0.95          scale: 0.97          scale: 1
```

### Description:
**Layman's Terms:**
When you navigate to a case study page, the entire page fades in and slightly zooms in from 95% to 100% size. It feels like the page is "appearing" and "settling" into place.

**Code Terms:**
```javascript
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
```
- **Properties**: opacity (0 → 1), scale (0.95 → 1)
- **Duration**: 300ms
- **Easing**: easeOut
- **Status**: ✅ Working

---

## 2. Content Switching Animation (CaseStudyID.jsx)

### Visual:
```
TAB CLICK:
┌─────────────────┐
│ [Problem]│Research│Strategy │
└─────────────────┘
        ↓ User clicks "Research"

PHASE 1 - Collapse (400ms):
┌─────────────┐
│ HEAD        │ ──┐
│ BODY ITEM 1 │   │ Collapsing
│ BODY ITEM 2 │   │ height: 757px → 152px
│ BODY ITEM 3 │   │ opacity: 1 → 0.3
└─────────────┘ ──┘

PHASE 2 - Pause (150ms):
┌─────────────┐
│ HEAD only   │ Stays collapsed
└─────────────┘

PHASE 3 - Switch Content (instant):
┌─────────────┐
│ HEAD (new)  │ Content swaps, new Head fades in
│ [collapsed] │
└─────────────┘

PHASE 4 - Expand (400ms):
┌─────────────┐
│ HEAD        │ ──┐
│ BODY ITEM 1 │   │ Expanding
│ BODY ITEM 2 │   │ height: 152px → 757px
│ BODY ITEM 3 │   │ opacity: 0.3 → 1
│ BODY ITEM 4 │   │
└─────────────┘ ──┘
```

### Description:
**Layman's Terms:**
When you click a different tab (like going from "Problem" to "Research"), the current content collapses down to just show the header, pauses briefly at the collapsed state, the header content switches with a fade, then expands back out to show the new content. It's like an accordion closing, pausing, then opening with new content.

**Code Terms:**
```javascript
// Content container animation with fixed heights
const [contentHeight, setContentHeight] = useState(152); // Start collapsed

<motion.div
  animate={{ height: contentHeight }} // Always follows state
  transition={{
    height: { duration: 0.4, ease: "easeInOut" },
    opacity: { duration: 0.3, ease: "easeInOut" }
  }}
>

// Transition timing
const transitionToContent = (newId) => {
  setContentHeight(152); // Collapse
  setTimeout(() => {
    setActiveContentId(newId); // Switch
    setTimeout(() => {
      setContentHeight(757); // Expand after 150ms pause
    }, 150);
  }, 400);
};
```
- **Properties**: height (152px ↔ 757px fixed), opacity (1 ↔ 0.3)
- **Duration**: 400ms (collapse), 150ms (pause), 400ms (expand)
- **Easing**: easeInOut
- **Total Time**: 950ms (collapse + pause + expand)
- **Status**: ✅ Working smoothly

---

## 3. Head Component (CaseStudyID.jsx wrapper)

### Visual:
```
OLD HEAD exits (instant) → NEW HEAD enters (400ms)

BEFORE:
┌──────────────────┐
│ 01        Period │ ← Old content
│   PROBLEM        │   activeContentId: 'problem'
│ 🔍      Tag      │
└──────────────────┘

TRANSITION (AnimatePresence):
Old unmounts instantly
New mounts at opacity: 0, y: -20

┌──────────────────┐
│ ░░░      ░░░░░   │ ← Fading in
│ ░░RESEARCH░░░    │   opacity: 0 → 1
│ ░░░      ░░░     │   y: -20 → 0
└──────────────────┘

AFTER:
┌──────────────────┐
│ 02        Period │ ← New content fully visible
│   RESEARCH       │   activeContentId: 'research'
│ 🔍      Tag      │
└──────────────────┘
```

### Description:
**Layman's Terms:**
When you switch tabs, the old header disappears instantly and the new header fades in from slightly above its final position, sliding down into place. Only one header is ever visible at a time.

**Code Terms:**
```javascript
// Wrapped in CaseStudyID.jsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeContentId} // Forces remount on tab change
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <Head {...props} />
  </motion.div>
</AnimatePresence>
```
- **Properties**: opacity (0 → 1), y (-20px → 0)
- **Duration**: 400ms
- **Easing**: easeOut
- **Behavior**: No exit animation, instant unmount of old Head
- **Status**: ✅ Working - single Head display with entrance animation

---

## 4. Body Items - Scroll-Triggered Animation (Body.jsx)

### Visual:
```
VIEWPORT SCROLL BEHAVIOR:

┌─────────────────────────────┐ ← Viewport top
│                             │
│ HEAD (always visible)       │
│                             │
├─────────────────────────────┤ ← -100px trigger margin
│ ░░░░░░░░░░░░░░░░░░░░░░░░░   │
│ ░░░ ITEM 1 (entering) ░░░   │ ← 30% visible, starts fading
│ ░░░░░░░░░░░░░░░░░░░░░░░░░   │   opacity: 0 → 1, y: 20 → 0
│                             │
│ ███████████████████████████ │
│ ███ ITEM 2 (visible) ██████ │ ← Fully faded in
│ ███████████████████████████ │
│                             │
│ ███████████████████████████ │
│ ███ ITEM 3 (visible) ██████ │
│ ███████████████████████████ │
│                             │
├─────────────────────────────┤ ← Viewport bottom
│                             │
│ [ITEM 4 below fold]         │ ← Not yet triggered
│                             │
└─────────────────────────────┘

User scrolls down ↓

┌─────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░   │
│ ░░░ ITEM 1 (exiting)  ░░░   │ ← Less than 30% visible, fading out
│ ░░░░░░░░░░░░░░░░░░░░░░░░░   │   (once: false allows reverse)
├─────────────────────────────┤ ← Viewport top
│ ███████████████████████████ │
│ ███ ITEM 2 (visible) ██████ │
│ ███████████████████████████ │
├─────────────────────────────┤ ← -100px trigger margin
│ ░░░░░░░░░░░░░░░░░░░░░░░░░   │
│ ░░░ ITEM 4 (entering) ░░░   │ ← Now triggering
│ ░░░░░░░░░░░░░░░░░░░░░░░░░   │
└─────────────────────────────┘
```

### Description:
**Layman's Terms:**
Each body item fades in when you scroll it into view (when 30% of it is visible). Items can also fade out when you scroll past them. The animation triggers 100px before the item enters the viewport, making the transition feel more natural. This works for all items, whether visible on initial load or below the fold.

**Code Terms:**
```javascript
// Body.jsx
{React.Children.map(children, (child, index) => (
  <motion.div
    key={child.key || index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{
      once: false,        // Can animate multiple times
      margin: "-100px",   // Trigger 100px before entering
      amount: 0.3         // Trigger when 30% visible
    }}
    transition={{
      duration: 0.4,
      ease: "easeOut"
    }}
  >
    {child}
  </motion.div>
))}
```
- **Properties**: opacity (0 ↔ 1), y (20px ↔ 0)
- **Duration**: 400ms per item
- **Trigger**: When 30% of item is visible
- **Margin**: -100px (early trigger)
- **Repeatable**: Yes (`once: false`)
- **Easing**: easeOut
- **Status**: ✅ Working - responsive to scroll position

---

## 5. Card Expand/Collapse (Card.jsx)

### Visual:
```
COLLAPSED STATE:
┌─────────────────────────────┐
│ 01                          │
│  ┌──────────────────────┐   │
│  │ 🔍                   │   │
│  │ Title                │   │
│  │ Description text...  │   │
│  │                      │   │
│  │ [View Details →]     │   │
│  └──────────────────────┘   │
└─────────────────────────────┘
       ↓ Click CTA (400ms)

EXPANDING:
┌─────────────────────────────┐
│ 01                          │
│  ┌──────────────────────┐   │
│  │ 🔍                   │   │ HEAD stays in place
│  │ Title                │   │ (layout animation)
│  │ Description text...  │   │
│  │                      │   │
│  │ [Close ×]            │   │
│  ├──────────────────────┤   │
│  │                      │ ◄─┐ BODY reveals
│  │  [Tab 1][Tab 2]     │   │ (height grows)
│  │                      │   │
│  │  Carousel content    │   │
│  │  → → →               │   │
│  └──────────────────────┘ ◄─┘
└─────────────────────────────┘
```

### Description:
**Layman's Terms:**
When you click "View Details" on a card, it smoothly grows taller to reveal a carousel section below. The header content stays in the same position while the card frame expands. Framer Motion automatically handles the smooth layout shift.

**Code Terms:**
```javascript
<motion.div
  layout
  className={`card-frame ${isExpanded ? 'expanded' : ''}`}
  transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
>
  <motion.div layout className="card-head">
    {/* Header content */}
  </motion.div>
  <motion.div layout className="card-body">
    {/* Carousel content */}
  </motion.div>
</motion.div>
```
- **Properties**: height (auto, controlled by content), layout positions
- **Duration**: 400ms
- **Easing**: easeInOut
- **Type**: Framer Motion `layout` animation (automatic)
- **Status**: ✅ Working well

---

## 6. Scroll-Based Header Animation (CaseStudyID.jsx - Case Study Hero)

### Visual:
```
SCROLL POSITION:
┌─────────────────────────────┐
│ ┌─────────────────────────┐ │  ← Viewport top
│ │                         │ │
│ │   CASE STUDY HERO       │ │  opacity: 1
│ │   (fixed position)      │ │  scale: 1
│ │                         │ │  y: 80% viewport
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ ContentNavigator        │ │
│ │ [Tabs]                  │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
        ↓ User scrolls down

┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │   CASE STUDY HERO       │ │  opacity: 0.5 → 0
│ │   (fading out)          │ │  scale: 0.9 → 0.8
│ │   (shrinking)           │ │  y: decreasing
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │  ← Viewport top
│ │ ContentNavigator        │ │
│ │ [Tabs] ← now at top     │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### Description:
**Layman's Terms:**
As you scroll down the page, the case study hero section (with the title and preview images) fades out and shrinks down. It tracks your scroll position - the more you scroll, the more it fades and shrinks. When ContentNavigator reaches the top of the viewport, the hero is completely gone.

**Code Terms:**
```javascript
// Scroll progress calculation
const handleScroll = () => {
  const progress = Math.min(Math.max((startY - navTop) / (startY - endY), 0), 1);
  setScrollProgress(progress);
};

// Applied to hero section
const translateY = (1 - scrollProgress) * (maxY - minY) + minY;
const opacity = 1 - scrollProgress;
const scale = 1 - scrollProgress * 0.2;

<motion.div
  style={{
    opacity: Math.max(opacity, 0),
    scale: Math.max(scale, 0.8)
  }}
>
```
- **Properties**: opacity (1 → 0), scale (1 → 0.8), translateY (calculated)
- **Duration**: Based on scroll speed (user-controlled)
- **Type**: Scroll-driven animation
- **Status**: ✅ Working

---

## 7. Tab Navigation (TabNav/NavTabItem)

### Visual:
```
CURRENTLY: Basic CSS hover/active states

INACTIVE TAB:
┌────────────┐
│ 01 Problem │  color: tertiary (#999988)
└────────────┘

HOVER:
┌────────────┐
│ 01 Problem │  color: secondary (#ccccb6)
└────────────┘  transition: 0.3s

ACTIVE TAB:
┌────────────┐
│ 01 Problem │  color: primary (#ffffe3)
└────────────┘
```

### Description:
**Layman's Terms:**
Tabs change color when you hover over them or when they're selected. The inactive tabs are gray, they turn lighter gray on hover, and the active tab is cream/white. The color changes smoothly over 0.3 seconds.

**Code Terms:**
```css
/* From NavTabItem.css */
.nav-tab-item {
  transition: var(--transition-fast); /* 0.3s */
  color: var(--color-tertiary);
}

.nav-tab-item:hover {
  color: var(--color-secondary);
}

.nav-tab-item.active {
  color: var(--color-primary);
}
```
- **Properties**: color (CSS transitions)
- **Duration**: 300ms (--transition-fast)
- **Type**: CSS hover/active states
- **Status**: ✅ Working (basic)

---

## Animation Summary Table

| Component | Animation Type | Duration | Status | Priority |
|-----------|---------------|----------|--------|----------|
| Page entrance | Fade + Scale | 300ms | ✅ Good | Low |
| Content switch | Collapse/Pause/Expand | 950ms total | ✅ Good | ✅ Complete |
| Head | Fade + Slide (entrance only) | 400ms | ✅ Good | ✅ Complete |
| Body items | Scroll-triggered fade + slide | 400ms/item | ✅ Good | ✅ Complete |
| Card expand | Layout animation | 400ms | ✅ Good | Low |
| Scroll hero | Scroll-based | Variable | ✅ Good | Low |
| Tab nav | Color change | 300ms | ✅ Basic | Medium |

---

## Animation Coverage

### Components WITH animations:
1. **Head component** ✅ - Entrance fade + slide on tab switch (AnimatePresence)
2. **Body items** ✅ - Scroll-triggered fade + slide (whileInView)
3. **Content container** ✅ - Fixed height collapse/expand animations
4. **NextButton** ✅ - Scroll-triggered fade + slide

### Components relying on Body wrapper scroll animation:
1. **Text component** - Animates via Body wrapper
2. **Image component** - Animates via Body wrapper
3. **Tile/TileColumn** - Animates via Body wrapper
4. **TitleSection** - Animates via Body wrapper
5. **FullCard** - Animates via Body wrapper
6. **Callout components** - Animates via Body wrapper

### What this means:
All child components automatically get scroll-triggered animations through the Body wrapper's whileInView implementation. Each component fades in individually as it enters the viewport. No additional component-level animations are needed.

---

## Implementation Complete ✅

**Completed Features:**
- ✅ Head entrance animation with single display (AnimatePresence mode="wait")
- ✅ Smooth content switching with collapse/pause/expand (950ms total)
- ✅ Scroll-triggered body item animations (whileInView with once: false)
- ✅ Fixed height animations (152px ↔ 757px) for smooth transitions
- ✅ Coordinated timing between collapse, pause, head fade, and expansion

**Future Enhancements (Optional):**
- Add individual micro-interactions to specific components (hover states)
- Improve tab navigation feedback (underline animation, etc.)
- Performance optimization if needed

---

*End of Animation Inventory - Last Updated: Current Implementation*
