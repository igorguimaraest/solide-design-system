const fs = require('node:fs');
const path = require('node:path');
const {contract,root} = require('./contract');
const c=contract();
const dist=path.join(root,'packages/tokens/dist');
fs.mkdirSync(dist,{recursive:true});
fs.writeFileSync(path.join(dist,'tokens.css'),c.css);
fs.writeFileSync(path.join(dist,'tailwind-theme.js'),"module.exports = require('../build/tailwind.preset.js');\n");
const resolved={};
for(const mode of ['light','dark']) resolved[mode]=Object.fromEntries(Object.keys(c.themes[mode]).map(k=>[k,c.resolve(k,mode)]));
fs.writeFileSync(path.join(dist,'resolved.json'),JSON.stringify(resolved,null,2)+'\n');
const token=v=>({$type:/^#|^rgba/.test(v)?'color':/^\d/.test(v)?'string':'string',$value:v});
const primitives=Object.fromEntries(Object.entries(c.fixed).map(([k,v])=>[k,token(v)]));
const semantic={theme:Object.fromEntries(['light','dark'].map(mode=>[mode,Object.fromEntries(Object.entries(c[mode]).map(([k,v])=>[k,token(v)]))]))};
for(const [name,value] of [['primitives.tokens.json',primitives],['semantic.tokens.json',semantic]]) fs.writeFileSync(path.join(root,'packages/tokens/src',name),JSON.stringify(value,null,2)+'\n');
const mobile={};
for(const mode of ['light','dark']) {
 const r=k=>c.resolve('--sld-'+k,mode);
 mobile[mode]={colors:{accent:r('brand-accent'),destructive:r('status-danger-icon'),success:r('status-success-icon'),warning:r('status-warning-icon'),caution:r('status-warning-icon')},surfaces:{primary:r('surface-card'),secondary:r('surface-shell'),elevated:r('surface-raised')},text:{primary:r('text-primary'),secondary:r('text-secondary'),tertiary:r('text-muted')},border:r('border-default'),action:{primary:r('action-primary-bg'),foreground:r('action-primary-text'),hover:r('action-primary-hover'),active:r('action-primary-active')}};
}
fs.writeFileSync(path.join(root,'packages/tokens/src/mobile-theme.ts'),`// Generated from solide-tokens.css. Do not edit. Native color contract; no mobile layout implied.\nexport const lightTheme = ${JSON.stringify(mobile.light,null,2)};\nexport const darkTheme = ${JSON.stringify(mobile.dark,null,2)};\nexport type AppTheme = typeof lightTheme;\nexport type ThemeMode = 'light' | 'dark';\nexport function getTheme(mode: ThemeMode): AppTheme { return mode === 'dark' ? darkTheme : lightTheme; }\n`);
const motion = {
  spring: {
    snappy: {
      type: 'spring',
      stiffness: Number(c.fixed['--sld-spring-snappy-stiffness']),
      damping: Number(c.fixed['--sld-spring-snappy-damping']),
    },
  },
  buttonPress: {
    scale: Number(c.fixed['--sld-button-press-scale']),
  },
};
const motionTs = `// Generated from solide-tokens.css. Do not edit.\n` +
                 `export const spring = {\n  snappy: {\n    type: 'spring',\n    stiffness: ${motion.spring.snappy.stiffness},\n    damping: ${motion.spring.snappy.damping},\n  },\n} as const;\n\n` +
                 `export const buttonPress = {\n  scale: ${motion.buttonPress.scale},\n} as const;\n`;
fs.writeFileSync(path.join(root, 'packages/tokens/src/motion.ts'), motionTs);

console.log('Canonical CSS copied; JSON, native, and motion themes derived from the same contract.');
