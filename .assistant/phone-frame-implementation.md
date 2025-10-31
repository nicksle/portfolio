# PhoneFrame Component Implementation

**Status:** Implemented but not currently in use (removed 2025-10-30)
**Reason:** Simplified to just border-radius on video for now
**Location:** Files remain in codebase for future use

## Component Overview

A reusable React component that wraps videos/images inside an iPhone mockup SVG frame.

## Files Created

### 1. Component: `/src/components/PhoneFrame/PhoneFrame.jsx`

```jsx
import React from 'react';
import './PhoneFrame.css';
import iPhoneFrame from '../../assets/devices/iphone-14-frame.svg';

const PhoneFrame = ({ children, model = 'iphone14', className = '' }) => {
  // Device dimensions (screen area only, not including bezel)
  const dimensions = {
    iphone14: {
      width: 390,
      height: 844,
      borderRadius: 47
    }
  };

  const deviceConfig = dimensions[model] || dimensions.iphone14;

  return (
    <div className={`phone-frame phone-frame-${model} ${className}`}>
      <div
        className="phone-screen"
        style={{
          width: `${deviceConfig.width}px`,
          height: `${deviceConfig.height}px`,
          borderRadius: `${deviceConfig.borderRadius}px`
        }}
      >
        {children}
      </div>
      <img
        src={iPhoneFrame}
        alt=""
        className="phone-overlay"
        aria-hidden="true"
      />
    </div>
  );
};

export default PhoneFrame;
```

### 2. Styles: `/src/components/PhoneFrame/PhoneFrame.css`

```css
.phone-frame {
  position: relative;
  width: fit-content;
  height: fit-content;
  display: inline-block;
}

.phone-screen {
  position: relative;
  overflow: hidden;
  background: #000;
  z-index: 1;
}

.phone-screen video,
.phone-screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.phone-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}
```

### 3. Asset: `/src/assets/devices/iphone-14-frame.svg`

```svg
<svg width="430" height="880" viewBox="0 0 430 880" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- iPhone 14 Pro Frame with transparent screen area -->

  <!-- Outer device body -->
  <rect x="0" y="0" width="430" height="880" rx="60" fill="#1C1C1E"/>

  <!-- Screen cutout (transparent area where video/content shows through) -->
  <rect x="20" y="18" width="390" height="844" rx="47" fill="transparent"/>

  <!-- Dynamic Island / Notch -->
  <rect x="150" y="28" width="130" height="35" rx="17.5" fill="#1C1C1E"/>

  <!-- Side buttons -->
  <!-- Left side - Volume buttons -->
  <rect x="0" y="180" width="4" height="40" rx="2" fill="#4A4A4A"/>
  <rect x="0" y="240" width="4" height="40" rx="2" fill="#4A4A4A"/>
  <rect x="0" y="300" width="4" height="60" rx="2" fill="#4A4A4A"/>

  <!-- Right side - Power button -->
  <rect x="426" y="240" width="4" height="80" rx="2" fill="#4A4A4A"/>

  <!-- Inner screen bezel highlight -->
  <rect x="20" y="18" width="390" height="844" rx="47" stroke="#2C2C2E" stroke-width="1" fill="none"/>
</svg>
```

## Usage Example

### How It Was Used:

```jsx
import PhoneFrame from '../../../PhoneFrame/PhoneFrame';

<MediaSet key="media-sol-1-1">
  <PhoneFrame model="iphone14">
    <video
      src={SignUpCarouselVideo}
      muted
      autoPlay
      loop
      alt="Video demonstration..."
    />
  </PhoneFrame>
</MediaSet>
```

### How It Works:

1. **Container** - Wrapper div with relative positioning
2. **Screen Area** - Inner div with overflow hidden and border-radius that clips content
3. **Content** - Video/image placed inside screen area (100% width/height, object-fit: cover)
4. **Frame Overlay** - iPhone SVG positioned absolutely on top with pointer-events: none

### Features:

- ✅ Reusable for any video or image
- ✅ Configurable device models (currently iPhone 14)
- ✅ Realistic iPhone mockup with Dynamic Island, buttons, bezels
- ✅ Transparent screen area where content shows through
- ✅ Proper layering (content behind, frame on top)
- ✅ Non-interactive frame (clicks pass through to video controls if needed)

## Future Usage

To re-enable this component:

1. **Import in CaseStudyID.jsx:**
   ```jsx
   import PhoneFrame from '../../../PhoneFrame/PhoneFrame';
   ```

2. **Wrap video:**
   ```jsx
   <PhoneFrame model="iphone14">
     <video ... />
   </PhoneFrame>
   ```

## Extension Ideas

### Add More Device Models:

```jsx
const dimensions = {
  iphone14: { width: 390, height: 844, borderRadius: 47 },
  iphone14pro: { width: 393, height: 852, borderRadius: 55 },
  iphoneSE: { width: 375, height: 667, borderRadius: 0 },
  // etc.
};
```

### Add Orientation Support:

```jsx
<PhoneFrame model="iphone14" orientation="landscape">
```

### Add Color Variants:

```jsx
<PhoneFrame model="iphone14" color="midnight">
```

Different iPhone frame SVGs for different colors (midnight, starlight, etc.)

## Current State (2025-10-30)

- Component files exist but are not imported/used
- Import removed from CaseStudyID.jsx
- Video now uses simple `border-radius: 24px` instead
- All files remain in codebase for future use
