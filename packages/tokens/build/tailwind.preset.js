/** Maps utilities only; never injects a competing token source. */
module.exports = {
  darkMode: ["class", "[data-theme=dark]"],
  theme: {
    extend: {
      colors: {
        solide: {
          canvas: 'var(--sld-surface-canvas)',
          surface: 'var(--sld-surface-card)',
          elevated: 'var(--sld-surface-raised)',
          primary: 'var(--sld-text-primary)',
          secondary: 'var(--sld-text-secondary)',
          muted: 'var(--sld-text-muted)',
          tertiary: 'var(--sld-text-muted)',
          'surface-sunken': 'var(--sld-surface-sunken)',
          'surface-elevated': 'var(--sld-surface-raised)',
          subtle: 'var(--sld-border-subtle)',
          strong: 'var(--sld-border-strong)',
          focus: 'var(--sld-action-focusRing)',
          success: 'var(--sld-status-success-text)',
          error: 'var(--sld-status-danger-text)',
          warning: 'var(--sld-status-warning-text)',
          info: 'var(--sld-status-info-text)',
          neutral: {
            0: 'var(--sld-surface-card)',
            50: 'var(--sld-surface-shell)',
            100: 'var(--sld-surface-hover)',
            200: 'var(--sld-border-subtle)',
            300: 'var(--sld-border-strong)',
            400: 'var(--sld-text-muted)',
            500: 'var(--sld-text-muted)',
            600: 'var(--sld-text-secondary)',
            700: 'var(--sld-text-primary)',
            800: 'var(--sld-surface-raised)',
            900: 'var(--sld-surface-card)',
            950: 'var(--sld-surface-card)',
            1000: 'var(--sld-surface-card)'
          }
        }
      },
      backgroundColor: {
        'solide-canvas': 'var(--sld-surface-canvas)',
        'solide-surface': 'var(--sld-surface-card)',
        'solide-elevated': 'var(--sld-surface-raised)',
        'solide-surface-sunken': 'var(--sld-surface-sunken)',
        'solide-surface-elevated': 'var(--sld-surface-raised)',
        'solide-success': 'var(--sld-status-success-text)',
        'solide-error': 'var(--sld-status-danger-text)',
        'solide-warning': 'var(--sld-status-warning-text)',
        'solide-info': 'var(--sld-status-info-text)'
      },
      textColor: {
        'solide-primary': 'var(--sld-text-primary)',
        'solide-secondary': 'var(--sld-text-secondary)',
        'solide-muted': 'var(--sld-text-muted)',
        'solide-tertiary': 'var(--sld-text-muted)',
        'solide-success': 'var(--sld-status-success-text)',
        'solide-error': 'var(--sld-status-danger-text)',
        'solide-warning': 'var(--sld-status-warning-text)',
        'solide-info': 'var(--sld-status-info-text)'
      },
      borderColor: {
        'solide-subtle': 'var(--sld-border-subtle)',
        'solide-strong': 'var(--sld-border-strong)',
        'solide-success': 'var(--sld-status-success-text)',
        'solide-error': 'var(--sld-status-danger-text)',
        'solide-warning': 'var(--sld-status-warning-text)',
        'solide-info': 'var(--sld-status-info-text)'
      },
      ringColor: {
        'solide-focus': 'var(--sld-action-focusRing)',
        'solide-error': 'var(--sld-status-danger-text)',
        'solide-success': 'var(--sld-status-success-text)'
      },
      opacity: {
        'solide-hover': 'var(--solide-opacity-hover, 0.08)',
        'solide-active': 'var(--solide-opacity-active, 0.16)',
        'solide-focus-ring': 'var(--solide-opacity-focus-ring, 0.40)',
        'solide-disabled': 'var(--solide-opacity-disabled, 0.45)'
      },
      boxShadow: Object.fromEntries(['xs','sm','md','lg','xl'].map(k=>[k,`var(--sld-shadow-${k})`])),
      borderRadius: {sm:'var(--sld-radius-sm)', DEFAULT:'var(--sld-radius-sm)', md:'var(--sld-radius-md)',lg:'var(--sld-radius-md)',xl:'var(--sld-radius-lg)','2xl':'var(--sld-radius-xl)',full:'var(--sld-radius-full)'},
      fontFamily: {
        ui: ['var(--sld-font-ui)'],
        display: ['Inter', '-apple-system', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
};
