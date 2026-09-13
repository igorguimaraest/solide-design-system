# Checkpoint — migração do Solide Design System

Atualizado em: 2026-09-12  
Branch: `codex/visual-convergence-audit`

## Objetivo da etapa atual

Consolidar a auditoria de convergência entre Brand Guide, contrato de tokens, UI Kit/Storybook, preview e documentação. Esta etapa é exclusivamente investigativa e documental: não altera tokens, componentes, estilos, motion, preview nem geometria.

## Estado da auditoria

A matriz normativa está em [`docs/audits/solide-visual-convergence-audit.md`](../audits/solide-visual-convergence-audit.md). Foram registrados 18 achados: 0 Blocker, 10 High, 6 Medium e 2 Low.

Principais grupos:

- Guide × UI Kit: ThemeToggle reduzido a botão de ícone; Alert/Banner ausente; checkbox do Guide neutro e checkbox do DataTable azul; Input usa `focus:` em vez de `:focus-visible`.
- Padrões ausentes: Checkbox, Radio, Switch, Alert/Banner e ThemeToggle não têm contrato/componente reutilizável completo no UI Kit.
- Motion: Button perdeu press documentado; Tabs contém timing/easing literal; drawer/modal não transiciona; Sidebar usa `transition-all` sem easing semântico; hover não é protegido por cursor fino.
- Encoding: 11 stories têm PT-BR corrompido (`??`/`?` no lugar de acentos).
- Geometria: a documentação de App Shell afirma não autorizar mobile e, adiante, especifica o comportamento mobile.
- Integridade de tokens: o teste isolado depende de um `dist/tokens.css` ignorado e obsoleto; três derivados rastreados não correspondem ao gerador atual.

## Investigação do drift de tokens

`solide-tokens.css` é a fonte canônica consumida por `packages/tokens/build/contract.js`. `build-tokens.js` gera `packages/tokens/dist/tokens.css` (ignorado), `src/primitives.tokens.json`, `src/semantic.tokens.json` e `src/mobile-theme.ts`.

A falha inicial de `npm run test:tokens` foi causada por `verify-tokens.js` comparar diretamente o `dist/tokens.css` local sem construir antes. O arquivo ignorado era antigo. Duas gerações consecutivas produziram hashes idênticos, portanto não há indício de não determinismo. O histórico não prova edição manual dos derivados rastreados; ele prova que seu conteúdo commitado está defasado do gerador atual. O CI mascara o problema ao executar `npm run build` antes de `npm run test:tokens`.

Classificação: `TOKEN_CONTRACT_PROBLEM`, High. A correção da estratégia de geração/verificação é o primeiro trabalho de implementação da próxima sessão.

## Testes executados nesta etapa

- `npm run build` — passou.
- `npm run typecheck` — passou.
- `npm run test:ui` — passou em 1440/390, light/dark, após instalar Chromium localmente; capturas geradas em `docs/consolidation/screenshots/` (ignorado).
- `npm run test:tokens` antes de build — falhou com `Package CSS drift`.
- `npm run build:tokens` duas vezes — saídas idênticas para CSS, JSONs e tema nativo.
- `npm run test:tokens` após build — passou: 86 pares de contraste e 232 referências de componentes.

Os artefatos gerados durante a investigação foram restaurados; nenhuma mudança de implementação integra esta etapa.

## Pendências

- Aprovar a matriz de 18 achados e a classificação do drift.
- Executar a comparação manual lado a lado no Work para 1440/light, 1440/dark, 390/light e 390/dark antes das correções perceptivas.
- Decidir os contratos de seleção e a estratégia visual da warning action.
- Definir a política de derivados de tokens e de verificação em checkout limpo.

## Próximo passo exato

Abrir a Fase A de correção: tornar o pipeline de tokens determinístico e verificável em checkout limpo, começando pela decisão de como `verify-tokens.js` obtém o CSS gerado e como os derivados rastreados são validados. Não iniciar componentes ou correções visuais antes disso.