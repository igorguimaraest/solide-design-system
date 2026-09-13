# Checkpoint — migração do Solide Design System

Atualizado em: 2026-09-13  
Branch: `codex/visual-convergence-audit`  
Base da implementação VC-02: `92c0d50 docs: propose VC-02 control tokens`

## Objetivo da etapa

Consolidar a auditoria e estabilizar o estado documental do Solide Design System. VC-02 foi decidida, implementada e teve sua direção visual aprovada. O Chromium foi disponibilizado e a suíte oficial passou no bundle real, mas a confirmação técnica final revelou uma falha de precedência no estado `active`; por isso VC-02 ainda não pode ser encerrada.

## Concluído

- Auditoria de convergência consolidada com 18 achados: 0 Blocker, 10 High, 6 Medium e 2 Low.
- Drift de tokens investigado e endurecido: `test:tokens` não depende do `dist/` ignorado; o gerador determinístico continua a produzir os artefatos distribuídos.
- ThemeToggle concluído no commit `5cf3a62`: tokens normativos, Brand Guide, UI Kit, stories, integração no Header e cobertura de semântica/troca de tema.
- Documentação de contratos da Fase B criada para ThemeToggle, Checkbox, Radio, Switch e Alert/Banner.
- VC-02 aprovada e implementada: cinco tokens semânticos próprios; Guide e DataTable migrados; Checkbox, Radio e Switch adicionados ao UI Kit com stories, preview e cobertura Playwright.
- Direção visual de VC-02 aprovada após inspeção interativa dos controles e dos estados cromáticos light/dark.
- Chromium do Playwright disponibilizado; `npm run test:ui` passou com 5/5 cenários no bundle real em 1440/light, 1440/dark, 390/light e 390/dark.

## Principais achados

- Motion: Button sem press; Tabs com timing/easing literal; drawer/modal sem transição; Sidebar com `transition-all`; hover sem guarda de cursor fino.
- Encoding: 11 stories têm texto PT-BR corrompido.
- Guide × UI Kit: o achado original de ausência de Checkbox, Radio e Switch foi remediado em VC-02; Alert/Banner continua ausente e Input ainda usa foco por mouse além de `focus-visible`.
- Geometria mobile: há contradição documental sobre a autorização do comportamento mobile.
- Tokens: a fonte canônica é `solide-tokens.css`; o problema anterior era um `dist/` local obsoleto, não geração não determinística.

## VC-02 — implementada

Checkbox `checked/indeterminate`, Radio `checked` e Switch `on` usam accent semântico de seleção por meio da família `--sld-control-selected-*`. O Brand Guide neutro foi migrado; o checkbox do DataTable não consome mais `--sld-action-primary-bg`. `selected-border` é independente de `selected-bg`, e no Switch `selected-fg` é usado somente no thumb/ícone. Os contrastes dos glifos variam de 4,78:1 a 10,06:1. A confirmação técnica encontrou uma pendência: com ponteiro fino, `group-hover` prevalece sobre `group-active`, de modo que os três controles permanecem em `--sld-control-selected-hover-bg` durante o pressionamento em vez de usar `--sld-control-selected-active-bg`.

## Arquivos relevantes já consolidados

- `solide-tokens.css`
- `packages/tokens/build/contract.js`
- `packages/tokens/build/build-tokens.js`
- `packages/tokens/build/verify-tokens.js`
- `packages/ui-kit/src/molecules/ThemeToggle/`
- `packages/ui-kit/src/organisms/Header/`
- `packages/ui-kit/src/atoms/Checkbox/`
- `packages/ui-kit/src/atoms/Radio/`
- `packages/ui-kit/src/atoms/Switch/`
- `packages/ui-kit/src/organisms/DataTable/DataTable.tsx`
- `packages/ui-kit/src/index.ts`
- `preview/main.tsx`
- `tests/system.spec.ts`
- `solide-brand-guide.html`
- `docs/audits/solide-visual-convergence-audit.md`
- `docs/contracts/missing-component-contracts.md`

## Testes executados

- `npm run build` — passou.
- `npm run typecheck` — passou.
- `npm run test:tokens` — passou após o endurecimento; a falha histórica por `Package CSS drift` foi reproduzida e atribuída ao `dist/` ignorado obsoleto.
- `npm run test:ui` — passou em 1440/390, light/dark.
- `npm run build:storybook` — passou.
- `npm run lint` — passou.
- VC-02: `npm run typecheck`, `npm run build:storybook`, `npm run lint` e `node packages/tokens/build/verify-tokens.js` passaram; o verificador cobre 92 pares de contraste e 329 referências de componentes.
- VC-02: `npm run build` e `npm run test:tokens` passaram após a implementação final.
- VC-02: após instalar/disponibilizar o Chromium e executar fora do sandbox que bloqueava `spawn`, `npm run test:ui` passou: 5/5 cenários em 1440/390 e light/dark.
- VC-02: uma checagem suplementar das stories confirmou `:active` no rótulo, mas o fundo computado permaneceu no token de hover nos três controles. A suíte oficial não possui asserção para essa precedência e, portanto, seu resultado verde não encerra tecnicamente VC-02.

## Pendências

- Corrigir a precedência `active` × `hover` em Checkbox, Radio e Switch e incorporar essa asserção à suíte oficial.
- Decidir VC-01 (ação warning).
- Corrigir motion, encoding, geometria mobile e cobertura de preview conforme a auditoria.
- Fazer comparação visual manual em 1440/light, 1440/dark, 390/light e 390/dark antes de alterações perceptivas.

## Próximo passo exato

Corrigir, dentro do escopo de VC-02, a precedência dos estados selecionados para que `--sld-control-selected-active-bg` vença `--sld-control-selected-hover-bg` durante o pressionamento de Checkbox, Radio e Switch. Adicionar cobertura oficial para `active` e os demais estados exigidos, repetir `npm run test:ui` em 1440/light, 1440/dark, 390/light e 390/dark e só então registrar a confirmação técnica final. Não iniciar VC-01 sem autorização.
