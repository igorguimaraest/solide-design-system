const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const root = path.resolve(__dirname, '../../..');
function contract() {
  const css = fs.readFileSync(path.join(root, 'solide-tokens.css'), 'utf8');
  const ast = postcss.parse(css);
  const fixed = {}, light = {}, dark = {};
  ast.walkRules(rule => {
    if (rule.parent.type === 'atrule') return;
    const target = rule.selector === ':root' ? fixed : rule.selector === ':root, [data-theme="light"]' ? light : rule.selector.includes('[data-theme="dark"],') ? dark : null;
    if (target) rule.walkDecls(/^--/, d => target[d.prop] = d.value);
  });
  const themes = { light: {...fixed,...light}, dark: {...fixed,...dark} };
  function resolve(name, mode, stack=[]) {
    if(stack.includes(name)) throw Error(`Token cycle: ${[...stack,name].join(' -> ')}`);
    const value=themes[mode][name];
    if(value===undefined) throw Error(`Undefined token ${name} (${mode})`);
    return value.replace(/var\((--[\w-]+)\)/g,(_,ref)=>resolve(ref,mode,[...stack,name]));
  }
  return {css,ast,fixed,light,dark,themes,resolve};
}
module.exports={contract,root};
