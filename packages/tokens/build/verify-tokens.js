const fs = require('fs');
const path = require('path');

console.log('===============================================================');
console.log('   SOLIDE UNIFIED BRANDING, TOKENS & UI KIT VERIFICATION       ');
console.log('===============================================================\n');

let failed = false;

// 1. Load Token Files
const primitivesFile = path.resolve(__dirname, '../src/primitives.tokens.json');
const semanticFile = path.resolve(__dirname, '../src/semantic.tokens.json');
const presetFile = path.resolve(__dirname, 'tailwind.preset.js');
const guideFile = path.resolve(__dirname, '../../../solide-brand-guide.html');
const canonicalCssFile = path.resolve(__dirname, '../../../solide-tokens.css');
const distCssFile = path.resolve(__dirname, '../dist/tokens.css');

if (!fs.existsSync(primitivesFile) || !fs.existsSync(semanticFile) || !fs.existsSync(presetFile)) {
  console.error('ERRO: Arquivos obrigatórios não encontrados.');
  process.exit(1);
}

const primitivesRaw = fs.readFileSync(primitivesFile, 'utf8');
const semanticRaw = fs.readFileSync(semanticFile, 'utf8');
const primitives = JSON.parse(primitivesRaw);
const semantic = JSON.parse(semanticRaw);
const preset = require(presetFile);

console.log('--- TESTE 0: Contrato canônico do Brand Guide ---');
if (!fs.existsSync(guideFile) || !fs.existsSync(canonicalCssFile) || !fs.existsSync(distCssFile)) {
  console.error('  FALHA: Brand guide, CSS canônico ou saída do pacote não encontrado.');
  failed = true;
} else {
  const guideHtml = fs.readFileSync(guideFile, 'utf8');
  const canonicalCss = fs.readFileSync(canonicalCssFile, 'utf8');
  const distCss = fs.readFileSync(distCssFile, 'utf8');
  if (!guideHtml.includes('href="solide-tokens.css"')) {
    console.error('  FALHA: O brand guide não carrega solide-tokens.css.');
    failed = true;
  } else if (canonicalCss !== distCss) {
    console.error('  FALHA: @solide/tokens diverge do CSS carregado pelo brand guide.');
    failed = true;
  } else {
    console.log('  APROVADO: guia e pacote publicam o mesmo contrato CSS.');
  }
}

// Helper for relative luminance & WCAG contrast
function hexToRgb(hex) {
  const num = parseInt(hex.replace('#', ''), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function relLum([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const l1 = relLum(hexToRgb(hex1));
  const l2 = relLum(hexToRgb(hex2));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function resolveAlias(alias, root) {
  if (typeof alias !== 'string') return alias;
  const match = alias.match(/^\{([^}]+)\}$/);
  if (!match) return alias;
  const parts = match[1].split('.');
  let curr = root;
  for (const p of parts) {
    if (curr && curr[p] !== undefined) {
      curr = curr[p];
    } else {
      return alias;
    }
  }
  return curr && curr['$value'] !== undefined ? curr['$value'] : curr;
}

// TEST 1: W3C DTCG Format Compliance ($type and $value)
console.log('--- TESTE 1: Conformidade com W3C DTCG ($type e $value) ---');
function checkW3CLeaves(obj, path = '') {
  let valid = true;
  for (const [key, val] of Object.entries(obj)) {
    const currPath = path ? `${path}.${key}` : key;
    if (val && typeof val === 'object') {
      if (val['$value'] !== undefined) {
        if (!val['$type']) {
          console.error(`  FALHA: Nó '${currPath}' tem $value mas carece de $type`);
          valid = false;
        }
      } else {
        if (!checkW3CLeaves(val, currPath)) valid = false;
      }
    }
  }
  return valid;
}

const w3cPrimitivesOk = checkW3CLeaves(primitives);
const w3cSemanticOk = checkW3CLeaves(semantic);
if (w3cPrimitivesOk && w3cSemanticOk) {
  console.log('  APROVADO: 100% dos nós folha possuem $type e $value conforme W3C.');
} else {
  console.error('  FALHA: Violação na estrutura W3C.');
  failed = true;
}

// TEST 2: Zero Literal Hex in semantic.tokens.json
console.log('\n--- TESTE 2: Ausência de Hexadecimais em semantic.tokens.json ---');
const hexMatches = semanticRaw.match(/#[0-9a-fA-F]{3,8}/g);
if (!hexMatches || hexMatches.length === 0) {
  console.log('  APROVADO: Zero códigos hexadecimais em semantic.tokens.json (apenas aliases).');
} else {
  console.error(`  FALHA: Encontrados ${hexMatches.length} valores hexadecimais em semantic.tokens.json:`, hexMatches);
  failed = true;
}

// TESTE 3: alias público do UI Kit deve existir no contrato do guia.
console.log('\n--- TESTE 3: Aliases públicos do UI Kit ---');
const canonicalCss = fs.readFileSync(canonicalCssFile, 'utf8');
const requiredAliases = [
  '--solide-bg-canvas:', '--solide-bg-surface:', '--solide-bg-surface-elevated:',
  '--solide-border-subtle:', '--solide-text-primary:', '--solide-text-secondary:',
  '--solide-ring-focus:', '--solide-feedback-success:', '--solide-feedback-error:'
];
const aliasesOk = requiredAliases.every(alias => canonicalCss.includes(alias));
if (aliasesOk) {
  console.log('  APROVADO: todos os aliases usados pelo UI Kit apontam para o contrato do guia.');
} else {
  console.error('  FALHA: faltam aliases públicos necessários ao UI Kit.');
  failed = true;
}

// TESTE 4: valores de marca mostrados pelo guia não podem ser substituídos.
console.log('\n--- TESTE 4: Paleta funcional do Brand Guide ---');
const requiredGuideValues = ['#0040dd', '#34C759', '#FF3B30', '#FF9500', '#0F5FE8', '#30D158', '#FF453A', '#FF9F0A'];
const guideValuesOk = requiredGuideValues.every(value => canonicalCss.includes(value));
if (guideValuesOk) {
  console.log('  APROVADO: acento e cores funcionais correspondem ao Brand Guide.');
} else {
  console.error('  FALHA: a paleta funcional do CSS canônico está incompleta.');
  failed = true;
}

// TEST 5: Matriz de Contraste WCAG 2.2 AA (Mínimo 4.5:1 para texto normal)
console.log('\n--- TESTE 5: Acessibilidade WCAG 2.2 Nível AA ---');
const lightCanvas = '#FFFFFF';
const lightPrimary = '#000000';
const lightSecondary = '#6A6A70';
const darkCanvas = '#000000';
const darkPrimary = '#FFFFFF';
const darkSecondary = '#8E8E93';

const cLightPrim = contrastRatio(lightPrimary, lightCanvas);
const cLightSec = contrastRatio(lightSecondary, lightCanvas);
const cDarkPrim = contrastRatio(darkPrimary, darkCanvas);
const cDarkSec = contrastRatio(darkSecondary, darkCanvas);

console.log(`  Light Mode text-primary (${lightPrimary}) vs canvas (${lightCanvas}): ${cLightPrim.toFixed(2)}:1`);
console.log(`  Light Mode text-secondary (${lightSecondary}) vs canvas (${lightCanvas}): ${cLightSec.toFixed(2)}:1`);
console.log(`  Dark Mode text-primary (${darkPrimary}) vs canvas (${darkCanvas}): ${cDarkPrim.toFixed(2)}:1`);
console.log(`  Dark Mode text-secondary (${darkSecondary}) vs canvas (${darkCanvas}): ${cDarkSec.toFixed(2)}:1`);

if (cLightPrim >= 4.5 && cLightSec >= 4.5 && cDarkPrim >= 4.5 && cDarkSec >= 4.5) {
  console.log('  APROVADO: Todas as combinações primárias e secundárias superam WCAG 2.2 AA (>= 4.5:1).');
} else {
  console.error('  FALHA: Uma ou mais combinações não atingiram o limiar WCAG 2.2 AA.');
  failed = true;
}

// TEST 6: Tailwind Preset e Mapeamento de Classes Funcionais
console.log('\n--- TESTE 6: Tailwind Preset e Mapeamento de Classes ---');
const expectedClasses = [
  { name: 'bg-solide-canvas', exists: preset.theme.extend.backgroundColor['solide-canvas'] },
  { name: 'bg-solide-surface', exists: preset.theme.extend.backgroundColor['solide-surface'] },
  { name: 'bg-solide-elevated', exists: preset.theme.extend.backgroundColor['solide-elevated'] },
  { name: 'text-solide-primary', exists: preset.theme.extend.textColor['solide-primary'] },
  { name: 'text-solide-secondary', exists: preset.theme.extend.textColor['solide-secondary'] },
  { name: 'text-solide-muted', exists: preset.theme.extend.textColor['solide-muted'] },
  { name: 'border-solide-subtle', exists: preset.theme.extend.borderColor['solide-subtle'] },
  { name: 'border-solide-strong', exists: preset.theme.extend.borderColor['solide-strong'] },
  { name: 'ring-solide-focus', exists: preset.theme.extend.ringColor['solide-focus'] },
  { name: 'text-solide-error', exists: preset.theme.extend.textColor['solide-error'] },
  { name: 'bg-solide-success', exists: preset.theme.extend.backgroundColor['solide-success'] }
];

let presetOk = true;
for (const item of expectedClasses) {
  if (!item.exists) {
    console.error(`  FALHA: Utilitário '${item.name}' não mapeado no preset.`);
    presetOk = false;
  }
}
if (presetOk) {
  console.log('  APROVADO: Todos os utilitários de superfícies, texto, bordas, foco e feedback funcional mapeados.');
} else {
  failed = true;
}

console.log('\n===============================================================');
if (failed) {
  console.error('RESULTADO FINAL: FALHA EM UMA OU MAIS VERIFICAÇÕES.');
  process.exit(1);
} else {
  console.log('RESULTADO FINAL: TODAS AS VERIFICAÇÕES PASSARAM COM SUCESSO (100% OK).');
  process.exit(0);
}
