# Checkpoint — migração do Solide Design System

Atualizado em: 2026-09-12  
Branch: `consolidate/solide-semantic-system`

## Objetivo

Consolidar Brand Guide, tokens, pacote `@solide/tokens`, UI Kit, Storybook e temas light/dark como um único sistema, usando a direção cromática v3.2 de forma crítica e preservando os subsistemas maduros existentes.

## Decisões tomadas

- `solide-tokens.css` é o contrato canônico. Build gera cópia do pacote, JSONs resolvidos e tema nativo a partir dele.
- Neutros novos vivem em `--sld-palette-warm-*`, crescente do claro para o escuro. Tokens neutros legados mantêm sua convenção histórica.
- Brand Accent e Primary Action são papéis separados.
- Componentes dependem de tokens semânticos; primitives ficam restritas à camada de tokens.
- Status têm tokens para `bg`, `border`, `text`, `icon`, `solid`, `on-solid` e `hover`.
- Tipografia por papéis, spacing, radius, shadows, motion, iconografia e geometria desktop foram preservados.
- A lacuna mobile do App Shell foi resolvida e documentada: drawer modal abaixo de 1024 px, Escape e restauração de foco, padding de 16 px e overflow horizontal de tabela.
- Aliases legados permanecem temporariamente; a matriz e o critério de remoção estão em `docs/consolidation/README.md`.
- A validação de contraste cobre pares declarados. Não há afirmação de conformidade WCAG global.

## Arquivos alterados

- Fonte normativa e contrato: `solide-brand-guide.html`, `solide-tokens.css`, `solide-tailwind.config.js`.
- Tokens: `packages/tokens/build/{contract,build-tokens,verify-tokens,tailwind.preset,tailwind.colors}.js`, arquivos gerados em `packages/tokens/src/` e remoção das fontes JSON concorrentes antigas.
- UI Kit: os 15 componentes em `packages/ui-kit/src` foram auditados; os 13 que necessitavam de mudança foram migrados. `Icon` já era compatível por usar `currentColor`, sem cor fixa, e `FormField` já consumia aliases semânticos suportados pelo contrato. Também foram ajustados os stories afetados, criado o story de `SegmentedTabs` e adicionados assets portáveis em `packages/ui-kit/src/assets/logos.ts`.
- Validação/documentação: `.storybook/`, `preview/`, `tests/`, `scripts/audit-system.js`, configurações de Vite, Tailwind, PostCSS e Playwright, `docs/consolidation/` e este checkpoint.
- Scripts/dependências: `package.json`, `package-lock.json`, `.gitignore`.

## Etapa atual

Implementação concluída. Branch publicada e PR [#1](https://github.com/igorguimaraest/solide-design-system/pull/1) aberto contra `main`. O workflow `.github/workflows/ci.yml` valida pull requests com instalação reproduzível, build, typecheck, tokens, auditoria, Storybook e testes de UI em Chromium.

## Testes executados

- `npm run build`
- `npm run typecheck`
- `npm run test:tokens` — 86 pares reais de contraste e 232 referências de componentes validados.
- `npm run build:storybook`
- `npm run test:ui` — light/dark em 1440 px e 390 px; estados de Button, foco, tabs, tabela, busca, troca de tema e drawer móvel.
- Inspeção visual das capturas geradas localmente em `docs/consolidation/screenshots/` (ignoradas no Git).
- `npm run lint` — 2.191 arquivos rastreados, 15 componentes do UI Kit, 2 arquivos TSX de configuração/preview e 2.066 ícones auditados.
- `git diff --check`

O workflow de CI repete essas validações em `ubuntu-latest`, com Node.js 22 e Chromium instalado pelo Playwright. Nesta etapa, `npm ci`, build, typecheck, tokens, lint e Storybook passaram localmente. A reinstalação local do Chromium foi bloqueada pelo proxy do ambiente; o teste de UI já havia passado com o navegador disponível na validação anterior e será repetido no runner pela instalação oficial do Playwright.

## Pendências

- Aguardar e revisar os checks do PR #1 antes do merge em `main`.
- Compatibilidade: remover aliases legados somente após inventariar e migrar consumidores externos.
- Reduzir posteriormente o peso dos SVGs oficiais embutidos no bundle do Storybook; o build informa chunks acima de 500 kB, sem falha funcional.

## Próximo passo exato

Revisar os checks do PR #1 e, se todos estiverem aprovados, fazer merge em main.
