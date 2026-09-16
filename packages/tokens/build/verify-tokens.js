const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {contract,root}=require('./contract');
const c=contract();
for(const mode of ['light','dark']) for(const name of Object.keys(c.themes[mode])) c.resolve(name,mode);
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(d=>d.isDirectory()?files(path.join(dir,d.name)):[path.join(dir,d.name)]);}
let refs=0;
for(const file of files(path.join(root,'packages/ui-kit/src')).filter(f=>f.endsWith('.tsx'))){
 const source=fs.readFileSync(file,'utf8');
 for(const [,name] of source.matchAll(/var\((--[\w-]+)/g)){for(const mode of ['light','dark']) c.resolve(name,mode);refs++;}
 assert(!/--(?:solide|sld)-color-|--sld-palette-/.test(source),`Component uses primitive: ${file}`);
}
const guide=fs.readFileSync(path.join(root,'solide-brand-guide.html'),'utf8');
assert(guide.includes('href="solide-tokens.css"'));
const style=guide.match(/<style>([\s\S]*?)<\/style>/)[1];
for(const [,name] of style.matchAll(/(--[\w-]+):/g))assert(!c.themes.light[name],`Guide overrides canonical token ${name}`);
function lum(hex){assert(/^#[\da-f]{6}$/i.test(hex),`Contrast color unsupported: ${hex}`);return hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);}
function contrast(a,b){const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
const rows=[];
function check(mode,fg,bg,min){const a=c.resolve('--sld-'+fg,mode),b=c.resolve('--sld-'+bg,mode),ratio=contrast(a,b);rows.push({mode,fg,bg,a,b,ratio:Math.round(ratio*100)/100,min});assert(ratio>=min,`${mode} ${fg}/${bg}: ${ratio.toFixed(2)} < ${min}`);}
for(const mode of ['light','dark']){
 for(const bg of ['surface-canvas','surface-card','surface-raised','surface-shell']){
  for(const fg of ['text-primary','text-secondary','text-muted','text-brand']) check(mode,fg,bg,4.5);
  check(mode,'border-strong',bg,3);check(mode,'action-focusRing',bg,3);
 }
 for(const action of ['primary','warning','danger'])for(const state of ['bg','hover','active'])check(mode,`action-${action}-text`,`action-${action}-${state}`,4.5);
 for(const tone of ['success','warning','danger','info','brand','neutral']){
  check(mode,`status-${tone}-text`,`status-${tone}-bg`,4.5);
  check(mode,`status-${tone}-on-solid`,`status-${tone}-solid`,4.5);
 }
 check(mode,'selection-text','selection-bg',4.5);
 check(mode,'control-selected-fg','control-selected-bg',4.5);
 check(mode,'control-selected-fg','control-selected-hover-bg',4.5);
 check(mode,'control-selected-fg','control-selected-active-bg',4.5);
 check(mode,'theme-toggle-thumb-fg','theme-toggle-thumb-bg',3);
 if(mode==='dark') check(mode,'theme-toggle-thumb-bg','surface-shell',3);
}
const steps=Object.entries(c.fixed).filter(([k])=>k.startsWith('--sld-palette-warm-')).sort((a,b)=>Number(a[0].split('-').pop())-Number(b[0].split('-').pop()));
for(let i=1;i<steps.length;i++)assert(lum(c.resolve(steps[i-1][0],'light'))>lum(c.resolve(steps[i][0],'light')),'Warm scale luminance reversed');
fs.writeFileSync(path.join(root,'docs/consolidation/contrast.json'),JSON.stringify(rows,null,2)+'\n');
const motionTs = fs.readFileSync(path.join(root, 'packages/tokens/src/motion.ts'), 'utf8');
assert(c.fixed['--sld-button-press-scale'], 'Button press scale missing in :root');
assert(c.fixed['--sld-spring-snappy-stiffness'], 'Spring stiffness missing in :root');
assert(c.fixed['--sld-spring-snappy-damping'], 'Spring damping missing in :root');
for (const profile of ['default', 'gentle']) {
  assert(c.fixed[`--sld-spring-${profile}-stiffness`], `${profile} spring stiffness missing in :root`);
  assert(c.fixed[`--sld-spring-${profile}-damping`], `${profile} spring damping missing in :root`);
  assert(new RegExp(`stiffness:\\s*${Number(c.fixed[`--sld-spring-${profile}-stiffness`])}\\b`).test(motionTs), `motion.ts missing ${profile} stiffness`);
  assert(new RegExp(`damping:\\s*${Number(c.fixed[`--sld-spring-${profile}-damping`])}\\b`).test(motionTs), `motion.ts missing ${profile} damping`);
}

assert(new RegExp(`scale:\\s*${Number(c.fixed['--sld-button-press-scale'])}\\b`).test(motionTs), 'motion.ts out of sync with CSS scale');
assert(new RegExp(`stiffness:\\s*${Number(c.fixed['--sld-spring-snappy-stiffness'])}\\b`).test(motionTs), 'motion.ts out of sync with CSS stiffness');
assert(new RegExp(`damping:\\s*${Number(c.fixed['--sld-spring-snappy-damping'])}\\b`).test(motionTs), 'motion.ts out of sync with CSS damping');
assert(motionTs.includes("type: 'spring'"), "motion.ts missing type: 'spring'");
assert(guide.includes('var(--sld-button-press-scale)'), 'Guide does not consume --sld-button-press-scale');
console.log(`PASS: ${rows.length} actual semantic contrast pairs, ${refs} component references, aliases, luminance direction and guide/package parity. No global WCAG certification implied.`);
