# Páginas individuais dos componentes

`catalog.js` gera 29 páginas com endereços `#componente-<nome>` e um catálogo
`#componentes` dentro de `solide-brand-guide.html`. O conteúdo inclui orientação
de uso, o que evitar, estados, acessibilidade, tokens e exemplos HTML.

O guia importa `catalog.css` e `catalog.js` diretamente, inclusive ao abrir o HTML
local. Os componentes existentes do UI Kit não foram modificados. Os exemplos
da vitrine demonstram a apresentação; o contrato React fica em
`packages/ui-kit/src/**/<Componente>.types.ts` e os cenários em `*.stories.tsx`.
Os laboratórios do guia permanecem como referência das variantes completas.
Drawer, command palette, header, sidebar e cabeçalho de modal remetem aos
laboratórios existentes para seus exemplos em contexto.

## Manutenção

- Adicionar ou ajustar o conteúdo na lista `entries` de `catalog.js`.
- Usar tokens existentes de `solide-tokens.css`.
- Manter IDs únicos e links dos laboratórios válidos.
- Abas operam por clique e setas; exemplos incluem estados de erro de busca e período.
- Não inserir páginas depois do rodapé nem dentro de outro `doc-screen`.
- Os exemplos são demonstrativos e não gravam dados.

## Verificação

`tests/guide-navigation.spec.ts` percorre as 29 páginas em 1440 e 390 pixels,
claro e escuro, confere conteúdo, tokens, links, histórico e rolagem horizontal.
Também verifica seleção, teclado, erro de busca, intervalo inválido e fechamento
de modal com retorno de foco. Capturas ficam em `docs/audits/componentes/`.
