---
name: Wanderlust Modern
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#41484d'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#71787d'
  outline-variant: '#c0c7cd'
  surface-tint: '#2c6480'
  primary: '#00354a'
  on-primary: '#ffffff'
  primary-container: '#0a4d68'
  on-primary-container: '#88bddc'
  inverse-primary: '#98cded'
  secondary: '#006877'
  on-secondary: '#ffffff'
  secondary-container: '#8debff'
  on-secondary-container: '#006b7a'
  tertiary: '#5e1900'
  on-tertiary: '#ffffff'
  tertiary-container: '#842700'
  on-tertiary-container: '#ff9d7c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c3e8ff'
  primary-fixed-dim: '#98cded'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#084c67'
  secondary-fixed: '#a3eeff'
  secondary-fixed-dim: '#76d4e7'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5a'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59d'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832600'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 3rem
  margin-sm: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system conveys wanderlust, curated authority, and effortless luxury. It positions the travel agency as an elite concierge platform that removes travel friction while evoking the warm, aspirational thrill of discovery. The aesthetic merges **airy minimalism** with refined **tactile glassmorphism**—relying on generous whitespace, crystalline hierarchy, and high-impact editorial imagery.

Targeted at discerning leisure travelers, digital nomads, and experiential vacationers, the interface must evoke tranquility, optimism, and immediate confidence. Visual clutter is ruthlessly suppressed to let vibrant destination imagery breathe. Micro-interactions are fluid, deliberate, and light on their feet.

## Colors

The palette captures a maritime voyage at golden hour: crisp maritime depths, bright turquoise shoals, and radiant sunset accents.

- **Primary (`#0A4D68`)**: Deep Ocean Blue serves as the grounding anchor for primary branding, structural headers, high-level navigation, and prominent iconography.
- **Secondary (`#088395`)**: Vibrant Turquoise acts as an energetic bridge, used for secondary interactions, active states, key tags, and destination highlights.
- **Tertiary (`#FF6B35`)**: Warm Sunset Coral is reserved strictly for high-converting conversion anchors, book-now CTAs, promotional badges, and flash-sale highlights. It must never compete with background elements.
- **Neutral (`#0F172A`)**: Deep Slate serves as primary readable copy, ensuring maximum contrast and legibility over crisp white backgrounds.
- **Surface & Supporting Tokens**:
  - `surface-base`: `#FFFFFF`
  - `surface-subtle`: `#F8FAFC`
  - `surface-card`: `#F1F5F9`
  - `text-muted`: `#475569`
  - `border-subtle`: `rgba(15, 23, 42, 0.08)`

## Typography

The typographical pairing strikes an intentional tension between editorial grace and hyper-modern utility:
- **Playfair Display**: Brings worldly luxury, aspirational depth, and warmth to high-level destination headlines, showcase hero text, and featured editorial banners.
- **Plus Jakarta Sans**: Manages all transactional, navigational, informational, and dense itinerary interfaces. Its geometric balance and generous aperture ensure rapid scanning, total clarity across multiple devices, and high conversion flow.

## Layout & Spacing

This design system uses a flexible 12-column responsive fluid grid designed to frame wide-ratio travel visuals and multi-tiered destination cards.

- **Desktop (1024px+)**: 12 columns with `3rem` margins and `1.5rem` gutters. Content containers cap at a max-width of `1280px` for optimal reading tracking and image containment.
- **Tablet (768px - 1023px)**: 8 columns with `2rem` margins and `1.25rem` gutters. Grid cards step down smoothly from 3-up to 2-up displays.
- **Mobile (<768px)**: 4 columns with `1.25rem` (`margin-sm`) edge margins and `1rem` (`gutter-sm`) gutters. Grids collapse into vertical linear stacks or horizontal peek carousels for swipeable cards.

Spacing enforces rhythm: sections are separated by large rhythmic blocks (`space-xl` and above) to preserve airy elegance, while component internals lock strictly to `space-xs` through `space-md`.

## Elevation & Depth

Visual hierarchy blends physical layering with frosted atmospheric glass:

- **Level 0 (Flat Canvas)**: Pure `#FFFFFF` and off-white `#F8FAFC` foundation tiles.
- **Level 1 (Card Resting)**: Destination and tour cards use a delicate outline (`rgba(15, 23, 42, 0.06)`) paired with a diffused ambient shadow: `0 8px 24px -4px rgba(10, 77, 104, 0.06)`. This subtle blue tint grounds elements softly.
- **Level 2 (Hover & Active States)**: On hover, cards lift along the Y-axis (-4px) with expanded dispersion: `0 16px 32px -8px rgba(10, 77, 104, 0.12)`.
- **Glassmorphic Floating Bars**: Primary search bars and floating filter toolbars sit above maps or hero photography using `rgba(255, 255, 255, 0.82)` background, `16px` backdrop-filter blur, and a crisp, light border (`rgba(255, 255, 255, 0.60)`).

## Shapes

The interface embraces inviting, organic curvature that mirrors modern architecture and natural travel landscapes. Primary structural cards, modals, and container surfaces adhere strictly to `rounded-2xl` (`1rem` / `16px` to `1.5rem` / `24px`). Interactive controls such as amenity pills, status badges, and conversion buttons employ fully rounded pill aesthetics (`9999px`) to maintain approachable, ergonomic touch points.

## Components

### Buttons
- **Primary / CTA**: Warm Sunset Coral (`#FF6B35`) fill with pure white label. Full pill shape (`rounded-full`), padded `space-md` vertically by `space-lg` horizontally. Gentle warmth glow shadow on hover (`0 8px 20px -4px rgba(255, 107, 53, 0.4)`).
- **Secondary**: Deep Ocean Blue (`#0A4D68`) fill with white text, or pure white surface with Ocean Blue border (`1.5px`) and text.
- **Tertiary / Ghost**: Transparent fill, Vibrant Turquoise (`#088395`) text with animated underline on hover.

### Destination & Package Cards
- Base surface of `#FFFFFF` wrapped with a subtle `1px` border (`#F1F5F9`) and `rounded-2xl` corners.
- **Image Container**: Top aspect ratio 4:3 or 16:9 with image zoom on card hover. Top-right corner houses floating wish-list heart button (semi-transparent glass disc).
- **Destination Badges**: Overlaid glass pill badge on top-left of image (`rgba(15, 23, 42, 0.6)`, backdrop blur `8px`, text `#FFFFFF`).
- **Rating Stars**: Solid deep amber (`#F59E0B`) icon accompanied by bold rating score (`label-md`) and muted review count in parentheses.
- **Amenity Badges**: Horizontal cluster of micro-pills at card footer featuring light-slate icons and text (`Flight`, `Hotel`, `Meals Included`), styled with `#F1F5F9` background and `#475569` labels.

### Floating Filter Bar
- Sits elevated across the herofold. Glassmorphic treatment (`rgba(255, 255, 255, 0.85)` + blur) with inner divisions separated by hairline vertical strokes (`rgba(15, 23, 42, 0.08)`).
- Segmented inputs for *Destination*, *Dates*, *Travelers*, and *Budget*, culminating in a bold Coral search trigger button.

### Form Inputs & Checkboxes
- **Input Fields**: Crisp `#F8FAFC` background shifting to `#FFFFFF` on focus, bounded by a `1.5px` border transitioning from `#E2E8F0` to `#088395`. Helper labels use `label-sm`.
- **Checkboxes & Radios**: Custom rounded controls utilizing `#0A4D68` on select, paired with a smooth scale-in check glyph.