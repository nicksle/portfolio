# Annotations Component Layout Behavior

## Overview
The Annotations component uses a vertical-first flex layout that stacks items vertically, then wraps to create new columns after a certain height is reached.

## Layout Pattern

### Visual Structure
```
Column 1          Column 2          Column 3
┌─────────┐      ┌─────────┐      ┌─────────┐
│ Item 1  │      │ Item 3  │      │ Item 5  │
└─────────┘      └─────────┘      └─────────┘
┌─────────┐      ┌─────────┐      ┌─────────┐
│ Item 2  │      │ Item 4  │      │ Item 6  │
└─────────┘      └─────────┘      └─────────┘
```

### Behavior
- Items stack **vertically first** within a column
- After reaching `max-height`, items wrap to create a **new column**
- All items maintain the **same fixed width** (160px)
- Items can have **varying heights** based on content
- Container width **hugs content** (grows with number of columns)

## CSS Implementation

### Annotations Container (`Annotations.css`)
```css
.annotations {
  width: fit-content;           /* Container hugs content */
  height: fit-content;
  display: flex;
  flex-direction: column;       /* Stack vertically first */
  flex-wrap: wrap;              /* Allow wrapping to new columns */
  align-content: flex-start;    /* Align columns to start */
  gap: var(--spacing-xl, 24px); /* Space between items */
  padding: 0 32px;
  max-height: 500px;            /* Controls when wrapping occurs */
}
```

### Annotation Item (`AnnotationItem.css`)
```css
.annotation-item {
  width: 160px;                 /* Fixed width for all items */
  min-width: 160px;
  height: fit-content;          /* Height adapts to content */
  display: flex;
  flex-direction: column;
  gap: 0;
  flex-shrink: 0;               /* Prevent items from shrinking */
}
```

## Key Properties

### `flex-direction: column`
This is the critical property that makes items stack vertically first, rather than horizontally.

### `flex-wrap: wrap`
Allows items to wrap to a new column when `max-height` is exceeded.

### `max-height: 500px`
The control knob for when wrapping occurs:
- If annotation items average ~200px tall, 2 items will fit per column
- Adjust this value based on your typical item heights
- Formula: `max-height ≈ (items per column × average item height) + (gaps × spacing)`

### `width: fit-content`
Makes the container only as wide as needed to contain its columns, rather than expanding to fill available space.

## Usage Example

```jsx
<Annotations 
  annotationItems={[
    { id: 1, index: '01', title: 'First', description: 'Content...' },
    { id: 2, index: '02', title: 'Second', description: 'More content...' },
    { id: 3, index: '03', title: 'Third', description: 'Content...' },
    { id: 4, index: '04', title: 'Fourth', description: 'Even more...' }
  ]}
/>
```

Result with 4 items:
- Items 1-2: Column 1 (stacked vertically)
- Items 3-4: Column 2 (stacked vertically)

## Adjusting the Layout

### To change items per column
Modify `max-height` in `.annotations`:
- **More items per column**: Increase `max-height` (e.g., 700px for 3 items)
- **Fewer items per column**: Decrease `max-height` (e.g., 300px for 1 item)

### To change item width
Modify `width` and `min-width` in `.annotation-item`:
```css
.annotation-item {
  width: 200px;  /* Change both values together */
  min-width: 200px;
}
```

### To change spacing between items
Modify `gap` in `.annotations`:
```css
.annotations {
  gap: var(--spacing-md, 16px); /* Smaller gap */
}
```

## Integration with BodyItem

The Annotations component is used within `BodyItem` and can be positioned:

1. **At the end** (legacy behavior):
```jsx
<BodyItem annotationItems={[...]} />
```

2. **At specific positions** (new behavior):
```jsx
<BodyItem 
  annotationSets={[
    { position: 1, items: [...] },  // After first child
    { position: 3, items: [...] }   // After third child
  ]}
/>
```

## Notes
- Items naturally align to the top of each column due to `align-content: flex-start`
- Variable height items are handled gracefully - each item takes only the height it needs
- The container grows horizontally as more columns are added
- No maximum width constraint, so columns can extend indefinitely