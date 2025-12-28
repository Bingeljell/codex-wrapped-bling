/**
 * Codex Wrapped Design Tokens
 *
 * Comprehensive design system for pixel-perfect image generation.
 * All values follow an 8px grid system for consistent visual rhythm.
 */

// =============================================================================
// COLOR PALETTE
// =============================================================================

/**
 * Core color palette - Codex dark theme with blue/cyan accents
 * All text colors meet WCAG AA standards where possible for legibility
 */
export const colors = {
  // Backgrounds
  background: "#0B1A12", // Deep evergreen
  surface: "#14251B", // Elevated surface for cards
  surfaceHover: "#1B2F24", // Hover state for surfaces
  surfaceBorder: "#2B3D33", // Subtle border for depth

  // Text hierarchy (contrast ratios against #0B1A12)
  text: {
    primary: "#F6F3EE", // Warm white
    secondary: "#E3DCD2", // Soft white
    tertiary: "#C8BFB1", // Labels and captions
    muted: "#A99D8E", // Footer/subtle text
    disabled: "#7A6F62", // Disabled states
  },

  // Accent colors
  accent: {
    primary: "#D24B3A", // Holiday red
    primaryHover: "#E06352",
    secondary: "#3EBB74", // Holiday green
    tertiary: "#D9A441", // Gold highlight
  },

  // Semantic colors
  semantic: {
    success: "#3EBB74",
    warning: "#D9A441",
    error: "#D24B3A",
    info: "#4FA3C2",
  },

  // Heatmap colors - green progression (7 levels: 0-6)
  heatmap: {
    empty: "#101C15", // No activity
    level1: "#173022", // Very low
    level2: "#1F4630", // Low
    level3: "#265C3D", // Medium-low
    level4: "#2E734B", // Medium
    level5: "#369B62", // Medium-high
    level6: "#3EBB74", // High
    level7: "#5FD990", // Very high
  },

  // Streak colors - red progression (7 levels: 0-6)
  streak: {
    empty: "#241412", // No activity (dark red tint)
    level1: "#3A1916", // Very low
    level2: "#52201B", // Low
    level3: "#6D2720", // Medium-low
    level4: "#8B2F24", // Medium
    level5: "#B2372B", // Medium-high
    level6: "#D24B3A", // High
    level7: "#E06352", // Max (accent)
  },
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

/**
 * Typography scale following a 1.25 (Major Third) ratio
 * Base size: 16px
 */
export const typography = {
  // Font family
  fontFamily: {
    mono: "IBM Plex Mono",
  },

  // Font weights
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Font sizes (following 8px grid approximation)
  size: {
    xs: 12, // Legends, fine print
    sm: 14, // Captions, meta
    base: 16, // Base size
    md: 20, // Emphasized body
    lg: 24, // Labels, section titles
    xl: 32, // Stats numbers
    "2xl": 40, // Large stats
    "3xl": 48, // Section headers
    "4xl": 56, // Hero numbers
    "5xl": 64, // Title
    "6xl": 72, // Display
  },

  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.15,
    snug: 1.25,
    normal: 1.4,
    relaxed: 1.5,
    loose: 1.75,
  },

  // Letter spacing
  letterSpacing: {
    tighter: -2,
    tight: -1,
    normal: 0,
    wide: 1,
    wider: 2,
    widest: 4,
  },
} as const;

// =============================================================================
// SPACING (8px Grid System)
// =============================================================================

/**
 * Spacing scale based on 8px grid
 * All spacing values are multiples of 8 for consistent rhythm
 */
export const spacing = {
  0: 0,
  1: 4, // 0.5x - Fine adjustments
  2: 8, // 1x - Base unit
  3: 12, // 1.5x
  4: 16, // 2x - Common small spacing
  5: 20, // 2.5x
  6: 24, // 3x - Common medium spacing
  8: 32, // 4x
  10: 40, // 5x
  12: 48, // 6x
  14: 56, // 7x
  16: 64, // 8x - Large spacing
  20: 80, // 10x - Section spacing
  24: 96, // 12x - Major section spacing
} as const;

// =============================================================================
// LAYOUT
// =============================================================================

/**
 * Layout constants for the wrapped image
 */
export const layout = {
  // Canvas dimensions
  canvas: {
    width: 1500,
    height: 2100,
  },

  // Container padding
  padding: {
    horizontal: 64, // 8x base unit
    top: 64, // 8x
    bottom: 64, // 8x
  },

  // Content area (canvas minus padding)
  content: {
    width: 1322, // 1450 - (64 * 2)
  },

  // Border radius scale
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 24,
    full: 9999,
  },

  // Shadows (for potential future use with SVG filters)
  shadow: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },
} as const;

// =============================================================================
// COMPONENT TOKENS
// =============================================================================

/**
 * Pre-defined component styles for consistency
 */
export const components = {
  // Stat box styling
  statBox: {
    background: colors.surface,
    borderRadius: layout.radius.lg,
    padding: {
      x: 32,
      y: 24,
    },
    gap: 8,
  },

  // Card styling
  card: {
    background: colors.surface,
    borderRadius: layout.radius.lg,
    borderColor: colors.surfaceBorder,
    padding: spacing[6],
  },

  // Section header styling
  sectionHeader: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.medium,
    color: colors.text.secondary,
    letterSpacing: typography.letterSpacing.wider,
    textTransform: "uppercase" as const,
  },

  // Heatmap cell
  heatmapCell: {
    size: 23.4,
    gap: 3,
    borderRadius: layout.radius.sm,
  },

  // Legend
  legend: {
    fontSize: typography.size.xs,
    color: colors.text.muted,
    cellSize: 14,
    gap: 6,
  },

  // Rankings list
  ranking: {
    numberWidth: 48,
    numberSize: typography.size.xl,
    itemSize: typography.size.lg,
    gap: spacing[4],
    logoSize: 32,
    logoBorderRadius: layout.radius.md,
  },

  // Time of day heatmap
  timeHeatmap: {
    cellSize: 20,
    gap: 4,
    labelWidth: 24,
    labelFontSize: typography.size.xs,
    cellRadius: layout.radius.sm,
  },

  // Usage bar chart
  usageBar: {
    height: 10,
    radius: layout.radius.full,
  },
} as const;

// =============================================================================
// HEATMAP COLOR MAPS
// =============================================================================

/**
 * Heatmap intensity colors for activity visualization (7 levels: 0-6)
 */
export const HEATMAP_COLORS = {
  0: colors.heatmap.empty,
  1: colors.heatmap.level1,
  2: colors.heatmap.level2,
  3: colors.heatmap.level3,
  4: colors.heatmap.level4,
  5: colors.heatmap.level5,
  6: colors.heatmap.level6,
} as const;

/**
 * Streak day colors with green accent (7 levels: 0-6)
 */
export const STREAK_COLORS = {
  0: colors.streak.empty,
  1: colors.streak.level1,
  2: colors.streak.level2,
  3: colors.streak.level3,
  4: colors.streak.level4,
  5: colors.streak.level5,
  6: colors.streak.level7, // Use max green for streak visibility
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get spacing value with optional multiplier
 */
export function space(key: keyof typeof spacing): number {
  return spacing[key];
}

/**
 * Get font size from scale
 */
export function fontSize(key: keyof typeof typography.size): number {
  return typography.size[key];
}

/**
 * Get border radius
 */
export function radius(key: keyof typeof layout.radius): number {
  return layout.radius[key];
}
