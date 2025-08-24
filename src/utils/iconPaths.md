# Available Icons

This file documents all the icons available in the `ICON_PATHS` object.

## Usage

```jsx
import Icon from '../../components/Icon';
import { ICON_PATHS } from '../../utils/iconPaths';

// Use any icon like this:
<Icon svgPath={ICON_PATHS.iconName} size="small" />
```

## Icon List

### Core Icons (Used in Case Study)
- **`solidIso`** - ISO symbol icon (used in first head)
- **`lightbulb`** - Lightbulb icon (used in solutions section)
- **`eye`** - Eye icon (used in research, strategy, retrospective sections)

### Additional Icons
- **`eyeClosed`** - Closed eye icon
- **`arrowRight`** - Right-pointing arrow
- **`arrowRightSimple`** - Simple right-pointing arrow
- **`solidTrendingDown`** - Trending down chart icon
- **`solidSunAlt`** - Alternative sun icon

### New Icons Added
- **`notesMultiple`** - Multiple notes/document icon
- **`replyAll`** - Reply all icon
- **`search`** - Search/magnifying glass icon
- **`timeline`** - Timeline/chart icon
- **`users`** - Users/people icon

## Sizes Available
- `small` - 16x16px (default)
- `medium` - 24x24px
- `large` - 32x32px
- `xl` - 64x64px

## Examples

```jsx
// Small icon (default)
<Icon svgPath={ICON_PATHS.eye} />

// Medium icon
<Icon svgPath={ICON_PATHS.lightbulb} size="medium" />

// Large icon
<Icon svgPath={ICON_PATHS.arrowRight} size="large" />

// Extra large icon
<Icon svgPath={ICON_PATHS.solidSunAlt} size="xl" />

// With custom className
<Icon svgPath={ICON_PATHS.solidSunAlt} className="my-custom-icon" />

// Using new icons
<Icon svgPath={ICON_PATHS.search} size="medium" />
<Icon svgPath={ICON_PATHS.notesMultiple} size="small" />
<Icon svgPath={ICON_PATHS.replyAll} size="large" />
<Icon svgPath={ICON_PATHS.timeline} size="medium" />
<Icon svgPath={ICON_PATHS.users} size="xl" />
```

## Adding New Icons

1. Add the SVG path to `iconPaths.js`
2. Update this documentation
3. Use the new icon in your components
