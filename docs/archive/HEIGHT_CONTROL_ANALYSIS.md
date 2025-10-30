# Height Control Analysis - ContentNavigator vs Content

## Current Structure

```
┌─────────────────────────────────────┐
│ .content-navigator                  │ ← FIXED: height: calc(100vh - 120px)
│                                     │   max-height: calc(100vh - 120px)
│ ┌─────────────────────────────────┐ │
│ │ TabNav (flex-shrink: 0)         │ │ ← Fixed height (~64px)
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ .content (flex: 1)              │ │ ← Animated height
│ │                                 │ │   We animate this one!
│ │   Head                          │ │
│ │   Body Items...                 │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## What Controls What?

### ContentNavigator (.content-navigator)
**CSS:**
```css
height: calc(100vh - 120px);        /* FIXED */
max-height: calc(100vh - 120px);    /* FIXED */
display: flex;
flex-direction: column;
```

**Control:** Has a **FIXED height** that never changes.

---

### Content (.content)
**CSS:**
```css
flex: 1;  /* Fills remaining space in ContentNavigator */
```

**Our Animation:**
```javascript
style={{
  flex: isTransitioning ? 'none' : '1'
}}
animate={{
  height: isTransitioning ? 120 : contentHeight
}}
```

**Control:** We're animating THIS element's height.

---

## The Problem: Why It Expands Then Collapses

Let me trace through what happens during a transition:

### STEP 1: User clicks new tab (Problem → Research)

```
State BEFORE:
- activeContentId: 'problem'
- isTransitioning: false
- contentHeight: 'auto' (or last measured value)

ContentNavigator: ┌───────────────────┐
                  │ TabNav            │
                  ├───────────────────┤
                  │ Content           │ ← flex: 1 (fills space)
                  │ (Problem content) │
                  │                   │
                  │                   │
                  └───────────────────┘
```

### STEP 2: transitionToContent runs

```javascript
setIsTransitioning(true);
setNextContentId(newId);
```

```
State changes to:
- isTransitioning: true  ← TRIGGERS RE-RENDER
- activeContentId: still 'problem'
```

### STEP 3: useEffect runs

```javascript
useEffect(() => {
  if (!isTransitioning && contentScrollRef.current) {
    const measured = contentScrollRef.current.scrollHeight;
    setContentHeight(measured);
  }
}, [activeContentId, isTransitioning, contentHeight]);
```

**useEffect does NOT run** because `isTransitioning = true` now!

So `contentHeight` stays as whatever it was before.

### STEP 4: Component re-renders with transition state

```
Content animates:
- flex: 'none' (stops filling container)
- height: 120px (collapse)

But wait... what IS contentHeight at this moment?
```

**THE ISSUE:** `contentHeight` might be measuring the WRONG content!

Let me check when contentHeight is measured...

### STEP 5: 400ms later, content switches

```javascript
setTimeout(() => {
  setActiveContentId(newId);  // ← Content switches to 'research'
  // ...
  setTimeout(() => {
    setIsTransitioning(false);  // ← 400ms later
  }, 400);
}, 400);
```

### STEP 6: isTransitioning becomes false

```
useEffect RUNS NOW:
- Measures NEW content ('research') height
- Let's say it's 3000px
- setContentHeight(3000)

Content animates:
- flex: '1' (back to filling)
- height: 3000px (expand to new content height)
```

## Visual Timeline

```
TIME:     0ms          400ms         800ms
          │             │             │
USER:     Click tab →   │             │
          │             │             │
STATE:    isTransitioning = true      isTransitioning = false
          activeContentId = 'problem' activeContentId = 'research'
          │             │             │
MEASURE:  (skipped)     (skipped)     useEffect measures NEW content
          │             │             contentHeight = 3000px
          │             │             │
ANIMATE:  height → 120  │             height → 3000
          flex → none   │             flex → 1
          │             │             │
          ↓             ↓             ↓
          COLLAPSE      CONTENT       EXPAND
                        SWITCHES
```

## The Root Cause

**The problem:** We're measuring the height of the NEW content AFTER it's already been mounted, which causes the expand animation.

**What we're seeing:**
1. Old content collapses to 120px ✅
2. Content switches (instant)
3. New content gets measured (3000px)
4. Content expands from 120px → 3000px ⚠️ **This is the unwanted expansion!**

**What we WANT:**
1. Old content collapses to 120px
2. Content switches (instant)
3. New content expands from 120px → final height (in one smooth motion)

But we're getting an EXTRA step where it expands to contain the NEW content's full height.

## Why ContentNavigator Might Appear to Change

**Theory:** The ContentNavigator itself has `height: calc(100vh - 120px)` which is FIXED.

But if the CONTENT inside grows beyond that, and the ContentNavigator is sticky... you might be seeing the content overflow or push things around.

Let me check if there's overflow behavior...

## Solution Options

### Option A: Measure BOTH old and new content heights
Before switching, measure BOTH, then animate between them.

### Option B: Don't reset contentHeight
Keep contentHeight as the OLD content's height, animate to 120, then to NEW height.

### Option C: Add overflow hidden to ContentNavigator
Force ContentNavigator to clip overflow during transition.

### Option D: Delay height expansion until after collapse completes
Don't let useEffect measure until we're ready to expand.

---

Let me verify: **Is the ContentNavigator itself changing height, or just the content inside it?**

To debug, I need to understand:
1. What exact visual behavior are you seeing?
2. Is the BORDER of ContentNavigator expanding/collapsing?
3. Or is it just the content inside that's moving?

---

*Analysis in progress - need to confirm exact visual behavior*
