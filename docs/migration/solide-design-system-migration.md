# Checkpoint — migração do Solide Design System

Atualizado em: 2026-09-13  
Branch: `codex/visual-convergence-audit`  
Último commit antes deste checkpoint: `5cf3a62 feat: add normative theme toggle`

## Objetivo da etapa

Consolidar a auditoria e estabilizar o estado documental do Solide Design System. VC-02 foi decidida; nenhuma implementação deve começar antes da especificação do contrato semântico correspondente.

## Concluído

- Auditoria de convergência consolidada com 18 achados: 0 Blocker, 10 High, 6 Medium e 2 Low.
- Drift de tokens investigado e endurecido: `test:tokens` não depende do `dist/` ignorado; o gerador determinístico continua a produzir os artefatos distribuídos.
- ThemeToggle concluído no commit `5cf3a62`: tokens normativos, Brand Guide, UI Kit, stories, integração no Header e cobertura de semântica/troca de tema.
- Documentação de contratos da Fase B criada para ThemeToggle, Checkbox, Radio, Switch e Alert/Banner.

## Principais achados

- Motion: Button sem press; Tabs com timing/easing literal; drawer/modal sem transição; Sidebar com `transition-all`; hover sem guarda de cursor fino.
- Encoding: 11 stories têm texto PT-BR corrompido.
- Guide × UI Kit: Alert/Banner e os primitivos reutilizáveis de Checkbox, Radio e Switch estão ausentes; Input usa foco por mouse além de `focus-visible`.
- Geometria mobile: há contradição documental sobre a autorização do comportamento mobile.
- Tokens: a fonte canônica é `solide-tokens.css`; o problema anterior era um `dist/` local obsoleto, não geração não determinística.

## VC-02 — decisão registrada

Checkbox `checked/indeterminate`, Radio `checked` e Switch `on` usarão accent semântico de seleção. O Brand Guide neutro é considerado legado; o checkbox azul do DataTable tem a direção visual correta, mas o acoplamento a `--sld-action-primary-bg` é semanticamente incorreto. A implementação futura deverá introduzir um par próprio de tokens para background/border/foreground de controle selecionado em light e dark e migrar Guide e UI Kit juntos. Nenhuma alteração de token ou componente foi feita nesta decisão.

## Arquivos relevantes já consolidados

- `solide-tokens.css`
- `packages/tokens/build/contract.js`
- `packages/tokens/build/build-tokens.js`
- `packages/tokens/build/verify-tokens.js`
- `packages/ui-kit/src/molecules/ThemeToggle/`
- `packages/ui-kit/src/organisms/Header/`
- `docs/audits/solide-visual-convergence-audit.md`
- `docs/contracts/missing-component-contracts.md`

## Testes executados

- `npm run build` — passou.
- `npm run typecheck` — passou.
- `npm run test:tokens` — passou após o endurecimento; a falha histórica por `Package CSS drift` foi reproduzida e atribuída ao `dist/` ignorado obsoleto.
- `npm run test:ui` — passou em 1440/390, light/dark.
- `npm run build:storybook` — passou.
- `npm run lint` — passou.

## Pendências

- Especificar e validar o contrato de tokens de VC-02 antes de alterar checkbox/radio/switch.
- Decidir VC-01 (ação warning).
- Corrigir motion, encoding, geometria mobile e cobertura de preview conforme a auditoria.
- Fazer comparação visual manual em 1440/light, 1440/dark, 390/light e 390/dark antes de alterações perceptivas.

## Próximo passo exato

Especificar, sem ainda implementar, os nomes e mapeamentos light/dark dos tokens próprios de controle selecionado de VC-02; depois submeter esse contrato à validação antes de alterar Brand Guide, DataTable ou criar Checkbox/Radio/Switch.
