# Animation Target Fix - ContentNavigator vs Content

## Current Problem

We're animating `.content`'s height from 3000px → 120px, but most of that isn't visible:

```
┌─────────────────────────────────────┐
│ ContentNavigator (viewport height)  │ ← This is what you SEE
│ height: calc(100vh - 120px)         │   ~600px visible
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ TabNav                          │ │
│ ├─────────────────────────────────┤ │
│ │ .content (height: 3000px)       │ │ ← Animating THIS
│ │   Visible part (600px)          │ │   But only 600px visible!
│ │   ----------------------------- │ │ ← Viewport bottom
│ │   (scrollable overflow)         │ │
│ │   Hidden content...             │ │   Rest is hidden
│ │   More content...               │ │   via overflow-y: auto
│ │   (1400px hidden)               │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘

Animating 3000px → 120px
But you only see 600px → 120px
So the animation looks weird!
```

## What We Should Animate

```
┌─────────────────────────────────────┐
│ ContentNavigator                    │ ← Animate THIS instead!
│ height: 600px → 120px               │   This is what's visible
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ TabNav                          │ │
│ ├─────────────────────────────────┤ │
│ │ .content (flex: 1)              │ │ ← Let this fill naturally
│ │   Head + Body                   │ │   via flexbox
│ │   (fills available space)       │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
       ↓ Collapse animation (400ms)
┌─────────────────────────────────────┐
│ ContentNavigator (height: 120px)    │ ← Shrinks to head height
│ ┌─────────────────────────────────┐ │
│ │ TabNav                          │ │
│ ├─────────────────────────────────┤ │
│ │ .content (head visible)         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Solution: Wrap ContentNavigator in motion.div

### Current Structure:
```jsx
<ContentNavigator>
  <TabNav>...</TabNav>
  <motion.div className="content">  ← Animating this
    <Head />
    <Body />
  </motion.div>
</ContentNavigator>
```

### New Structure:
```jsx
<motion.div>  ← Animate this wrapper instead
  <ContentNavigator>
    <TabNav>...</TabNav>
    <div className="content">  ← Remove motion, keep as regular div
      <Head />
      <Body />
    </div>
  </ContentNavigator>
</motion.div>
```

## Implementation Plan

1. **Wrap ContentNavigator** in a motion.div
2. **Animate the wrapper's height** from current viewport height to 120px
3. **Remove animation from .content** - let it fill via flex: 1
4. **Override ContentNavigator's fixed height** via style prop during transition

## Border Issue

You're right that ContentNavigator has no border. The border is on `.content`:

```css
.content {
  border: 1px solid var(--color-active);  ← Border is here
}
```

So when we collapse ContentNavigator, we'll see the content's border shrinking, which is good!

---

Let me implement this fix.
