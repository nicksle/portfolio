# Logo SVG Workspace

This workspace is set up for a modular 4-layered SVG logo with interchangeable facial features.

## Directory Structure

```
logo/
├── source/
│   ├── layers/          # 4 main SVG layers
│   │   ├── base.svg
│   │   ├── outline.svg
│   │   ├── face-1.svg
│   │   └── face-2.svg
│   └── features/        # Modular face components
│       ├── eyes/        # Eye variations (eye1.svg, eye2.svg, etc.)
│       └── mouths/      # Mouth variations (mouth1.svg, mouth2.svg, etc.)
├── exports/
│   ├── combinations/    # Different feature combinations
│   └── variants/        # Other versions or formats
└── backups/             # Safety copies and version history
```

## Modular Features System

This logo uses a **mix-and-match** approach where you can select different eyes and mouths to create unique variations:

### Layer Structure
1. **base.svg** - Foundation/background layer
2. **outline.svg** - Border/outline layer
3. **face-1.svg** - First face (can reference features)
4. **face-2.svg** - Second face (can reference features)

### Feature Components
- **Eyes**: `source/features/eyes/` - Store different eye style variations
- **Mouths**: `source/features/mouths/` - Store different mouth style variations

## Workflow

### Option 1: Direct Embedding
1. Edit feature SVGs in `source/features/eyes/` and `source/features/mouths/`
2. Copy selected feature code into `face-1.svg` or `face-2.svg`
3. Combine all 4 layers for final logo
4. Export to `exports/combinations/`

### Option 2: SVG References (Advanced)
1. Use SVG `<use>` or `<image>` elements in face layers to reference features
2. Swap feature references to create different combinations
3. This allows runtime feature switching

### Creating Combinations
- Name exports descriptively: `logo-eye1-mouth2.svg`, `logo-eye2-mouth1.svg`
- Keep source features separate for easy editing
- Test combinations before finalizing

## Tips

- Keep layers organized by naming them descriptively
- Use consistent viewBox dimensions across all layers
- Test layer combinations before final export
- Optimize final SVGs for web use (remove unnecessary metadata)

## Tools

You can edit SVG files with:
- Text editor (VS Code, Sublime, etc.)
- Adobe Illustrator
- Inkscape
- Figma (export to SVG)
- Online SVG editors
