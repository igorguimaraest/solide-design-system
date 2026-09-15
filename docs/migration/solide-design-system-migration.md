# Checkpoint — migração do Solide Design System

Atualizado em: 2026-09-14  
Branch: `codex/visual-convergence-audit`  
Base da implementação VC-02: `92c0d50 docs: propose VC-02 control tokens`  
Commit técnico final da VC-02: `ebaacc0 fix: enforce VC-02 active precedence`
Commit técnico final da VC-04: `331a1cd fix: restore VC-04 dark thumb contrast`
Commit técnico final da VC-08: `08ffae1 fix: guard hover for fine pointers`
Commit técnico final da VC-09A: `0147f18 feat: formalize VC-09 button press contract`

## Objetivo da etapa

Consolidar a auditoria após a remediação técnica da VC-08, preservando as demais frentes sem autorização.


## Concluído

- Auditoria de convergência consolidada com 18 achados históricos: 6 tecnicamente remediados (VC-01, VC-02, VC-03, VC-04, VC-08 e VC-18) e 12 ainda abertos.
- Drift de tokens investigado e endurecido: `test:tokens` não depende do `dist/` ignorado; o gerador determinístico continua a produzir os artefatos distribuídos.
- ThemeToggle concluído no commit `5cf3a62`: tokens normativos, Brand Guide, UI Kit, stories, integração no Header e cobertura de semântica/troca de tema.
- Documentação de contratos da Fase B criada para ThemeToggle, Checkbox, Radio, Switch e Alert/Banner.
- VC-02 aprovada e implementada: cinco tokens semânticos próprios; Guide e DataTable migrados; Checkbox, Radio e Switch adicionados ao UI Kit com stories, preview e cobertura Playwright.
- Direção visual de VC-02 aprovada após inspeção interativa dos controles e dos estados cromáticos light/dark.
- Chromium do Playwright disponibilizado; `npm run test:ui` passou com 5/5 cenários no bundle real em 1440/light, 1440/dark, 390/light e 390/dark.
- Precedência de interação corrigida em Checkbox, Radio e Switch; a suíte oficial agora cobre default, hover, active simultâneo a hover, focus-visible e disabled nos quatro cenários.
- VC-01 (ação warning) implementada e validada visualmente nos cenários 1440/390 px, light e dark.
- Tema dark do ThemeToggle (VC-04) remediado para contraste de 17,91:1 no thumb.
- VC-08 aprovada e implementada: Button, Header, Sidebar, SearchBar, DataTable, SegmentedTabs e ModalHeader agora usam `(hover:hover) and (pointer:fine)`. Button precisou elevar somente a especificidade de active para impedir que o bloco media emitido depois pelo Tailwind prevalecesse. Cobertura fine/coarse, light/dark e resultado oficial de 14/14 confirmam o funcionamento.
- VC-09A concluída: contrato formalizado para Button press sem autorizar VC-09B, validado visualmente e com alta cobertura de testes.

## Principais achados

- Motion: Button sem press; Tabs com timing/easing literal; drawer/modal sem transição; Sidebar com `transition-all`.
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

## VC-04 — Remediada (ThemeToggle)

Foi registrado que o ThemeToggle teve sua convergência visual dark remediada.
- O modo light foi preservado utilizando `surface-card` e `text-primary`.
- O modo dark passou a utilizar os novos tokens `--sld-theme-toggle-thumb-bg/fg` mapeados para `warm-50` e `warm-950`.
- O contraste no dark foi estabilizado em 17,91:1 tanto no UI Kit quanto no contrato; Guide também supera o mínimo de 3:1.
- Testes melhorados aguardando `getAnimations().finished` para evitar leituras de cores durante a transição CSS.
- Commit técnico: `331a1cdf5515d1a9a8b5fa7ca435939b213a78cc`.
- Testes aprovados: build, typecheck, test:tokens e test:ui. Foram verificados 10/10 testes UI em 1440/390 (light/dark), 101 pares semânticos e 334 referências.

## VC-09A — Concluída (Contrato de Button Press)

A etapa VC-09A está tecnicamente concluída, com a formalização do contrato de Button press. A auditoria VC-09 permanece parcialmente aberta porque o `Button.tsx` do UI Kit ainda não implementa a física spring. A VC-09B permanece não executada e não autorizada.
- **Commit técnico final da VC-09A:** `0147f186cb2e52ce8643aac486f39e11fec65eb1`.
- **Decisões consolidadas:**
  - target scale 0.97;
  - spring.snappy com stiffness 400 e damping 28;
  - opacidade integral 0.65 rejeitada para Button por degradar contraste;
  - cores semânticas active preservadas;
  - pointer primário recebe scale e active;
  - right click é ignorado;
  - Enter/Space recebem apenas active, sem scale;
  - disabled/loading não recebem press;
  - pointer cancel/out restaura o estado;
  - reduced motion remove scale/transições e preserva active instantâneo;
  - transform não usa duration/easing CSS fixos no Guide;
  - exportação determinística por `@solide/tokens/motion`.
- **Evidências:**
  - build, typecheck, lint, build:storybook passaram;
  - test:tokens passou com 101 pares semânticos e 334 referências;
  - test:ui passou com 41/41;
  - inspeção aferida em 1440/390, light/dark;
  - Primary e Ghost cobertos;
  - Interações via mouse, touch, teclado, troca de modalidade, right click, cancelamento, disabled e reduced motion foram garantidas.

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
- VC-09A: `npm run build`, `npm run typecheck`, `npm run test:tokens` (101 pares), `npm run test:ui` (41/41 aprovados), `npm run build:storybook` e `npm run lint` passaram com sucesso consolidando as interações híbridas de pointeiro e teclado em multi-modalidade.

## Pendências

- Corrigir motion, encoding, geometria mobile e cobertura de preview conforme a auditoria.
- Fazer comparação visual manual em 1440/light, 1440/dark, 390/light e 390/dark antes de alterações perceptivas.

## Próximo passo exato

A próxima frente exige autorização expressa. Nenhuma implementação adicional está autorizada nesta consolidação.
