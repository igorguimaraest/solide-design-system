# Checkpoint — migração do Solide Design System

Atualizado em: 2026-09-13  
Branch: `codex/visual-convergence-audit`  
Base da implementação VC-02: `92c0d50 docs: propose VC-02 control tokens`  
Commit técnico final da VC-02: `ebaacc0 fix: enforce VC-02 active precedence`

## Objetivo da etapa

Consolidar a auditoria e estabilizar o estado documental do Solide Design System. VC-02 foi decidida, implementada, aprovada visualmente e tecnicamente concluída após corrigir e cobrir a precedência `disabled > active > hover > default` nos três controles.


## Concluído

- Auditoria de convergência consolidada com 18 achados históricos: 4 tecnicamente remediados (VC-01, VC-02, VC-03 e VC-18) e 14 ainda abertos, considerando a VC-04 reaberta parcialmente (achados parcialmente remediados continuam contados como abertos).
- Drift de tokens investigado e endurecido: `test:tokens` não depende do `dist/` ignorado; o gerador determinístico continua a produzir os artefatos distribuídos.
- ThemeToggle concluído no commit `5cf3a62`: tokens normativos, Brand Guide, UI Kit, stories, integração no Header e cobertura de semântica/troca de tema.
- Documentação de contratos da Fase B criada para ThemeToggle, Checkbox, Radio, Switch e Alert/Banner.
- VC-02 aprovada e implementada: cinco tokens semânticos próprios; Guide e DataTable migrados; Checkbox, Radio e Switch adicionados ao UI Kit com stories, preview e cobertura Playwright.
- Direção visual de VC-02 aprovada após inspeção interativa dos controles e dos estados cromáticos light/dark.
- Chromium do Playwright disponibilizado; `npm run test:ui` passou com 5/5 cenários no bundle real em 1440/light, 1440/dark, 390/light e 390/dark.
- Precedência de interação corrigida em Checkbox, Radio e Switch; a suíte oficial agora cobre default, hover, active simultâneo a hover, focus-visible e disabled nos quatro cenários.
- VC-01 (ação warning) implementada e validada visualmente nos cenários 1440/390 px, light e dark.
- Tema dark do ThemeToggle (VC-04) parcialmente reaberto para ajuste de contraste do thumb.

## Principais achados

- Motion: Button sem press; Tabs com timing/easing literal; drawer/modal sem transição; Sidebar com `transition-all`; hover sem guarda de cursor fino.
- Encoding: 11 stories têm texto PT-BR corrompido.
- Guide × UI Kit: o achado original de ausência de Checkbox, Radio e Switch foi remediado em VC-02; Alert/Banner continua ausente e Input ainda usa foco por mouse além de `focus-visible`.
- Geometria mobile: há contradição documental sobre a autorização do comportamento mobile.
- Tokens: a fonte canônica é `solide-tokens.css`; o problema anterior era um `dist/` local obsoleto, não geração não determinística.

## VC-02 — implementada

Checkbox `checked/indeterminate`, Radio `checked` e Switch `on` usam accent semântico de seleção por meio da família `--sld-control-selected-*`. O Brand Guide neutro foi migrado; o checkbox do DataTable não consome mais `--sld-action-primary-bg`. `selected-border` é independente de `selected-bg`, e no Switch `selected-fg` é usado somente no thumb/ícone. Os contrastes dos glifos variam de 4,78:1 a 10,06:1. A falha em que `group-hover` prevalecia sobre `group-active` foi corrigida elevando apenas a especificidade da variante active; disabled continua removendo as variantes interativas por ramificação e focus-visible permanece independente.

## VC-01 — Registro de Implementação (Ação Warning)

A ação do Alert/Banner warning foi implementada como uma ação **sólida e semanticamente independente**, restrita a `Button tone="warning"` associado com `variant="solid"`.
- Foram introduzidos os tokens `--sld-action-warning-bg/text/hover/active`.
- **Light:** default `warning-400`, hover/active `warning-500`.
- **Dark:** default `warning-500`, hover/active `warning-400`.
- **Foreground:** `warm-950` em ambos os temas.
- **Contraste Mínimo:** 6,93:1 atingido consistentemente.
- O estilo inline antigo foi removido, e `#8A4F05` deixou de ser usado como fundo da ação warning.
- Os estados transicionais (`disabled` e focus) continuam transversais, sem classes fixadas localmente. `hover` e `active` compartilham cor provisoriamente até a execução arquitetural completa da VC-09.
- A validação visual obteve aprovação em 1440/390 px, light/dark. O cenário específico da ação warning no Brand Guide passou na suíte Playwright, integrada aos cenários existentes.
- **Commit técnico aprovado:** `503122f`.
- **Nota técnica:** A VC-01 está tecnicamente concluída, mas o componente Alert/Banner reutilizável permanece alocado na etapa VC-06.

## VC-04 — Reabertura parcial (ThemeToggle)

Foi registrado que o ThemeToggle teve sua implementação funcional e semântica concluída. Contudo, sua convergência visual foi reaberta parcialmente pela insuficiência de visibilidade do *thumb* no modo dark:
- Guide: `#242220` sobre `#1D1D1F` = 1,06:1;
- UI Kit: `#242220` sobre `#121110` = 1,19:1;
- Requisito: 3:1;
- Classificação atual: contraste/affordance insuficiente no dark; permanece aberta.

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
- VC-02 final: `npm run test:ui`, `npm run test:tokens`, `npm run typecheck` e `npm run build` passaram após a correção. A suíte oficial confirma que `--sld-control-selected-active-bg` vence hover+active e que disabled permanece dominante em Checkbox, Radio e Switch, nos quatro cenários.

## Pendências

- Decidir correção do contraste dark de ThemeToggle (VC-04).
- Corrigir motion, encoding, geometria mobile e cobertura de preview conforme a auditoria.
- Fazer comparação visual manual em 1440/light, 1440/dark, 390/light e 390/dark antes de alterações perceptivas.

## Próximo passo exato

VC-01 está tecnicamente concluída no commit `503122f`. Antes de iniciar motion, VC-06 ou qualquer outra frente, decidir e corrigir a reabertura parcial da VC-04: contraste do thumb do ThemeToggle no modo dark.
