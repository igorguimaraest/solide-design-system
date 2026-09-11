/**
 * Solide Unified Design System
 * Tailwind CSS Preset (W3C Design Tokens Community Group Standard)
 *
 * Compiles dynamic CSS variables into :root and .dark, providing:
 * - Surfaces: bg-solide-canvas, bg-solide-surface, bg-solide-elevated
 * - Typography: text-solide-primary, text-solide-secondary, text-solide-muted
 * - Borders: border-solide-subtle, border-solide-strong
 * - Focus: ring-solide-focus
 * - Functional Feedbacks: text-solide-error, bg-solide-success, border-solide-error, etc.
 */

const fs = require('fs');
const path = require('path');

const primitivesPath = path.resolve(__dirname, '../src/primitives.tokens.json');
const semanticPath = path.resolve(__dirname, '../src/semantic.tokens.json');

let primitives = {};
let semantic = {};

try {
  primitives = JSON.parse(fs.readFileSync(primitivesPath, 'utf8'));
  semantic = JSON.parse(fs.readFileSync(semanticPath, 'utf8'));
} catch (e) {
  // Graceful fallback if invoked in isolated runtime
}

// Resolver for aliases like {color.neutral.0} or {color.functional.success}
function resolveTokenAlias(alias, root) {
  if (typeof alias !== 'string') return alias;
  const match = alias.match(/^\{([^}]+)\}$/);
  if (!match) return alias;
  const pathParts = match[1].split('.');
  
  let curr = root;
  for (const part of pathParts) {
    if (curr && curr[part] !== undefined) {
      curr = curr[part];
    } else {
      return alias;
    }
  }
  return curr && curr['$value'] !== undefined ? curr['$value'] : curr;
}

// Generate CSS Variables for Light and Dark modes
function buildDynamicVariables() {
  const lightVars = {};
  const darkVars = {};

  // 1. Primitive Neutrals
  if (primitives.color && primitives.color.neutral) {
    for (const [step, token] of Object.entries(primitives.color.neutral)) {
      if (token && token['$value']) {
        lightVars[`--solide-color-neutral-${step}`] = token['$value'];
        darkVars[`--solide-color-neutral-${step}`] = token['$value'];
      }
    }
  }

  // 2. Functional Primitives
  if (primitives.color && primitives.color.functional) {
    for (const [tone, token] of Object.entries(primitives.color.functional)) {
      if (token && token['$value']) {
        lightVars[`--solide-color-${tone}`] = token['$value'];
        darkVars[`--solide-color-${tone}`] = token['$value'];
        lightVars[`--solide-feedback-${tone}`] = token['$value'];
        darkVars[`--solide-feedback-${tone}`] = token['$value'];
      }
    }
  }

  // 3. Opacity Tokens
  if (primitives.opacity) {
    for (const [key, token] of Object.entries(primitives.opacity)) {
      if (token && token['$value']) {
        const val = token['$value'];
        lightVars[`--solide-opacity-${key}`] = val;
        darkVars[`--solide-opacity-${key}`] = val;
      }
    }
  }

  // 4. Semantic Light
  const lightRoles = (semantic.theme && semantic.theme.light) || (semantic.semantic && semantic.semantic.light) || {};
  for (const [role, token] of Object.entries(lightRoles)) {
    if (token && token['$value']) {
      const resolved = resolveTokenAlias(token['$value'], primitives);
      lightVars[`--solide-${role}`] = resolved;
      if (role === 'ring-focus') {
        lightVars['--solide-focus-ring'] = resolved;
      }
    }
  }

  // 5. Semantic Dark
  const darkRoles = (semantic.theme && semantic.theme.dark) || (semantic.semantic && semantic.semantic.dark) || {};
  for (const [role, token] of Object.entries(darkRoles)) {
    if (token && token['$value']) {
      const resolved = resolveTokenAlias(token['$value'], primitives);
      darkVars[`--solide-${role}`] = resolved;
      if (role === 'ring-focus') {
        darkVars['--solide-focus-ring'] = resolved;
      }
    }
  }

  return { lightVars, darkVars };
}

const { lightVars, darkVars } = buildDynamicVariables();

function createTailwindPlugin() {
  // Os tokens são carregados por @solide/tokens. O preset só mapeia classes;
  // ele não pode injetar uma segunda família de variáveis a partir de JSONs
  // legados, pois isso sobrescreveria o contrato do brand guide.
  const handler = function() {};

  try {
    const plugin = require('tailwindcss/plugin');
    return plugin(handler);
  } catch (e) {
    return { handler };
  }
}

module.exports = {
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
        'solide-success': 'var(--solide-feedback-success)',
        'solide-error': 'var(--solide-feedback-error)',
        'solide-warning': 'var(--solide-feedback-warning)',
        'solide-info': 'var(--solide-feedback-info)'
      },
      textColor: {
        'solide-primary': 'var(--solide-text-primary)',
        'solide-secondary': 'var(--solide-text-secondary)',
        'solide-muted': 'var(--solide-text-muted)',
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
      fontFamily: {
        display: ['Inter', '-apple-system', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: [
    createTailwindPlugin()
  ],
  __solideTokens: {
    primitives,
    semantic,
    cssVariables: {
      light: lightVars,
      dark: darkVars
    }
  }
};
