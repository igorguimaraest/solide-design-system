# Checkpoint — migração do Solide Design System

Atualizado em: 2026-09-12  
Branch: `codex/visual-convergence-audit`

## Objetivo da etapa atual

Consolidar a auditoria de convergência entre Brand Guide, contrato de tokens, UI Kit/Storybook, preview e documentação. Esta etapa é exclusivamente investigativa e documental: não altera tokens, componentes, estilos, motion, preview nem geometria.

## Estado da auditoria

A matriz normativa está em [`docs/audits/solide-visual-convergence-audit.md`](../audits/solide-visual-convergence-audit.md). Foram registrados 18 achados: 0 Blocker, 10 High, 6 Medium e 2 Low.

Principais grupos:

- Guide × UI Kit: ThemeToggle reduzido a botão de ícone; Alert/Banner ausente; checkbox do Guide neutro e checkbox do DataTable azul; Input usa `focus:` em vez de `:focus-visible`.
- Padrões ausentes: Checkbox, Radio, Switch e Alert/Banner não têm componente reutilizável completo no UI Kit. ThemeToggle foi consolidado com tokens normativos, Guide, UI Kit, stories e testes.
- Motion: Button perdeu press documentado; Tabs contém timing/easing literal; drawer/modal não transiciona; Sidebar usa `transition-all` sem easing semântico; hover não é protegido por cursor fino.
- Encoding: 11 stories têm PT-BR corrompido (`??`/`?` no lugar de acentos).
- Geometria: a documentação de App Shell afirma não autorizar mobile e, adiante, especifica o comportamento mobile.
- Integridade de tokens: a verificação de tokens independe de `dist/` ignorado; o build é o único responsável por gerar o pacote CSS; os derivados rastreados são protegidos por `test:tokens`.

## Investigação do drift de tokens

`solide-tokens.css` é a fonte canônica consumida por `packages/tokens/build/contract.js`. `build-tokens.js` gera `packages/tokens/dist/tokens.css` (ignorado), `src/primitives.tokens.json`, `src/semantic.tokens.json` e `src/mobile-theme.ts`.

A falha inicial de `npm run test:tokens` foi causada por `verify-tokens.js` comparar diretamente o `dist/tokens.css` local sem construir antes. O arquivo ignorado era antigo. Duas gerações consecutivas produziram hashes idênticos, portanto não há indício de não determinismo. Não há evidência de edição manual ou defasagem de conteúdo nos derivados rastreados; a divergência confirmada era o CSS em `dist/` ignorado. O CI mascara o problema ao executar `npm run build` antes de `npm run test:tokens`.

Classificação: `TOKEN_CONTRACT_PROBLEM`, High. A proteção inicial foi implementada: `test:tokens` gera os derivados e falha se eles não forem incluídos no commit. O endurecimento foi concluído: `verify-tokens.js` não depende de `dist/`; o build produz o pacote e `test:tokens` protege os derivados rastreados.

## Testes executados nesta etapa

- `npm run build` — passou.
- `npm run typecheck` — passou.
- `npm run test:ui` — passou em 1440/390, light/dark, após instalar Chromium localmente; capturas geradas em `docs/consolidation/screenshots/` (ignorado).
- `npm run test:tokens` antes de build — falhou com `Package CSS drift`.
- `npm run build:tokens` duas vezes — saídas idênticas para CSS, JSONs e tema nativo.
- `npm run test:tokens` após build — passou: 86 pares de contraste e 232 referências de componentes.

Os artefatos gerados durante a investigação foram restaurados; nenhuma mudança de implementação integra esta etapa.

## Contratos da Fase B`n`nA proposta de API, estados, semântica e critérios de aceite está em [`docs/contracts/missing-component-contracts.md`](../contracts/missing-component-contracts.md). Ela não autoriza implementação visual e mantém abertas as decisões VC-01 e VC-02.`n`n## Pendências

- Aprovar a matriz de 18 achados e a classificação do drift.
- Executar a comparação manual lado a lado no Work para 1440/light, 1440/dark, 390/light e 390/dark antes das correções perceptivas.
- Decidir os contratos de seleção e a estratégia visual da warning action.
- Definir a política de derivados de tokens e de verificação em checkout limpo.

## Próximo passo exato

ThemeToggle está concluído. Antes de implementar Checkbox, aprovar a decisão VC-02 sobre seleção neutra versus accent; depois especificar/implementar Checkbox, Radio, Switch e Alert/Banner em etapas separadas.