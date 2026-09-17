const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const storiesRoot = path.resolve('packages/ui-kit/src');
const storyFiles = [];

function collectStories(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectStories(entryPath);
    else if (entry.name.endsWith('.stories.tsx')) storyFiles.push(entryPath);
  }
}

function findEncodingIssue(text) {
  if (text.includes('\uFFFD')) return 'caractere de substituição Unicode';
  if (/\?{2,}/.test(text)) return 'sequência de pontos de interrogação';
  if (/[\p{L}]\?[\p{L}]/u.test(text)) return 'ponto de interrogação dentro de palavra';
  if (/(?:^|[\s>"'=])\?[\p{Ll}]/u.test(text)) return 'ponto de interrogação no início de palavra';
  if (/[\p{Ll}]\?(?=\s+[\p{Ll}])/u.test(text)) return 'ponto de interrogação no fim de palavra';
  return null;
}

const failures = [];
collectStories(storiesRoot);

for (const filePath of storyFiles) {
  const source = fs.readFileSync(filePath, 'utf8');
  const file = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  function inspect(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isJsxText(node)) {
      const issue = findEncodingIssue(node.text);
      if (issue) {
        const { line, character } = file.getLineAndCharacterOfPosition(node.getStart(file));
        failures.push(`${path.relative(process.cwd(), filePath)}:${line + 1}:${character + 1} ${issue}`);
      }
    }
    ts.forEachChild(node, inspect);
  }

  inspect(file);
}

if (failures.length) {
  console.error(`Falha na validação de encoding dos stories:\n${failures.join('\n')}`);
  process.exit(1);
}

console.log(`Encoding dos stories validado em ${storyFiles.length} arquivos.`);
