/**
 * Solide Design System — tema mobile
 * Mobile Theme Definition (TypeScript / React Native / Flutter)
 *
 * Implements strict semantic tokens avoiding hardcoded hex values.
 * As superfícies seguem a mesma arquitetura neutra do guia web.
 */

export interface AppTheme {
  colors: {
    accent: string;
    destructive: string;
    success: string;
    warning: string;
    caution: string;
  };
  surfaces: {
    primary: string;
    secondary: string;
    elevated: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  border: string;
  effects?: {
    blurSurface: {
      background: string;
      blurRadius: string;
    };
  };
}

export const lightTheme: AppTheme = {
  colors: {
    accent: '#0040DD',
    destructive: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    caution: '#FFCC00',
  },
  surfaces: {
    primary: '#FFFFFF',
    secondary: '#E9E9E6',
    elevated: '#FFFFFF',
  },
  text: {
    primary: '#000000',
    secondary: '#6A6A70',
    tertiary: '#6A6A70',
  },
  border: '#C6C6C8',
  effects: {
    blurSurface: {
      background: 'rgba(255, 255, 255, 0.80)',
      blurRadius: '20px',
    },
  },
};

export const darkTheme: AppTheme = {
  colors: {
    accent: '#0F5FE8',
    destructive: '#FF453A',
    success: '#30D158',
    warning: '#FF9F0A',
    caution: '#FFD60A',
  },
  surfaces: {
    primary: '#000000',
    secondary: '#1C1C1E',
    elevated: '#1C1C1E',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#8E8E93',
    tertiary: '#8E8E93',
  },
  border: '#38383A',
  effects: {
    blurSurface: {
      background: 'rgba(28, 28, 30, 0.80)',
      blurRadius: '20px',
    },
  },
};

export type ThemeMode = 'light' | 'dark';

export function getTheme(mode: ThemeMode): AppTheme {
  return mode === 'dark' ? darkTheme : lightTheme;
}
