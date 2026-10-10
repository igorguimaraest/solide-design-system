// Generated from solide-tokens.css. Do not edit. Native color contract; no mobile layout implied.
export const lightTheme = {
  "colors": {
    "accent": "#2D7CF6",
    "destructive": "#A92F27",
    "success": "#197A49",
    "warning": "#8A4F05",
    "caution": "#8A4F05"
  },
  "surfaces": {
    "primary": "#FFFFFF",
    "secondary": "#E4E6EA",
    "elevated": "#FFFFFF"
  },
  "text": {
    "primary": "#222224",
    "secondary": "#636669",
    "tertiary": "#636669"
  },
  "border": "#D7DBDF",
  "action": {
    "primary": "#1D63D6",
    "foreground": "#FFFFFF",
    "hover": "#154FAF",
    "active": "#123F87"
  }
};
export const darkTheme = {
  "colors": {
    "accent": "#5C9EFF",
    "destructive": "#EE6E62",
    "success": "#4CC685",
    "warning": "#E8A542",
    "caution": "#E8A542"
  },
  "surfaces": {
    "primary": "#222224",
    "secondary": "#111112",
    "elevated": "#2B2C2E"
  },
  "text": {
    "primary": "#F8F9FA",
    "secondary": "#BCC0C5",
    "tertiary": "#A0A4A8"
  },
  "border": "#36383A",
  "action": {
    "primary": "#5C9EFF",
    "foreground": "#111112",
    "hover": "#93BFFF",
    "active": "#2D7CF6"
  }
};
export type AppTheme = typeof lightTheme;
export type ThemeMode = 'light' | 'dark';
export function getTheme(mode: ThemeMode): AppTheme { return mode === 'dark' ? darkTheme : lightTheme; }
