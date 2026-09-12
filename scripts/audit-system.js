const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process');
const tracked=cp.execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(f=>f&&fs.existsSync(f));
const report={files:[],components:[],guide:{},icons:0};
for(const f of tracked){const b=fs.readFileSync(f);if(f.startsWith('icons/'))report.icons++;
 const s=b.toString();report.files.push({path:f,bytes:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex'),colorLiterals:(s.match(/#[\da-fA-F]{3,8}\b|rgba?\(/g)||[]).length});
 if(f.endsWith('.tsx')&&!/stories/.test(f))report.components.push({path:f,tokens:[...new Set([...s.matchAll(/var\((--[\w-]+)/g)].map(m=>m[1]))],hardcodedColors:(s.match(/#[\da-fA-F]{3,8}\b|rgba?\(/g)||[]).length,arbitraryDimensions:[...new Set(s.match(/\[\d+(?:\.\d+)?px\]/g)||[])]});
}
const html=fs.readFileSync('solide-brand-guide.html','utf8');report.guide.screens=[...html.matchAll(/class="doc-screen[^"\n]*" id="([^"]+)"/g)].map(m=>m[1]);report.guide.componentIds=[...html.matchAll(/id="(comp-[^"]+)"/g)].map(m=>m[1]);
report.guide.remainingColorLiterals=[...new Set(html.match(/#[\da-fA-F]{3,8}\b/g)||[])];
fs.writeFileSync('docs/consolidation/audit.json',JSON.stringify(report,null,2)+'\n');
if(process.argv.includes('--check')){
 require('../packages/tokens/build/verify-tokens');
 for(const f of ['solide-tailwind.config.js','packages/tokens/build/tailwind.preset.js','packages/tokens/build/tailwind.colors.js'])require(path.resolve(f));
 for(const c of report.components)if(c.hardcodedColors)throw Error('Hardcoded component color '+c.path);
}
console.log(`Audited ${report.files.length} tracked files, ${report.components.length} components, ${report.icons} icon assets; residual guide examples recorded.`);
