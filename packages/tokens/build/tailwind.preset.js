/** Maps utilities only; never injects a competing token source. */
module.exports = {
  darkMode: ["class", "[data-theme=dark]"],
  theme: {
    extend: {
      colors: {
        solide: {
          canvas: 'var(--solide-bg-canvas)',
          surface: 'var(--solide-bg-surface)',
          elevated: 'var(--solide-bg-surface-elevated)',
          primary: 'var(--solide-text-primary)',
          secondary: 'var(--solide-text-secondary)',
          muted: 'var(--solide-text-muted)',
          tertiary: 'var(--sld-text-muted)',
          'surface-sunken': 'var(--sld-surface-sunken)',
          'surface-elevated': 'var(--sld-surface-raised)',
          subtle: 'var(--solide-border-subtle)',
          strong: 'var(--solide-border-strong)',
          focus: 'var(--solide-ring-focus, var(--solide-focus-ring))',
          success: 'var(--solide-feedback-success)',
          error: 'var(--solide-feedback-error)',
          warning: 'var(--solide-feedback-warning)',
          info: 'var(--solide-feedback-info)',
          neutral: {
            0: 'var(--surface-primary)',
            50: 'var(--surface-secondary)',
            100: 'var(--surface-hover)',
            200: 'var(--border-subtle)',
            300: 'var(--sld-border-strong)',
            400: 'var(--text-tertiary)',
            500: 'var(--text-tertiary)',
            600: 'var(--text-secondary)',
            700: 'var(--text-primary)',
            800: 'var(--surface-elevated)',
            900: 'var(--surface-primary)',
            950: 'var(--surface-primary)',
            1000: 'var(--surface-primary)'
          }
        }
      },
      backgroundColor: {
        'solide-canvas': 'var(--solide-bg-canvas)',
        'solide-surface': 'var(--solide-bg-surface)',
        'solide-elevated': 'var(--solide-bg-surface-elevated)',
        'solide-surface-sunken': 'var(--sld-surface-sunken)',
        'solide-surface-elevated': 'var(--sld-surface-raised)',
        'solide-success': 'var(--solide-feedback-success)',
        'solide-error': 'var(--solide-feedback-error)',
        'solide-warning': 'var(--solide-feedback-warning)',
        'solide-info': 'var(--solide-feedback-info)'
      },
      textColor: {
        'solide-primary': 'var(--solide-text-primary)',
        'solide-secondary': 'var(--solide-text-secondary)',
        'solide-muted': 'var(--solide-text-muted)',
        'solide-tertiary': 'var(--sld-text-muted)',
        'solide-success': 'var(--solide-feedback-success)',
        'solide-error': 'var(--solide-feedback-error)',
        'solide-warning': 'var(--solide-feedback-warning)',
        'solide-info': 'var(--solide-feedback-info)'
      },
      borderColor: {
        'solide-subtle': 'var(--solide-border-subtle)',
        'solide-strong': 'var(--solide-border-strong)',
        'solide-success': 'var(--solide-feedback-success)',
        'solide-error': 'var(--solide-feedback-error)',
        'solide-warning': 'var(--solide-feedback-warning)',
        'solide-info': 'var(--solide-feedback-info)'
      },
      ringColor: {
        'solide-focus': 'var(--solide-ring-focus, var(--solide-focus-ring))',
        'solide-error': 'var(--solide-feedback-error)',
        'solide-success': 'var(--solide-feedback-success)'
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
