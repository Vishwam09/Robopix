---
name: Neo-Grotesque Kinetic
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#424937'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#727a66'
  outline-variant: '#c2cab2'
  surface-tint: '#3f6900'
  primary: '#3f6900'
  on-primary: '#ffffff'
  primary-container: '#b9ff66'
  on-primary-container: '#477600'
  inverse-primary: '#96d945'
  secondary: '#5d5d68'
  on-secondary: '#ffffff'
  secondary-container: '#e2e1ee'
  on-secondary-container: '#63636e'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#ebebeb'
  on-tertiary-container: '#686a6a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1f65f'
  primary-fixed-dim: '#96d945'
  on-primary-fixed: '#102000'
  on-primary-fixed-variant: '#2e4f00'
  secondary-fixed: '#e2e1ee'
  secondary-fixed-dim: '#c6c5d2'
  on-secondary-fixed: '#1a1b24'
  on-secondary-fixed-variant: '#454650'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '500'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  label-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

The design system embodies a high-energy, modern neo-brutalist tech aesthetic tailored for forward-thinking digital agencies, SaaS innovators, and creative consultancies. It balances the playful utility of high-contrast outlines with clean, professional layouts.

### Emotional Response & Personality
- **Punchy & Direct:** Unapologetic clarity via bold grotesque display type and hyper-crisp 1px to 2px black structural contours.
- **Electric Utility:** Energetic lime accents highlight key actions and micro-copy, providing a visual cue for forward momentum.
- **Approachable Modernity:** High-radius pill tags, chunky rounded card corners, and balanced negative space prevent brutalist harshness while retaining sharp editorial discipline.

## Colors

The color system operates on high-contrast visual tension between stark ink blacks, electric lime highlights, and pure paper neutrals.

### Palette Architecture
- **Primary Accent (`#B9FF66`):** The signature electric lime. Applied as an assertive highlight across badges, interactive hover states, primary CTAs, and featured service card backgrounds.
- **Dark Neutral (`#191A23` / `#000000`):** Pitch black foundation used for deep contrast hero cards, crisp typographic content, borders, and hard shadow fills.
- **Surface Neutral (`#F3F3F3` & `#FFFFFF`):** Base canvas and tertiary card surfaces providing negative space to make the lime and black elements pop.
- **Border / Stroke (`#191A23`):** Strict, uniform dark outlines on components, cards, and chips to define structural boundaries.

## Typography

The typography pairs the geometric, tech-forward voice of `Space Grotesk` with the neutral workhorse precision of `Inter`.

### Role Hierarchy
- **Headlines & Labels (`Space Grotesk`):** Used across hero statements, section headings, card titles, button labels, and pill badges. Tighter letter spacing on display sizes creates a commanding poster-like rhythm.
- **Body & Longform (`Inter`):** Delivers clean readability in paragraphs, supporting copy, metadata, and form inputs. Generous line heights maintain legibility alongside dense, high-contrast layouts.

## Layout & Spacing

The layout is built on a responsive 12-column fixed-max-width grid (capped at 1280px) on desktop, transitioning to a 6-column grid on tablet and a single-column layout on mobile devices.

### Rhythm & Padding
- **Outer Bounds:** Desktop sections maintain `margin: 3rem`, while mobile frames contract to `1.25rem` to maximize screen real estate.
- **Card Internals:** Component padding uses consistent multiples of 8px (`space-lg` to `space-xl`) to give large illustrations, titles, and action icons ample room to breathe within bordered boundaries.
- **Section Breaks:** Generous vertical spacing (`space-2xl` / 4rem) separates major narrative modules.

## Elevation & Depth

This design system avoids traditional fuzzy, diffuse gaussian drop shadows. Instead, it relies strictly on tactile, graphic neo-brutalist elevation:

### Depth Mechanisms
- **Hard Offset Edge Shadows:** Select interactive elements and active card surfaces feature a solid 100% black hard offset shadow (`box-shadow: 0px 5px 0px #191A23`) with 0px blur radius.
- **Graphic Outlines:** Structural depth is achieved using crisp `1px` solid `#191A23` borders across all cards, input shells, and pill tags.
- **High-Contrast Surface Stacking:** Depth layering is produced through contrasting surfaces—placing stark `#191A23` or `#B9FF66` cards directly over light `#FFFFFF` or `#F3F3F3` backdrops.

## Shapes

The shape system employs roundedness level 3, utilizing generous corner radiuses and full-pill profiles to balance the hard black borders and brutalist layout lines.

### Radii Tokens & Usage
- **Pill Shells (`9999px`):** Applied to badges, tag labels, status chips, and button outlines.
- **Outer Cards (`rounded-xl` / 3rem desktop, 2rem mobile):** Service cards and major content blocks feature hyper-rounded corners framed by solid 1px black outlines.
- **Inner Controls (`rounded-lg` / 2rem):** Form inputs and modal dialogs inherit softer curves to maintain visual harmony with outer parent containers.

## Components

### Buttons
- **Primary:** Pitch black (`#191A23`) background, `#FFFFFF` text in Space Grotesk 600, rounded pill shape (`9999px`), padding `1.25rem 2rem`. On hover, surface shifts to `#B9FF66` with `#191A23` text.
- **Secondary / Outline:** Transparent fill, `1px solid #191A23`, text `#191A23`. On hover, fills with `#191A23` with white text.
- **Action Links:** Circular circular icon buttons (`40px x 40px`) containing angled arrows, often featuring a black or lime background circle framed by a 1px border.

### Badges & Pill Chips
- **Category Badge:** Displayed as a lime green (`#B9FF66`) pill background with bold black text (`#191A23`) in Space Grotesk.
- **Monochrome Variant:** Off-white (`#F3F3F3`) or black pill surfaces with matching crisp 1px borders.

### Cards
- **Service & Feature Cards:** Heavy rounded cards (`rounded-xl`) with `1px solid #191A23` borders and `0px 5px 0px #191A23` hard offset shadow. 
- Three distinct surface modes:
  1. *Neutral Mode:* `#F3F3F3` background with lime badge headers.
  2. *Lime Accent Mode:* `#B9FF66` background with white/black badge headers.
  3. *Inverted Mode:* `#191A23` background with crisp white typography and lime highlights.

### Input Fields
- Enclosed with a solid `1px solid #191A23` border on `#FFFFFF` ground, rounded to `1.25rem`. Focused state introduces a hard lime outline glow or a 2px stroke without blur.

### Checkboxes & Radios
- Sharp black outlines (`1.5px solid #191A23`) with high-contrast `#B9FF66` fills when selected.