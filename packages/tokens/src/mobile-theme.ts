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
    "secondary": "#E9E6DE",
    "elevated": "#FFFFFF"
  },
  "text": {
    "primary": "#242220",
    "secondary": "#6B675F",
    "tertiary": "#6B675F"
  },
  "border": "#DEDAD0",
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
    "primary": "#242220",
    "secondary": "#121110",
    "elevated": "#2E2C29"
  },
  "text": {
    "primary": "#FAF9F6",
    "secondary": "#C4BFB4",
    "tertiary": "#A8A399"
  },
  "border": "#3A3733",
  "action": {
    "primary": "#5C9EFF",
    "foreground": "#121110",
    "hover": "#93BFFF",
    "active": "#2D7CF6"
  }
};
export type AppTheme = typeof lightTheme;
export type ThemeMode = 'light' | 'dark';
export function getTheme(mode: ThemeMode): AppTheme { return mode === 'dark' ? darkTheme : lightTheme; }
