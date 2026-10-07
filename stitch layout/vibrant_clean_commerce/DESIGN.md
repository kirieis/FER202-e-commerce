---
name: Vibrant Clean Commerce
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
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 3rem
    fontWeight: '800'
    lineHeight: '1.15'
    letterSpacing: -0.025em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.625rem
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: '1.35'
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.45'
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  price-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  price-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '700'
    lineHeight: '1.2'
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
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies a modern, confident, and utilitarian e-commerce aesthetic calibrated for high clarity, rapid decision-making, and seamless user flow. It combines contemporary digital retail ergonomics with clean academic precision. 

The visual narrative relies on **Modern Minimalist Functionalism**:
- **Clarity over Clutter:** Products, pricing, and key actions take precedence over decorative artifice. Dense structural grids keep browsing rhythm consistent and predictable.
- **Controlled Energetic Accents:** The vibrant royal blue establishes authority and trust across navigational and checkout touchpoints, while a warm energetic orange acts as a high-visibility catalyst for promotions, urgency triggers, and primary conversion states.
- **Tactile Softness:** Balanced boundary radiuses (medium curves between 8px and 16px) soften the modular structure without veering into playful cartoonishness.
- **Mobile-First Ergonomics:** Touch targets strictly adhere to minimum 44px boundaries, elevated surface sheets anchor to thumb zones, and sticky micro-actions simplify single-hand commerce journeys.

## Colors

The color architecture is built around high-legibility contrast on light canvas foundations, emphasizing semantic clarity across catalog navigation, inventory status, and checkout flows.

### Palette Roles
- **Primary (`#2563EB` | Deep Active `#1D4ED8`):** Anchors brand presence, main navigation headers, primary interaction paths, active states, focus indicators, and selected filter chips.
- **Secondary / Accent (`#F97316` | Deep Accent `#EA580C`):** Reserved for conversion accelerators: "Add to Cart" triggers, promotional tags, flash-sale countdowns, discount pill badges, and highlight alerts.
- **Canvas & Surfaces:**
  - Base Canvas (`#FFFFFF`): Primary background for maximum product imagery isolation and contrast.
  - Sub-Canvas (`#F8FAFC`): Page body underlay, full-bleed section striping, and neutral card surfaces.
  - Elevated Container (`#F1F5F9`): Soft container fills, disabled input backgrounds, table borders, and structural horizontal dividers.
- **Typography & Slates:**
  - Ink High-Contrast (`#0F172A`): Primary headings, prices, item titles, and critical notices.
  - Ink Medium-Contrast (`#334155`): Body text, form field labels, secondary table headers.
  - Ink Subtle (`#64748B`): Placeholders, metadata, breadcrumb trails, inactive icons, and struck-through original pricing.
- **Status Tones:** Success (`#16A34A`), Warning (`#D97706`), Destructive (`#DC2626`).

## Typography

The type scale combines **Plus Jakarta Sans** for prominent, high-character headlines, prices, and hero banners with **Inter** for dense transactional contexts, tabular specifications, product options, and form fields.

- **Numerics & Currency:** All prices use `Plus Jakarta Sans` with tabular figure settings (`tnum`) enabled to ensure vertical alignment in tables, cart line items, and summary drawers.
- **Hierarchy Rules:** Headline levels prioritize tight line heights and negative letter-spacing for punchy readability. Product titles in cards clamp to two lines using `body-md` bolded, transitioning to `headline-md` on dedicated PDP (Product Detail Page) layouts.
- **Micro-labels & Meta:** Breadcrumbs, inventory warnings, and badge texts utilize uppercase or semi-bold `label-sm` to maintain high legibility at diminutive screen footprints.

## Layout & Spacing

The structural layout operates on a standard 8pt coordinate system adhering to a fluid 12-column grid on desktop screens, collapsing cleanly across smaller devices.

### Grid Breakpoints & Reflow Rules
- **Desktop (1024px+):** 12-column layout, max-width `1280px` centered canvas, `margin: 2rem`, `gutter: 1.5rem`. Facilitates a 4-column product display grid, 3-column promotional tiles, or an 8:4 checkout column split.
- **Tablet (640px to 1023px):** 8-column layout, `margin: 1.5rem`, `gutter: 1rem`. Product listings reflow to 3-across or 2-across with sticky top-filtering toolbars.
- **Mobile (< 640px):** 4-column layout, `margin: 1rem`, `gutter: 1rem`. Product cards arrange strictly into 2-column compact grids or stacked full-width lists. Bottom sheets replace modal dialogs.
- **Rhythm Tokens:**
  - `space-xs` (4px): Inner badge padding, icon-to-label inline offsets.
  - `space-sm` (8px): Button icon gaps, input interior vertical padding, stacked price-to-title offsets.
  - `space-md` (16px): Card internal padding, standard form field spacing, layout container padding.
  - `space-lg` (24px): Card group splits, modular drawer paddings, header-to-body margins.
  - `space-xl` (40px): Page-level vertical section separation.

## Elevation & Depth

This design system uses a crisp, modern low-contrast outline model reinforced by subtle ambient drop shadows. Surfaces feel clean, floating slightly above the background canvas without visual weight or heavy muddy shadows.

- **Level 0 (Flat Base):** Bordered strictly with a 1px solid border (`#E2E8F0`). Used for structural containers, unselected filters, and input field backgrounds.
- **Level 1 (Resting Cards & Popovers):** `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)` coupled with a 1px solid `#F1F5F9` edge. Applied to default Product Cards, Cart summary blocks, and navigation bars.
- **Level 2 (Hover & Interactive Cards):** `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`. Card transitions shift -2px along the Y-axis with this shadow on hover.
- **Level 3 (Modals, Slide-over Cart & Floating Action Bars):** `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`. Accompanied by a 20% slate backdrop overlay (`rgba(15, 23, 42, 0.4)`) with backdrop blur (`blur(4px)`).

## Shapes

The design system incorporates **Level 2 (Rounded)** curvature language:
- **Base Components (Inputs, Buttons, Dropdowns):** 0.5rem (8px) radius creates clean, touch-friendly interactives.
- **Surface Containers (Product Cards, Cart Groups, Info Sheets):** 0.75rem to 1rem (12px to 16px) radius softens prominent surface blocks and image assets without losing structural integrity.
- **Badges, Status Tags & Quantity Pickers:** Fully rounded pill curves (`9999px`) provide contrast against rectangular cards, immediately designating micro-data (e.g., `-20%`, `Free Shipping`, `4.8 ★`).

## Components

### Buttons
- **Primary Action (Conversion):** Background `#F97316`, text `#FFFFFF`, font `label-md`. Hover background `#EA580C`. 44px min-height for touch safety, 12px horizontal padding, 8px corner radius.
- **Secondary Action (Brand / Navigation):** Background `#2563EB`, text `#FFFFFF`. Hover background `#1D4ED8`. Focus outline: 2px offset ring in `#93C5FD`.
- **Ghost & Outline:** White background with 1px border `#CBD5E1`, text `#0F172A`. Hover: Background `#F8FAFC`, border `#94A3B8`.
- **Icon Buttons:** Uniform 40px × 40px tap box (Cart trigger, Wishlist heart, Search toggles) with centralized vector icons and subtle hover tints.

### Form Inputs & Selects
- 44px height container, 1px solid border `#CBD5E1`, background `#FFFFFF`, text `#0F172A`, placeholder `#94A3B8`.
- Focused state: Border transitions to `#2563EB` with a 3px ring of `#DBEAFE`.
- Error state: Border `#DC2626` with red caption text (`label-sm`).

### ProductCard
- Container: Surface `#FFFFFF`, border 1px solid `#F1F5F9`, radius 12px, soft Level 1 shadow, overflowing content clipped.
- Image Aspect Ratio: 1:1 or 4:5, background fill `#F8FAFC` to handle diverse transparent PNG and lifestyle photography cleanly.
- Overlays: Absolute positioned pill badges pinned top-left (Discounts) and wishlist button top-right (36px circular ghost button).
- Content Area: `space-md` (16px) padding containing category subtitle (`label-sm`, `#64748B`), item name (`body-md`, semi-bold, `#0F172A`, 2-line clamp), price row, and quick "Add" button.

### CartItem & QuantitySelector
- CartItem: Row-oriented layout with an 80px rounded-lg thumbnail, details stack, and absolute/aligned delete icon.
- QuantitySelector: Compact pill or 8px rounded container. Encloses a minus button, tabular numeric count, and plus button. Height 36px, minimum hit areas 36px, subtle border `#E2E8F0`.

### Badges & Status Chips
- Pill geometry (`9999px`), padding 2px 10px, typography `label-sm`.
- **Sale / Deal:** Soft orange tint `#FFF7ED`, border `#FFEDD5`, text `#EA580C`.
- **Rating:** Soft amber tint `#FEFCE8`, text `#A16207` with 12px star glyph.
- **In Stock / Out of Stock:** Soft green (`#F0FDF4` / `#15803D`) and soft red (`#FEF2F2` / `#B91C1C`).

### Navbar & Footer
- **Navbar:** Sticky `top: 0`, z-index 40, height 64px (mobile) to 72px (desktop), background `#FFFFFF` with 90% opacity and `backdrop-filter: blur(8px)`, subtle border-bottom 1px `#F1F5F9`. Features logo, search input autocomplete bar, category links, and badge-overlay cart button.
- **Footer:** Deep background `#0F172A`, text `#94A3B8`, headings `#F8FAFC`. Multi-column links, university project disclaimer tag, accepted payment icons, and student attribution.

### OrderStatus / Tracker
- Horizontal multi-step progress bar on desktop, switching to vertical tracker on mobile. Filled nodes in `#2563EB` connected by 2px high-contrast lines.