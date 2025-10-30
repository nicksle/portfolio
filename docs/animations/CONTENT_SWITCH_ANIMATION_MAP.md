# Content Switch Animation - Current Implementation Map

## Overview
When a user clicks a different tab in ContentNavigator, the content collapses with a pause, the head switches, then expands to reveal the new content with scroll-triggered body items.

---

## Current Implementation (CaseStudyID.jsx)

### State Management

```javascript
// Location: CaseStudyID.jsx
const [activeContentId, setActiveContentId] = useState('problem');
const [isTransitioning, setIsTransitioning] = useState(false);
const [isInitialLoad, setIsInitialLoad] = useState(true);
const [nextContentId, setNextContentId] = useState(null);
const [contentHeight, setContentHeight] = useState(152); // Fixed collapsed height
```

**State Variables:**
- `activeContentId` - Currently displayed content (e.g., "problem", "research")
- `isTransitioning` - Boolean flag indicating if animation is in progress
- `isInitialLoad` - Boolean flag for first load expansion
- `nextContentId` - ID of the content we're transitioning to (debugging)
- `contentHeight` - Current height of content container (152px or 757px fixed)

**Key Change:** Height is now fixed at two values (152px collapsed, 757px expanded) instead of dynamic measurement. This prevents flash of expanded content before collapse.

---

## Animation Timeline

```
USER CLICKS TAB (e.g., Problem → Research)
│
├─ handleTabChange("research")
│  └─ transitionToContent("research")
│
├─ PHASE 1: COLLAPSE (400ms)
│  ├─ setIsTransitioning(true)
│  ├─ setNextContentId("research")
│  ├─ setContentHeight(152) ────────────┐
│  │                                     │
│  ├─ Motion animate:                    │
│  │  ├─ height: 757px → 152px          │ Collapse to Head-only
│  │  ├─ opacity: 1 → 0.3               │
│  │  └─ duration: 400ms                │
│  │                                     │
│  └─ setTimeout(() => { ... }, 400) ───┘
│
├─ PHASE 2: PAUSE (150ms) ─────────────┐
│  Content stays collapsed at 152px     │
│  Old Head visible                     │
│  └─ Gives visual breathing room       │
│                                        │
├─ PHASE 3: SWITCH CONTENT (instant) ◄──┘
│  ├─ setActiveContentId("research")
│  ├─ setNextContentId(null)
│  ├─ Reset scroll position to top
│  ├─ AnimatePresence unmounts old Head
│  ├─ New Head fades in (400ms)
│  │
│  └─ setTimeout(() => { ... }, 550) ───┐ (150ms pause + 400ms head)
│                                        │
├─ PHASE 4: EXPAND (400ms) ◄────────────┘
│  ├─ setContentHeight(757) ────────────┐
│  │                                     │
│  ├─ Motion animate:                    │
│  │  ├─ height: 152px → 757px          │ Expand to full
│  │  ├─ opacity: 0.3 → 1               │
│  │  └─ duration: 400ms                │
│  │                                     │
│  └─ After expand completes: ───────────┘
│     └─ setIsTransitioning(false)
│
├─ PHASE 5: BODY ITEMS SCROLL IN
│  Each body item animates when scrolled into view
│  ├─ Trigger: 30% of item visible
│  ├─ Margin: -100px (early trigger)
│  ├─ Animation: fade + slide up (400ms)
│  └─ Repeatable: Can fade out when scrolled past
│
└─ TOTAL TRANSITION TIME: ~950ms (collapse + pause + expand)
```

---

## Code Breakdown

### 1. Transition Function

```javascript
// Location: CaseStudyID.jsx
const transitionToContent = (newId) => {
  // Guard: Prevent duplicate transitions
  if (newId === activeContentId || isTransitioning) return;

  setIsTransitioning(true);
  setNextContentId(newId);
  setContentHeight(152); // Collapse to fixed height

  // PHASE 1: Wait for collapse animation (400ms)
  setTimeout(() => {
    setActiveContentId(newId);  // Switch content (unmounts old, mounts new)
    setNextContentId(null);

    // Reset scroll position to top
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTop = 0;
    }

    // PHASE 2: Wait for pause (150ms) + head animation (400ms) before expanding
    setTimeout(() => {
      // Expand to full height
      setContentHeight(757);

      // PHASE 3: Wait for expand animation (400ms)
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400); // Match expand animation duration
    }, 550); // 150ms pause + 400ms for head to fade in
  }, 400); // Match collapse animation duration
};
```

**Key Points:**
- Uses nested `setTimeout` to coordinate phases
- Fixed heights (152px/757px) prevent measurement issues
- 150ms pause at collapsed state provides visual clarity
- Waits for head animation before expanding
- Total timing: 400ms + 550ms + 400ms = 1350ms

---

### 2. Motion Component Animation

```javascript
// Location: CaseStudyID.jsx
<motion.div
  className="content"
  ref={contentScrollRef}
  initial={{ height: 152, opacity: 0.3 }}
  style={{
    flex: (isInitialLoad || isTransitioning) ? 'none' : '1'
  }}
  animate={{
    height: contentHeight,  // Always follows state (152 or 757)
    opacity: isTransitioning ? 0.3 : 1
  }}
  transition={{
    height: { duration: 0.4, ease: "easeInOut" },
    opacity: { duration: 0.3, ease: "easeInOut" }
  }}
  style={{
    overflow: isTransitioning ? 'hidden' : 'auto'
  }}
>
  {/* Head and Body components */}
</motion.div>
```

**Animation Properties:**
- **height**:
  - Collapsed: `152px` (height to show just Head)
  - Expanded: `757px` (viewport height minus header)
  - Duration: 400ms
  - Easing: easeInOut

- **opacity**:
  - Transitioning: `0.3` (dimmed)
  - Normal: `1` (full opacity)
  - Duration: 300ms
  - Easing: easeInOut

- **flex**:
  - During transition: `'none'` (allows height animation)
  - Normal: `'1'` (fills container)

---

### 3. Head Component with AnimatePresence

```javascript
// Location: CaseStudyID.jsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeContentId}  // Forces remount on every tab switch
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <Head
      index={contentRegistry[activeContentId]?.index}
      subtitle={contentRegistry[activeContentId]?.subtitle}
      title={contentRegistry[activeContentId]?.title}
      icon={contentRegistry[activeContentId]?.icon1}
      secondIcon={contentRegistry[activeContentId]?.icon2}
      period={contentRegistry[activeContentId]?.period}
    />
  </motion.div>
</AnimatePresence>
```

**Head Animation:**
- AnimatePresence `mode="wait"` ensures only one Head visible at a time
- Old Head unmounts instantly (no exit animation)
- New Head fades in with slide down animation
- Duration: 400ms
- Key prop forces remount on every `activeContentId` change
- ✅ **Fixed**: Now properly re-animates on every tab switch

---

### 4. Body Component with Scroll-Triggered Items

```javascript
// Location: CaseStudyID.jsx
<Body
  key={activeContentId}  // Forces remount to reset scroll state
  onNextSection={handleNextContent}
  showNextButton={!isLastSection()}
>
  {contentRegistry[activeContentId]?.bodyItems || []}
</Body>
```

**Body Implementation (Body.jsx):**

```javascript
// Location: Body.jsx
const Body = forwardRef(({ children, onScrollProgress, onNextSection, showNextButton = true }, ref) => {
  return (
    <motion.div className="body" ref={ref}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={child.key || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: false,      // Can animate multiple times
            margin: "-100px", // Trigger 100px before entering viewport
            amount: 0.3       // Trigger when 30% of item is visible
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          {child}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px", amount: 0.3 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <NextButton
          onClick={onNextSection}
          isVisible={showNextButton && onNextSection}
        />
      </motion.div>
    </motion.div>
  );
});
```

**Body Animation Features:**
- Each item animates independently based on scroll position
- Triggers when 30% of item is visible
- -100px margin provides early trigger for smooth experience
- `once: false` allows items to fade out when scrolled past
- No base delay - items animate immediately when in view
- Duration: 400ms per item
- ✅ **Fixed**: No longer tied to expand timing, works on scroll

---

## Visual Timeline Diagram

```
TIME:     0ms        400ms     550ms     950ms       1350ms
          │           │         │         │           │
USER:     Click ─────►│         │         │           │
          │           │         │         │           │
CONTENT:  │◄─Collapse─┤  Pause  │◄────── Expand ─────┤
          │ 757→152px │  150ms  │  152→757px          │
          │ o→0.3     │         │  o→1                │
          │           │         │         │           │
HEAD:     │           │ Unmount │◄─ New Head ────┤   │
          │           │  old    │  Fade in        │   │
          │           │         │  (400ms)        │   │
          │           │         │                 │   │
BODY:     │           │         │         │       │   │ [Items scroll-triggered]
          │           │         │         │       │   │ (animate when 30% visible)
          │           │         │         │       │   │ (no base delay)
          │           │         │         │       │   │
STATE:    isTransitioning = true ────────────────────► false
          contentHeight = 757 → 152 ──────────────► 757

Legend: o=opacity
```

---

## Initial Load Behavior

```javascript
// On page mount, content expands from collapsed state
useEffect(() => {
  const timer = setTimeout(() => {
    setContentHeight(757); // Expand after 100ms
    setTimeout(() => {
      setIsInitialLoad(false); // Mark initial load complete
    }, 400); // After expansion animation
  }, 100); // Initial delay

  return () => clearTimeout(timer);
}, []);
```

**Initial Load Timeline:**
- 0-100ms: Content visible at 152px
- 100-500ms: Expanding to 757px
- 500ms+: Normal state, `isInitialLoad = false`

---

## Component Hierarchy

```
<motion.div className="content">              ← Collapse/expand animation (152↔757px)
  │
  ├─ <AnimatePresence mode="wait">           ← Ensures single Head
  │   └─ <motion.div key={activeContentId}>  ← Forces remount
  │       └─ <Head />                        ← Fades in with slide
  │
  └─ <Body key={activeContentId}>            ← Forces remount for scroll reset
      └─ <motion.div className="body">       ← Container
          ├─ <motion.div whileInView>        ← Item 1 (scroll-triggered)
          │   └─ <BodyComponent />
          ├─ <motion.div whileInView>        ← Item 2 (scroll-triggered)
          │   └─ <BodyComponent />
          └─ <motion.div whileInView>        ← Item 3 (scroll-triggered)
              └─ <BodyComponent />
```

---

## Improvements Made

### ✅ Fixed Issues:

1. **Head re-animates on tab switch**
   - AnimatePresence with `key={activeContentId}` forces remount
   - New Head fades in with slide animation every time
   - Old Head unmounts instantly (no exit delay)

2. **Body items respond to scroll**
   - Changed from fixed delay stagger to `whileInView` trigger
   - Each item animates when it enters viewport
   - Can fade out when scrolled past (`once: false`)

3. **Smooth collapse/expand transitions**
   - Fixed heights (152px/757px) prevent measurement issues
   - No flash of expanded content before collapse
   - Always animates between same two heights

4. **Visual pause at collapsed state**
   - 150ms pause provides breathing room
   - Makes transition feel more deliberate
   - Gives time to register the tab change

5. **Coordinated timing**
   - Collapse → Pause → Head fade → Expand
   - Each phase waits for previous to complete
   - Total 950ms feels smooth and polished

### 🎯 Design Decisions:

1. **No exit animation for Head**
   - Faster transition (saves 400ms)
   - User doesn't see old Head fade out when scrolled past it
   - Feels snappier

2. **Scroll-triggered body items**
   - Better performance (only animates visible items)
   - Natural feel - content reveals as you explore
   - Works for both initial load and tab switches

3. **Fixed heights instead of measurement**
   - Predictable animations every time
   - No layout shifts or reflows
   - Easier to debug and maintain

---

## Performance Considerations

**GPU Acceleration:**
- Transform properties (`translateY`) used for slide animations
- Opacity changes are GPU-accelerated
- Height animation is the only layout-affecting property

**Scroll Performance:**
- `whileInView` uses IntersectionObserver (efficient)
- Animations only trigger when needed
- `once: false` carefully used to allow fade-out

**State Management:**
- Minimal re-renders during transitions
- Guard clause prevents double-clicks
- Refs used for scroll position (no state updates)

---

## Configuration Values

**Timing:**
- Collapse duration: 400ms
- Pause duration: 150ms
- Head fade duration: 400ms
- Expand duration: 400ms
- Body item duration: 400ms

**Heights:**
- Collapsed: 152px
- Expanded: 757px (calc(100vh - 120px) approximately)

**Viewport Triggers:**
- Trigger margin: -100px
- Visibility threshold: 30% (0.3)

**Easing:**
- Height/opacity: easeInOut
- Head/body items: easeOut

---

## Current Status

✅ **All animations working smoothly**
- Content collapse/expand with pause
- Head switches with entrance animation
- Body items fade in on scroll
- Coordinated timing throughout
- No visual glitches or layout shifts

---

*End of Current Implementation Map - Reflects final working version*
