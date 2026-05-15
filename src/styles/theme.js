/**
 * theme.js
 *
 * Single source of truth for all design tokens used across the app.
 * Update colors, spacing, or typography here and it reflects everywhere.
 */

export const colors = {
  // Background layers — darkest to lightest
  bgBase: "#0a0f1e",
  bgSurface: "#111827",
  bgCard: "#162032",
  bgInput: "#0d1525",
  bgHighlight: "#1a2d45",

  // Borders
  borderSubtle: "#1e2d3d",
  borderDefault: "#2d3f55",
  borderStrong: "#3d5270",

  // Text
  textPrimary: "#e8edf5",
  textSecondary: "#8da3bb",
  textMuted: "#3d5068",
  textDisabled: "#2a3a4d",

  // Brand / accent
  accent: "#4a7fbd",
  accentHover: "#5a8fc9",
  accentMuted: "#4a7fbd18",
  accentBorder: "#4a7fbd30",

  // Status colors (used in verdict / indicators)
  success: "#2db87b",
  successMuted: "#2db87b18",
  warning: "#d4991a",
  warningMuted: "#d4991a18",
  danger: "#c95f3f",
  dangerMuted: "#c95f3f18",

  // Gold — for board verdict / premium accents
  gold: "#c9a84c",
  goldMuted: "#c9a84c12",
  goldBorder: "#c9a84c28",
};

// Each advisor has its own brand color for visual differentiation
export const advisorColors = {
  vc: {
    main: "#4a7fbd",
    fill: "#4a7fbd15",
    border: "#4a7fbd28",
  },
  cfo: {
    main: "#2ea8d5",
    fill: "#2ea8d515",
    border: "#2ea8d528",
  },
  growth: {
    main: "#2db87b",
    fill: "#2db87b15",
    border: "#2db87b28",
  },
  devil: {
    main: "#d4821a",
    fill: "#d4821a15",
    border: "#d4821a28",
  },
  expert: {
    main: "#8b72d4",
    fill: "#8b72d415",
    border: "#8b72d428",
  },
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "40px",
  xxl: "64px",
};

export const borderRadius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  pill: "9999px",
};

export const typography = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  sizes: {
    xs: "10px",
    sm: "12px",
    base: "14px",
    md: "15px",
    lg: "18px",
    xl: "24px",
    xxl: "36px",
  },
};
