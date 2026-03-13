/**
 * Material Design 3 - Complete Design Tokens Reference
 *
 * This file serves as a comprehensive reference for all M3 design tokens
 * used throughout the design system. Values are based on the official
 * Material Design 3 specification.
 *
 * Reference: https://m3.material.io/tokens
 *
 * NOTE: This file is for documentation purposes. All tokens are defined
 * in theme.css which should be imported in your main application CSS.
 */

/*
================================================================================
                        COLOR SYSTEM
================================================================================

Material Design 3 uses a color system based on:
- Primary (accent color, used for main interactive elements)
- Secondary (supporting accent color)
- Tertiary (alternative accent color for specializations)
- Neutral (grayscale backgrounds and text)

Each color has:
- Base color (e.g., --md-sys-color-primary)
- On-color (e.g., --md-sys-color-on-primary) for text/content on that color
- Container (e.g., --md-sys-color-primary-container) for filled backgrounds
- On-container for text on the container color
*/

/* PRIMARY COLORS */
--md-sys-color-primary: #6750A4;              /* Main accent color */
--md-sys-color-on-primary: #FFFFFF;           /* Text on primary background */
--md-sys-color-primary-container: #EADDFF;    /* Primary container background */
--md-sys-color-on-primary-container: #21005D; /* Text on primary container */

/* SECONDARY COLORS */
--md-sys-color-secondary: #625B71;
--md-sys-color-on-secondary: #FFFFFF;
--md-sys-color-secondary-container: #E8DEF8;
--md-sys-color-on-secondary-container: #1D192B;

/* TERTIARY COLORS */
--md-sys-color-tertiary: #7D5260;
--md-sys-color-on-tertiary: #FFFFFF;
--md-sys-color-tertiary-container: #FFD8E4;
--md-sys-color-on-tertiary-container: #31111D;

/* NEUTRAL COLORS (Backgrounds, surfaces, text) */
--md-sys-color-background: #FFFBFE;          /* Page background */
--md-sys-color-on-background: #1C1B1F;       /* Text on background */
--md-sys-color-surface: #FFFBFE;             /* Component surface */
--md-sys-color-on-surface: #1C1B1F;          /* Text on surface */
--md-sys-color-surface-dim: #DDD7E0;         /* Dimmed surface variant */
--md-sys-color-surface-bright: #FFFBFE;      /* Bright surface variant */

/* SURFACE CONTAINERS - Layering system for depth */
--md-sys-color-surface-container-lowest: #FFFFFF;     /* Topmost layer */
--md-sys-color-surface-container-low: #F7F2FA;        /* Elevated button background */
--md-sys-color-surface-container: #F3EEF6;
--md-sys-color-surface-container-high: #EDE9F0;
--md-sys-color-surface-container-highest: #E8E3EB;    /* Deepest layer */

/* SEMANTIC COLORS */
--md-sys-color-outline: #79747E;             /* Border, divider colors */
--md-sys-color-outline-variant: #CAC4D0;     /* Secondary outline */
--md-sys-color-shadow: #000000;              /* Shadow color (used in elevation) */
--md-sys-color-scrim: #000000;               /* Modal backdrop color */

/* INVERSE COLORS - For dark themed surfaces on light backgrounds */
--md-sys-color-inverse-surface: #313033;     /* Inverse background */
--md-sys-color-inverse-on-surface: #F4EFF4; /* Text on inverse surface */
--md-sys-color-inverse-primary: #D0BCFF;    /* Inverse primary color */

/*
================================================================================
                        SHAPE SYSTEM
================================================================================

Corner radius values for consistent rounding across components.
M3 uses a token-based approach where components reference shape tokens.
*/

--md-sys-shape-corner-full: 9999px;           /* Fully rounded (pills, buttons) */
--md-sys-shape-corner-extra-large: 28px;      /* Very rounded corners */
--md-sys-shape-corner-large: 16px;            /* Large rounding */
--md-sys-shape-corner-medium: 12px;           /* Medium rounding */
--md-sys-shape-corner-small: 8px;             /* Small rounding */
--md-sys-shape-corner-extra-small: 4px;       /* Minimal rounding */

/*
================================================================================
                        ELEVATION SYSTEM
================================================================================

Elevation uses shadow tokens to create depth. M3 defines 5 elevation levels.
The shadow includes multiple layers for realistic depth perception:
1. Umbra (dark shadow directly beneath)
2. Penumbra (slightly diffuse shadow)
3. Ambient (very diffuse shadow for overall depth)

Level 0: No elevation (flat surfaces)
Level 1-5: Increasingly elevated surfaces

Typical usage:
- Level 0: Base surface (background)
- Level 1: Elevated components (filled button, raised surface)
- Level 2: Floating elements (cards, menus)
- Level 3+: Modals, popups, critical overlays
*/

--md-sys-elevation-level-0: 0px 0px 0px 0px rgba(0, 0, 0, 0);
--md-sys-elevation-level-1: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
                            0px 1px 3px 1px rgba(0, 0, 0, 0.15);
--md-sys-elevation-level-2: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
                            0px 2px 6px 2px rgba(0, 0, 0, 0.15);
--md-sys-elevation-level-3: 0px 3px 6px 0px rgba(0, 0, 0, 0.3),
                            0px 1px 9px 0px rgba(0, 0, 0, 0.15);
--md-sys-elevation-level-4: 0px 2px 3px 0px rgba(0, 0, 0, 0.3),
                            0px 6px 10px 0px rgba(0, 0, 0, 0.15);
--md-sys-elevation-level-5: 0px 4px 4px 0px rgba(0, 0, 0, 0.3),
                            0px 8px 12px 0px rgba(0, 0, 0, 0.15);

/*
================================================================================
                        STATE LAYER SYSTEM (M3 Unique Feature)
================================================================================

Instead of changing colors directly on hover/focus, M3 uses semi-transparent
overlay layers. This maintains color consistency while showing state.

The opacity varies by state:
- Hover: 8% - subtle visual feedback
- Focus: 12% - medium visibility for keyboard navigation
- Pressed: 12% - same as focus for consistency
- Dragged: 16% - higher visibility for drag operations

How it works:
1. The base color stays the same
2. A semi-transparent overlay using currentColor or --on-color is applied
3. Different opacities for different states

This approach provides:
- Better accessibility (state is visible via opacity, not color alone)
- Consistency across all components
- Compatibility with theming (uses current color context)
*/

--md-sys-state-hover-state-layer-opacity: 0.08;
--md-sys-state-focus-state-layer-opacity: 0.12;
--md-sys-state-pressed-state-layer-opacity: 0.12;
--md-sys-state-dragged-state-layer-opacity: 0.16;

/*
================================================================================
                        TRANSITION SYSTEM
================================================================================

M3 uses specific timing functions and durations for consistent animations:

Duration:
- Short (50ms): Small, quick interactions (opacity changes)
- Medium (200ms): Standard transitions (elevation, color)
- Long (500ms): Large movements (drawer open, expansion)

Easing:
- Linear: Equal speed throughout (used for opacity)
- Emphasized (standard): Cubic-bezier(0.2, 0, 0, 1)
  - Slower start, faster end (natural, energetic feel)
  - Used for elevation, color, and position changes
*/

--md-sys-transition-duration: 200ms;
--md-sys-transition-duration-short: 50ms;
--md-sys-transition-duration-medium: 200ms;
--md-sys-transition-duration-long: 500ms;

--md-sys-transition-easing: cubic-bezier(0.2, 0, 0, 1);
--md-sys-transition-easing-linear: cubic-bezier(0, 0, 1, 1);
--md-sys-transition-easing-emphasized: cubic-bezier(0.2, 0, 0, 1);

/*
================================================================================
                        TYPOGRAPHY SYSTEM
================================================================================

M3 defines 13 typescale styles across three scale categories:
- Display (3 sizes): Large, Medium, Small
- Headline (3 sizes): Large, Medium, Small
- Title (3 sizes): Large, Medium, Small
- Body (3 sizes): Large, Medium, Small
- Label (3 sizes): Large, Medium, Small

Each style includes:
- Font family
- Font size
- Line height
- Font weight
- Letter spacing (tracking)

Hierarchy:
- Display: Page titles, hero text (32px, 28px, 24px)
- Headline: Section headers (32px, 28px, 24px)
- Title: Subsection headers (22px, 16px, 14px)
- Body: Running text content (16px, 14px, 12px)
- Label: UI labels, buttons (14px, 12px, 11px)

BUTTON USES: --md-sys-typescale-label-large (14px, 500 weight, 0.1px tracking)
*/

/* Display Large - Hero text (32px) */
--md-sys-typescale-display-large-font: 'Roboto', sans-serif;
--md-sys-typescale-display-large-size: 32px;
--md-sys-typescale-display-large-line-height: 40px;
--md-sys-typescale-display-large-weight: 400;
--md-sys-typescale-display-large-tracking: 0px;

/* Display Medium (28px) */
--md-sys-typescale-display-medium-font: 'Roboto', sans-serif;
--md-sys-typescale-display-medium-size: 28px;
--md-sys-typescale-display-medium-line-height: 36px;
--md-sys-typescale-display-medium-weight: 400;
--md-sys-typescale-display-medium-tracking: 0px;

/* Display Small (24px) */
--md-sys-typescale-display-small-font: 'Roboto', sans-serif;
--md-sys-typescale-display-small-size: 24px;
--md-sys-typescale-display-small-line-height: 32px;
--md-sys-typescale-display-small-weight: 400;
--md-sys-typescale-display-small-tracking: 0px;

/* Headline Large (32px) */
--md-sys-typescale-headline-large-font: 'Roboto', sans-serif;
--md-sys-typescale-headline-large-size: 32px;
--md-sys-typescale-headline-large-line-height: 40px;
--md-sys-typescale-headline-large-weight: 400;
--md-sys-typescale-headline-large-tracking: 0px;

/* Headline Medium (28px) */
--md-sys-typescale-headline-medium-font: 'Roboto', sans-serif;
--md-sys-typescale-headline-medium-size: 28px;
--md-sys-typescale-headline-medium-line-height: 36px;
--md-sys-typescale-headline-medium-weight: 400;
--md-sys-typescale-headline-medium-tracking: 0px;

/* Headline Small (24px) */
--md-sys-typescale-headline-small-font: 'Roboto', sans-serif;
--md-sys-typescale-headline-small-size: 24px;
--md-sys-typescale-headline-small-line-height: 32px;
--md-sys-typescale-headline-small-weight: 400;
--md-sys-typescale-headline-small-tracking: 0px;

/* Title Large (22px) */
--md-sys-typescale-title-large-font: 'Roboto', sans-serif;
--md-sys-typescale-title-large-size: 22px;
--md-sys-typescale-title-large-line-height: 28px;
--md-sys-typescale-title-large-weight: 500;
--md-sys-typescale-title-large-tracking: 0px;

/* Title Medium (16px) */
--md-sys-typescale-title-medium-font: 'Roboto', sans-serif;
--md-sys-typescale-title-medium-size: 16px;
--md-sys-typescale-title-medium-line-height: 24px;
--md-sys-typescale-title-medium-weight: 500;
--md-sys-typescale-title-medium-tracking: 0.15px;

/* Title Small (14px) */
--md-sys-typescale-title-small-font: 'Roboto', sans-serif;
--md-sys-typescale-title-small-size: 14px;
--md-sys-typescale-title-small-line-height: 20px;
--md-sys-typescale-title-small-weight: 500;
--md-sys-typescale-title-small-tracking: 0.1px;

/* ⭐ LABEL LARGE (14px) - USED BY BUTTONS */
--md-sys-typescale-label-large-font: 'Roboto', sans-serif;
--md-sys-typescale-label-large-size: 14px;
--md-sys-typescale-label-large-line-height: 20px;
--md-sys-typescale-label-large-weight: 500;
--md-sys-typescale-label-large-tracking: 0.1px;

/* Label Medium (12px) */
--md-sys-typescale-label-medium-font: 'Roboto', sans-serif;
--md-sys-typescale-label-medium-size: 12px;
--md-sys-typescale-label-medium-line-height: 16px;
--md-sys-typescale-label-medium-weight: 500;
--md-sys-typescale-label-medium-tracking: 0.5px;

/* Label Small (11px) */
--md-sys-typescale-label-small-font: 'Roboto', sans-serif;
--md-sys-typescale-label-small-size: 11px;
--md-sys-typescale-label-small-line-height: 16px;
--md-sys-typescale-label-small-weight: 500;
--md-sys-typescale-label-small-tracking: 0.5px;

/* Body Large (16px) - Default reading text */
--md-sys-typescale-body-large-font: 'Roboto', sans-serif;
--md-sys-typescale-body-large-size: 16px;
--md-sys-typescale-body-large-line-height: 24px;
--md-sys-typescale-body-large-weight: 400;
--md-sys-typescale-body-large-tracking: 0.5px;

/* Body Medium (14px) */
--md-sys-typescale-body-medium-font: 'Roboto', sans-serif;
--md-sys-typescale-body-medium-size: 14px;
--md-sys-typescale-body-medium-line-height: 20px;
--md-sys-typescale-body-medium-weight: 400;
--md-sys-typescale-body-medium-tracking: 0.25px;

/* Body Small (12px) - Captions, helper text */
--md-sys-typescale-body-small-font: 'Roboto', sans-serif;
--md-sys-typescale-body-small-size: 12px;
--md-sys-typescale-body-small-line-height: 16px;
--md-sys-typescale-body-small-weight: 400;
--md-sys-typescale-body-small-tracking: 0.4px;
