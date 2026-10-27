---
name: ROBOPIX Flight Spec
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c7c6c6'
  primary: '#c7c6c6'
  on-primary: '#2f3131'
  primary-container: '#a3a3a3'
  on-primary-container: '#38393a'
  inverse-primary: '#5e5e5f'
  secondary: '#c6c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#cdc5c3'
  on-tertiary: '#342f2e'
  tertiary-container: '#a9a2a0'
  on-tertiary-container: '#3d3937'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e3e2e2'
  primary-fixed-dim: '#c7c6c6'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#464747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e9e1de'
  tertiary-fixed-dim: '#cdc5c3'
  on-tertiary-fixed: '#1e1b1a'
  on-tertiary-fixed-variant: '#4a4644'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.04em
  body-lg:
    fontFamily: Space Mono
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Space Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.02em
  telemetry-tracker:
    fontFamily: Space Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.12em
  label-code:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.05em
spacing:
  gutter: 1px
  gutter-loose: 1rem
  margin: 1.5rem
  margin-mobile: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses an uncompromising, mission-critical engineering aesthetic derived from aerospace technical documentation, NASA flight operation manuals, and orbital avionics consoles. It balances extreme utilitarian rigor with an ultra-premium, architectural restraint. The target audience comprises technical directors, aerospace engineers, roboticists, and high-performance computing operators who demand precision over decoration.

The visual style is rooted in brutalist technical minimalism. Every element exists solely to convey telemetry, state, or operational command. There are no ornamental drop shadows, colorful gradients, or superficial radius treatments. The interface evokes cold competence: pure blacks, structural mechanical seams, rigid grid alignments, tabular numerical clarity, and monospaced telemetry trackers that simulate an active, high-reliability control environment.

## Colors

The system uses an absolute, zero-saturation monochrome architecture. Color is completely decoupled from subjective styling and strictly reserved for absolute contrast ratios.

- **Background Canvas (`#000000`)**: Deep void black serving as the foundational terminal substrate.
- **Surface Tier 01 (`#0a0a0a`)**: Recessed control blocks and structural layout gutters.
- **Surface Tier 02 (`#111111`)**: Primary component backgrounds, active viewports, and interactive card substrates.
- **Structural Seams (`#262626` & `#333333`)**: Micro-borders defining engineering grid lines and component envelopes.
- **Interactive Focus / Hard Bounds (`#404040`)**: Active or hovered perimeter strokes.
- **Typography Primary (`#ffffff` / `#e5e5e5`)**: Critical status labels, primary values, active states, and structural headings.
- **Typography Secondary (`#a3a3a3`)**: Baseline telemetry metadata, index numbers, and auxiliary parameters.
- **Typography Muted (`#525252`)**: Inactive coordinates, grid ticks, and secondary reference keys.

## Typography

The typographic hierarchy pairs the geometric precision of `Space Grotesk` with the unyielding technical legibility of `Space Mono`. 

- **Display & Section Headers (`Space Grotesk`)**: Configured with tight letter-spacing and compact line-heights, projecting engineered solidity. All structural headings must adhere strictly to uppercase transformations when designating functional sub-systems.
- **Data, Instructions & Body (`Space Mono`)**: Every operational readout, configuration directive, and descriptive block is set monospaced to align values vertically across data columns.
- **Trackers & Telemetry Nodes**: Labels formatted under `telemetry-tracker` must use uppercase characters accompanied by micro-spacing to ensure legibility when rendered at dense spatial intervals.

## Layout & Spacing

Layout conforms to a rigid, contiguous modular matrix. Rather than wide floating voids, screen space is organized via hairline partition channels (`gutter: 1px`), allowing modules to visually lock together into a contiguous instrument cluster.

### Grid Matrix
- **Desktop (≥ 1280px)**: 12-column architectural matrix with `1px` structural borders (`#262626`) acting as gutters. Panels butt directly against each other to form a unified console surface. Outer margins remain fixed at `1.5rem` (`24px`).
- **Tablet (768px – 1279px)**: 8-column layout. Multi-column telemetry aggregates collapse into dual-column operational stacks.
- **Mobile (< 768px)**: 4-column linear readout. Margin condenses to `0.75rem` (`12px`). High-density tabular blocks switch to horizontally scrollable viewports with locked index columns.

### Rhythmic Padding
Component interiors apply strict symmetric padding (`space-xs` through `space-xl`). All margins between disparate logical blocks follow strict multiples of 8px (0.5rem, 1rem, 1.5rem, 2.5rem) to ensure mathematical predictability.

## Elevation & Depth

This design system deliberately rejects ambient Gaussian shadows, blurred drop shadows, and simulated elevation through z-axis luminescence. Space is completely flat, architectural, and mechanical.

Depth and focus tiers are achieved through:
1. **Surface Shifting**: Recessed background areas reside at `#000000`. Active control modules step up to `#0a0a0a` or `#111111`.
2. **Structural Micro-Borders**: Every component is isolated by a sharp 1px border (`#262626`). Hover and active elevations do not elevate physically; instead, their perimeter stroke escalates in brightness to `#404040` or `#e5e5e5`.
3. **Corner Registrations & Reticles**: Critical modules feature structural crosshairs, notch cutouts, or L-bracket indicators in the corners to signal technical importance without lifting from the baseline plane.

## Shapes

The geometry of the interface is absolute: `roundedness` is set strictly to `0`. Every perimeter, surface, button, input container, and tooltip terminates in a hard, 90-degree right angle.

- **Fillets & Radii**: Strictly 0px. Curves are considered non-functional overhead.
- **Structural Chamfers**: Where visual separation is required for status chips or index callouts, components may employ 45-degree corner clippings (chamfers) measuring exactly 4px by 4px, reinforcing a CNC-milled chassis feel.
- **Line Consistency**: Interior dividing rules and exterior component borders must match a standard width of exactly 1px.

## Components

### Buttons & Operational Triggers
- **Primary Action**: Solid `#ffffff` background with `#000000` monospaced text. Zero border-radius. On hover, background shifts to `#e5e5e5`. On active/pressed state, reverses to `#000000` text with `#ffffff` 1px border.
- **Secondary Action**: Background `#000000`, 1px border `#333333`, text `#e5e5e5`. On hover, border illuminates to `#a3a3a3`.
- **System Destructive**: Background `#000000`, 1px border `#ffffff`, text `#ffffff` with an explicit leading indicator flag: `[!]`.

### Input Fields & Controls
- **Text Inputs**: Flat `#0a0a0a` background enclosed in a 1px `#262626` stroke. Text set to `Space Mono` 13px in `#ffffff`. Focus state switches border to `#ffffff` with no glow. Placeholder text is locked to `#525252` uppercase.
- **Checkboxes & Radios**: 14px × 14px sharp squares. Unchecked: `#000000` with 1px `#404040` stroke. Checked: Solid `#ffffff` fill with an interior `#000000` square or an active crosshair (`×`) symbol.

### Telemetry Chips & Tags
- Compact, flat badges with `#111111` fill and 1px `#262626` stroke. Text uses `telemetry-tracker` styling (`Space Mono`, 10px, uppercase). Status states use monospaced prefixes (e.g., `[RDY]`, `[ACT]`, `[OFF]`) rather than colored dots.

### Cards & Module Panels
- Rigid structural containers constructed with `#0a0a0a` fill and a continuous 1px `#262626` outline.
- Header bars within cards are partitioned with an interior horizontal 1px rule, displaying the module identifier (e.g., `SYS_REF // 04-A`) in `#a3a3a3` uppercase micro-type.

### Data Tables & Lists
- Table borders collapse cleanly with 1px `#1a1a1a` horizontal and vertical lines.
- Headers are sticky, set in `#111111` with uppercase `#a3a3a3` text.
- Numeric readouts within cells must use tabular figures (`font-variant-numeric: tabular-nums`) to preserve mechanical vertical alignment across dynamic states.