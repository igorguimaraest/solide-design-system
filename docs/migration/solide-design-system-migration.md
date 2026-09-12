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
- UI Kit: todos os 15 componentes em `packages/ui-kit/src`, stories afetados, novo story de `SegmentedTabs` e assets portáveis em `packages/ui-kit/src/assets/logos.ts`.
- Validação/documentação: `.storybook/`, `preview/`, `tests/`, `scripts/audit-system.js`, configurações de Vite, Tailwind, PostCSS e Playwright, `docs/consolidation/` e este checkpoint.
- Scripts/dependências: `package.json`, `package-lock.json`, `.gitignore`.

## Etapa atual

Implementação e validação concluídas. Preparação do commit/PR.

## Testes executados

- `npm run build`
- `npm run typecheck`
- `npm run test:tokens` — 86 pares reais de contraste e 232 referências de componentes validados.
- `npm run build:storybook`
- `npm run test:ui` — light/dark em 1440 px e 390 px; estados de Button, foco, tabs, tabela, busca, troca de tema e drawer móvel.
- Inspeção visual das capturas geradas localmente em `docs/consolidation/screenshots/` (ignoradas no Git).
- `npm run lint` e `git diff --check` fazem parte do gate final.

## Pendências

- Commitar a branch, publicar no remoto e abrir PR para revisão.
- Compatibilidade: remover aliases legados somente após inventariar e migrar consumidores externos.
- Reduzir posteriormente o peso dos SVGs oficiais embutidos no bundle do Storybook; o build informa chunks acima de 500 kB, sem falha funcional.

## Próximo passo exato

Commitar o estado validado, publicar `consolidate/solide-semantic-system` e abrir o PR para `main`. Na próxima sessão, começar lendo este checkpoint e `git status`; não repetir a auditoria integral.
