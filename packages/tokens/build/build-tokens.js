const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Load Token Files
const primitives = JSON.parse(fs.readFileSync(path.join(srcDir, 'primitives.tokens.json'), 'utf8'));
const semantic = JSON.parse(fs.readFileSync(path.join(srcDir, 'semantic.tokens.json'), 'utf8'));

// Helper to resolve alias references like {color.neutral.0}
function resolveAlias(alias) {
  if (typeof alias !== 'string') return alias;
  const match = alias.match(/^\{([^}]+)\}$/);
  if (!match) return alias;
  const parts = match[1].split('.');
  let curr = primitives;
  for (const part of parts) {
    if (curr && curr[part] !== undefined) {
      curr = curr[part];
    } else {
      return alias;
    }
  }
  return curr && curr['$value'] !== undefined ? curr['$value'] : curr;
}

// Generate CSS
let css = `/**
 * SOLIDE UNIFIED DESIGN SYSTEM TOKENS v3.3.0
 * W3C Design Tokens Community Group Standard
 * Generated automatically from primitives.tokens.json & semantic.tokens.json
 */

:root {
  /* =========================================================================
     TOKENS SEMÂNTICOS DE SUPERFÍCIE
     ========================================================================= */
  --color-accent: #0040DD;
  --color-destructive: #FF3B30;
  --color-success: #34C759;
  --color-warning: #FF9500;
  --color-caution: #FFCC00;

  --surface-primary: #FFFFFF;
  --surface-secondary: #E9E9E6;
  --surface-elevated: #FFFFFF;

  --text-primary: #000000;
  --text-secondary: #6A6A70;
  --text-tertiary: #6A6A70;

  --border-subtle: #C6C6C8;
  --nav-background: rgba(255, 255, 255, 0.80);

  /* --- 1. PRIMITIVAS NEUTRAS ARDÓSIA (0 A 1000) --- */
`;

if (primitives.color && primitives.color.neutral) {
  for (const [step, token] of Object.entries(primitives.color.neutral)) {
    css += `  --solide-color-neutral-${step}: ${token['$value']};\n`;
    css += `  --sld-color-neutral-${step}: ${token['$value']};\n`;
  }
}

css += `\n  /* --- 2. CORES FUNCIONAIS DE FEEDBACK --- */\n`;
if (primitives.color && primitives.color.functional) {
  for (const [tone, token] of Object.entries(primitives.color.functional)) {
    css += `  --solide-color-${tone}: ${token['$value']};\n`;
    css += `  --solide-feedback-${tone}: ${token['$value']};\n`;
    css += `  --sld-color-${tone}: ${token['$value']};\n`;
  }
}

css += `\n  /* --- 3. TOKENS DE OPACIDADE NUMÉRICA --- */\n`;
if (primitives.opacity) {
  for (const [key, token] of Object.entries(primitives.opacity)) {
    css += `  --solide-opacity-${key}: ${token['$value']};\n`;
  }
}

css += `\n  /* --- 4. PAPÉIS SEMÂNTICOS: LIGHT MODE --- */\n`;
const lightRoles = (semantic.theme && semantic.theme.light) || (semantic.semantic && semantic.semantic.light) || {};
for (const [role, token] of Object.entries(lightRoles)) {
  const resolved = resolveAlias(token['$value']);
  css += `  --solide-${role}: ${resolved};\n`;
  if (role === 'ring-focus') {
    css += `  --solide-focus-ring: ${resolved};\n`;
    css += `  --sld-focus-ring: ${resolved};\n`;
  }
  if (role === 'bg-canvas') css += `  --sld-surface-base: ${resolved};\n`;
  if (role === 'bg-surface') css += `  --sld-surface-card: ${resolved};\n`;
  if (role === 'bg-surface-elevated') css += `  --sld-surface-raised: ${resolved};\n`;
  if (role === 'border-subtle') css += `  --sld-border-default: ${resolved};\n`;
  if (role === 'border-strong') css += `  --sld-border-strong: ${resolved};\n`;
  if (role === 'text-primary') css += `  --sld-text-primary: ${resolved};\n`;
  if (role === 'text-secondary') css += `  --sld-text-secondary: ${resolved};\n`;
  if (role === 'text-muted') css += `  --sld-text-muted: ${resolved};\n`;
}

css += `\n  /* --- 5. ESPAÇAMENTO BASE-4 / BASE-8 --- */\n`;
if (primitives.spacing) {
  for (const [step, token] of Object.entries(primitives.spacing)) {
    css += `  --solide-space-${step}: ${token['$value']};\n`;
    css += `  --sld-space-${step}: ${token['$value']};\n`;
  }
}

css += `\n  /* --- 6. TIPOGRAFIA & RAIO --- */\n`;
if (primitives.typography && primitives.typography.fontFamily) {
  for (const [name, token] of Object.entries(primitives.typography.fontFamily)) {
    css += `  --solide-font-${name}: ${token['$value']};\n`;
    css += `  --sld-font-${name}: ${token['$value']};\n`;
  }
}
if (primitives.borderRadius) {
  for (const [name, token] of Object.entries(primitives.borderRadius)) {
    css += `  --solide-radius-${name}: ${token['$value']};\n`;
    css += `  --sld-radius-${name}: ${token['$value']};\n`;
  }
}

css += `}\n\n`;

// Dark Mode Overrides
css += `/* --- DARK MODE OVERRIDES (.dark & [data-theme="dark"]) --- */\n`;
css += `.dark, [data-theme="dark"] {\n`;
css += `  --color-accent: #0F5FE8;\n`;
css += `  --color-destructive: #FF453A;\n`;
css += `  --color-success: #30D158;\n`;
css += `  --color-warning: #FF9F0A;\n`;
css += `  --color-caution: #FFD60A;\n`;
css += `  --surface-primary: #000000;\n`;
css += `  --surface-secondary: #1C1C1E;\n`;
css += `  --surface-elevated: #1C1C1E;\n`;
css += `  --text-primary: #FFFFFF;\n`;
css += `  --text-secondary: #8E8E93;\n`;
css += `  --text-tertiary: #8E8E93;\n`;
css += `  --border-subtle: #38383A;\n`;
css += `  --nav-background: rgba(28, 28, 30, 0.80);\n`;
const darkRoles = (semantic.theme && semantic.theme.dark) || (semantic.semantic && semantic.semantic.dark) || {};
for (const [role, token] of Object.entries(darkRoles)) {
  const resolved = resolveAlias(token['$value']);
  css += `  --solide-${role}: ${resolved};\n`;
  if (role === 'ring-focus') {
    css += `  --solide-focus-ring: ${resolved};\n`;
    css += `  --sld-focus-ring: ${resolved};\n`;
  }
  if (role === 'bg-canvas') css += `  --sld-surface-base: ${resolved};\n`;
  if (role === 'bg-surface') css += `  --sld-surface-card: ${resolved};\n`;
  if (role === 'bg-surface-elevated') css += `  --sld-surface-raised: ${resolved};\n`;
  if (role === 'border-subtle') css += `  --sld-border-default: ${resolved};\n`;
  if (role === 'border-strong') css += `  --sld-border-strong: ${resolved};\n`;
  if (role === 'text-primary') css += `  --sld-text-primary: ${resolved};\n`;
  if (role === 'text-secondary') css += `  --sld-text-secondary: ${resolved};\n`;
  if (role === 'text-muted') css += `  --sld-text-muted: ${resolved};\n`;
}
css += `}\n\n`;

css += `/* --- CLASSES UTILITÁRIAS PRONTAS --- */\n`;
css += `.app-header {\n`;
css += `  background-color: var(--nav-background);\n`;
css += `  backdrop-filter: blur(20px);\n`;
css += `  -webkit-backdrop-filter: blur(20px);\n`;
css += `  border-bottom: 1px solid var(--border-subtle);\n`;
css += `}\n`;


// O contrato visual normativo vive no CSS carregado pelo brand guide.
// O pacote publica uma cópia exata para impedir que guia e aplicações
// evoluam como dois sistemas diferentes.
const guideTokensFile = path.resolve(__dirname, '../../../solide-tokens.css');
if (!fs.existsSync(guideTokensFile)) {
  throw new Error(`Fonte canônica não encontrada: ${guideTokensFile}`);
}
fs.copyFileSync(guideTokensFile, path.join(distDir, 'tokens.css'));

// Re-export tailwind preset into dist/tailwind-theme.js
const tailwindThemeCode = `/**
 * Solide Design System Tailwind Theme (v3.3.0)
 * Re-exports packages/tokens/build/tailwind.preset.js
 */
module.exports = require('../build/tailwind.preset.js');
`;
fs.writeFileSync(path.join(distDir, 'tailwind-theme.js'), tailwindThemeCode);

console.log('Build completed successfully: canonical guide tokens copied and Tailwind theme generated.');
