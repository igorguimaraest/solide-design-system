# Auditoria de convergência visual — Solide

Data: 2026-09-17
Escopo: branch `codex/visual-convergence-audit`, estado consolidado até a validação da VC-14.

## Método e cobertura

- Leitura cruzada do Brand Guide, tokens, UI Kit/Storybook, preview e geometria.
- Varredura de estados, tokens, CSS legado e encoding.
- Playwright passou em 1440 px e 390 px, light e dark; capturou preview/guia em `docs/consolidation/screenshots/` (ignorado pelo Git).
- O navegador integrado do Work e a leitura manual das imagens falharam no helper de sandbox; conclusões perceptivas marcadas **a confirmar visualmente** exigem revisão lado a lado antes da correção.

## Resumo

| Total | Blocker | High | Medium | Low |
| ---: | ---: | ---: | ---: | ---: |
| 18 | 0 | 10 | 6 | 2 |

Maior concentração: estados/motion (6), controles de seleção (3), documentação/cobertura (3) e encoding (1 regressão em 11 arquivos).

## Matriz

| ID | Componente/padrão | Guide | UI Kit/preview | Token/contrato | Classificação | Sev. | Problema | Recomendação | Arquivos |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VC-01 | Warning action | Contrato `--sld-action-warning-*` implementado; Brand Guide migrado. | Button warning sólido implementado; contraste aprovado. | `--sld-action-warning-*` criados e vinculados. | IMPLEMENTATION_CORRECT | High | peso visual histórico | Status tecnicamente remediado; Alert/Banner reutilizável permanece na VC-06. | guide, Button, tokens |
| VC-02 | Checkbox/radio/switch selecionado | Controles migrados para accent semântico de seleção. | Checkbox, Radio e Switch implementados e exportados; DataTable compõe Checkbox; stories, preview e testes cobrem os estados. | Família própria `--sld-control-selected-*`, sem dependência de `action-primary`. | REMEDIATED | High | semântica/inconsistência | Tecnicamente remediada. | guide, tokens, DataTable, UI Kit |
| VC-03 | Checkbox/radio/switch | Estados checked, unchecked, indeterminate/on/off e disabled demonstrados. | Checkbox, Radio e Switch reutilizáveis implementados, exportados e cobertos. | APIs e estados documentados em `missing-component-contracts.md`. | REMEDIATED | High | affordance | Tecnicamente remediada. | UI Kit, stories |
| VC-04 | Theme toggle | Contraste dark > 3:1 garantido; light preservado. | Implementação funcional e visual concluída. Contraste dark remediado (17,91:1) com `--sld-theme-toggle-thumb-bg/fg`. | Requisito: 3:1 mínimo. | REMEDIATED | High | contraste/affordance no dark | Tecnicamente remediada. | ThemeToggle, guide, tokens |
| VC-05 | Ghost button | Transparente em repouso; fundo só em hover/active. | Mesma estratégia; foco, disabled, touch/coarse e reduced motion cobertos. | `--sld-action-ghost-*`. | REMEDIATED | Medium | affordance | Validado em contexto, light/dark e 1440/390 px; não introduzir borda fora do padrão normativo. | Button, guide |
| VC-06 | Alertas/banners | Quatro variantes e ação warning demonstradas. | `Alert` reutilizável, stories e preview implementados; ação e descarte cobertos. | `--sld-status-*-{bg,border,text}`. | REMEDIATED | High | hierarquia | Validado em 1440/390 px, light/dark, com semântica contextual e foco de teclado. | Alert, Button, Icon, preview |
| VC-07 | Input/FormField | Foco `:focus-visible` global. | Input e FormField preservam foco somente por `:focus-visible`; erro, disabled e fluxo de teclado cobertos. | `--sld-action-focusRing`. | REMEDIATED | Medium | foco | Tecnicamente remediada. | Input, FormField, preview |
| VC-08 | Hover em touch | Guard `(hover:hover) and (pointer:fine)`. | Guard aplicado via Tailwind; estados de active, disabled e focus-visible preservados. | Extensão WEB. | REMEDIATED | High | comportamento | Tecnicamente remediada. | componentes/preview CSS |
| VC-09 | Press de Button | VC-09A/B concluídas. | `<button>` nativo com física spring imperativa via Framer Motion. | `--sld-button-press-scale`, `--sld-spring-snappy-stiffness`, `--sld-spring-snappy-damping`, `@solide/tokens/motion` | REMEDIATED | High | feedback | Tecnicamente remediada. | Button, guide |
| VC-10 | SegmentedTabs motion | Motion usa tokens. | Transição limitada a `background-color`, `color` e `box-shadow`, com duração e curva semânticas. | `--sld-durationFast`, `--sld-easingSnappy`. | REMEDIATED | High | consistência | Tecnicamente remediada. | SegmentedTabs |
| VC-11 | Drawer/modal motion | Guia/geometria pedem drawer e motion. | Wrapper `Modal` compõe `<dialog>`, `ModalHeader` e DashboardLayout com entrada/saída, foco e reduced motion. | `spring.default`, `spring.gentle`, `@solide/tokens/motion`. | REMEDIATED | High | feedback | Tecnicamente remediada. | DashboardLayout, Modal |
| VC-12 | Sidebar motion | Geometria exige durationBase + easingSnappy. | Transição limitada à largura, com duração/curva semânticas e reduced motion. | `--sld-durationBase`, `--sld-easingSnappy`. | REMEDIATED | Medium | ruído/comportamento | Tecnicamente remediada. | Sidebar |
| VC-13 | DataTable/paginação | Seleção neutra, hover guardado e controles coerentes. | Paginação usa tokens semânticos de disabled; hover é limitado a controles habilitados. | `--sld-disabled-{bg,fg}`, `--sld-border-subtle`. | REMEDIATED | Medium | contraste/affordance | Tecnicamente remediada; cobertura em 1440/390 px, claro/escuro. | DataTable, preview, testes |
| VC-14 | Encoding PT-BR | Trechos auditados legíveis. | 12 stories corrigidos para UTF-8; checagem estática cobre os 21 stories. | `npm run test:encoding`, integrado ao lint. | REMEDIATED | High | conteúdo | Tecnicamente remediada. | stories, check-story-encoding |
| VC-15 | Preview integrado | Guide cobre alertas, seleção, navegação, cards e estados. | Preview não cobre Alert, checkbox/radio/switch, Sidebar compacta nem estados completos. | aceitação. | DOCUMENTATION_GAP | Medium | cobertura | Expandir após decidir componentes faltantes. | preview, testes |
| VC-16 | Geometria mobile | Documento especifica drawer/16 px/overflow abaixo de 1024. | O próprio escopo diz não autorizar variante mobile. | geometria normativa. | DOCUMENTATION_GAP | Medium | comportamento | Corrigir redação normativa. | geometry, DESIGN_SYSTEM |
| VC-17 | Valores legados | CSS do guia ainda tem valores avulsos/inline. | UI Kit também tem medidas em utilitários; não há inventário de exceções. | contrato de tokens. | BOTH_NEED_REVIEW | Low | consistência | Inventariar antes de limpeza mecânica. | guide, UI Kit, tokens |

## Motion

Guide/contrato e UI Kit Button concluídos em VC-09A/B. SegmentedTabs, Modal/drawer e Sidebar foram remediados nas VC-10 a VC-12.

## Encoding

As 12 stories com conteúdo corrompido — `Button`, `Badge`, `Input`, `Typography`, `FormField`, `SearchBar`, `ModalHeader`, `DataTable`, `EmptyState`, `Sidebar`, `AuthLayout` e `DashboardLayout` — foram restauradas para UTF-8. `scripts/check-story-encoding.js` analisa os 21 stories e bloqueia caracteres de substituição e padrões de fallback antes de regressões chegarem ao Storybook.

## Ordem de correção após autorização

1. Definir contratos de seleção, Alert/Banner e ThemeToggle.
2. Validar visualmente VC-01 e o contrato accent aprovado em VC-02 nos dois temas.
3. Corrigir motion/estados com tokens (VC-08 a VC-12 remediadas).
4. Completar componentes e cobertura (VC-03, VC-06, VC-15).
5. Corrigir encoding/documentação (VC-14, VC-16).
6. Inventariar legado (VC-17).

## Próximo passo obrigatório

A VC-14 foi tecnicamente remediada. A próxima frente é a VC-15 (preview integrado), isolada até validação e commit.

## VC-18 — Drift de distribuição de tokens

| Campo | Registro |
| --- | --- |
| Descrição | `npm run test:tokens`, em um checkout limpo que ainda contém `packages/tokens/dist/tokens.css` local, falha com `Package CSS drift`. |
| Causa identificada | O verificador lê diretamente `packages/tokens/dist/tokens.css`, mas esse diretório é ignorado pelo Git e `test:tokens` não executa o gerador antes de comparar. O `dist/tokens.css` local era um artefato de geração anterior e não correspondia a `solide-tokens.css`. |
| Fonte canônica | `solide-tokens.css`, lido por `packages/tokens/build/contract.js`. |
| Artefatos desatualizados | O build reescreve `packages/tokens/dist/tokens.css` (ignorado), `packages/tokens/src/primitives.tokens.json`, `packages/tokens/src/semantic.tokens.json` e `packages/tokens/src/mobile-theme.ts`. Na investigação, os três últimos não apresentaram diferença de conteúdo em relação ao HEAD após a normalização de fim de linha; eles permanecem incluídos na proteção preventiva. |
| Determinismo | Duas execuções consecutivas de `npm run build:tokens` produziram hashes idênticos para os quatro artefatos. Não há evidência de geração não determinística. |
| Build/manual | A causa operacional imediata é a ausência de build antes do teste local. Não há evidência de edição manual dos derivados rastreados nem de conteúdo commitado defasado; a divergência confirmada é exclusivamente o CSS em `dist/` ignorado. |
| Pipeline | `.github/workflows/ci.yml` executa `npm run build` antes de `npm run test:tokens`, mascarando o drift no checkout: o build o regenera antes da asserção. O comando isolado continua vulnerável a falha por `dist` ausente/obsoleto. |
| Arquivos e scripts | `solide-tokens.css`; `packages/tokens/build/contract.js`; `build-tokens.js`; `verify-tokens.js`; `packages/tokens/dist/tokens.css`; `packages/tokens/src/{primitives.tokens.json,semantic.tokens.json,mobile-theme.ts}`; `package.json`; `.github/workflows/ci.yml`. |
| Impacto | A promessa de fonte única de verdade não é verificável de modo confiável em checkout limpo/local, e o pacote local pode divergir do contrato até que o build seja executado. |
| Classificação/severidade | `TOKEN_CONTRACT_PROBLEM` — **High**. Não é Blocker porque o gerador é determinístico e o CI constrói antes de validar, mas deve preceder toda correção visual. |
| Recomendação | Na Fase A, definir uma única estratégia: gerar antes de verificar, verificar os artefatos rastreados contra o contrato, e remover a dependência implícita de um `dist` ignorado. Decidir conscientemente se os derivados devem ser rastreados ou sempre produzidos no empacotamento. Não executar nesta etapa. |

O total da auditoria passa a **18** achados: 0 Blocker, 10 High, 6 Medium e 2 Low.

## Plano de correção proposto — não executado

1. **Fase A — contrato e infraestrutura (pré-requisito):** eliminar o drift de tokens e tornar a verificação confiável em checkout limpo; decidir o status dos artefatos derivados; corrigir a contradição documental da geometria mobile; atualizar checkpoint/documentação.
2. **Fase B — componentes e padrões incompletos:** definir contrato, API, estados e Storybook de ThemeToggle, Checkbox, Radio, Switch e Alert/Banner; depois validar equivalência Guide × UI Kit.
3. **Fase C — convergência visual:** decidir checkbox neutro × azul e warning action; corrigir contraste, bordas, ícones/texto apagados, affordance do Ghost, ThemeToggle dark e estados selected/hover/focus.
4. **Fase D — motion:** Button press, tabs, drawer, modal e Sidebar; aplicar guard de hover para cursor fino e `motion-reduce` em cada componente.
5. **Fase E — higiene e cobertura:** corrigir encoding dos stories, ampliar preview/stories/estados e executar validação visual final em desktop/mobile/light/dark.

## Remediação da Fase A — 2026-09-12

Implementada a proteção mínima de integridade:
pm run test:tokens agora executa uild:tokens, valida o contrato e encerra com falha se mobile-theme.ts, os dois JSONs derivados ou contrast.json ficarem divergentes do commit. Os artefatos rastreados foram regenerados a partir de solide-tokens.css. O dist/ continua ignorado e é sempre reconstruído; a eliminação definitiva da dependência de dist dentro de erify-tokens.js permanece uma melhoria de infraestrutura para revisão posterior.


## Endurecimento concluído — verificação sem dist/

erify-tokens.js não lê mais packages/tokens/dist/tokens.css. A verificação avalia o contrato canônico, referências, contraste e Brand Guide; 	est:tokens mantém a geração inicial e exige que qualquer derivado rastreado resultante esteja no commit. Assim, um checkout limpo não depende de artefato ignorado, e o build segue sendo o único responsável por produzir o pacote dist/.


## ThemeToggle — implementação consolidada

Tokens de geometria e motion extraídos do Brand Guide foram adicionados ao contrato (--sld-theme-toggle-*). O Guide agora os consome e o UI Kit fornece ThemeToggle, integrado ao Header, com ole=switch, ria-checked, tema claro/escuro, foco pelo token padrão e redução de motion. Stories cobrem light, dark e disabled; a suíte de UI cobre troca de estado e semântica. Checkbox, Radio, Switch e Alert/Banner continuam sem implementação, pois as decisões VC-01/VC-02 permanecem abertas.

## Consolidação da sessão — 2026-09-13

Este registro descreve o estado anterior à decisão de VC-02: as alterações incompletas foram descartadas, e a escolha entre seleção neutra e accent permaneceu aberta até a decisão registrada abaixo.

## Decisão VC-02 — 2026-09-13

**Decisão:** Checkbox `checked/indeterminate`, Radio `checked` e Switch `on` passam a comunicar estado ativo por **accent semântico de seleção**.

- O preenchimento neutro atual do Brand Guide é considerado legado e deverá ser atualizado junto com a implementação, sem correção isolada de um dos lados.
- O azul atual do checkbox do DataTable acerta a direção perceptiva, mas está semanticamente incorreto por consumir `--sld-action-primary-bg`. Controle selecionado não é ação primária.
- A implementação futura deverá criar um contrato próprio para background/border/foreground de controle selecionado em light e dark. O glifo interno precisa usar foreground explícito e não herdar por coincidência o texto de botão primário.
- O accent não poderá ser o único indicador: check, ponto do radio, posição do thumb e `aria-checked`/semântica nativa continuam obrigatórios.
- `unchecked/off`, hover, focus-visible, disabled e motion-reduce permanecem governados por seus papéis próprios; a decisão não autoriza pintar labels, linhas inteiras ou superfícies adjacentes como ação primária.

**Classificação final de VC-02:** `IMPLEMENTATION_CORRECT / GUIDE_STALE` para a direção accent e `TOKEN_CONTRACT_PROBLEM` para o acoplamento atual ao token de ação.

**Passo concluído de VC-02:** os nomes e mapeamentos foram especificados, aprovados e implementados conforme a remediação abaixo.

### Remediação VC-02 — implementada

O contrato detalhado foi aprovado e implementado com cinco papéis: `selected-bg`, `selected-border`, `selected-fg`, `selected-hover-bg` e `selected-active-bg`. O mapeamento usa cobalt 600/700/800 no light e cobalt 400/300/500 no dark, com foreground warm 0/950. Os contrastes calculados do glifo variam de 4,78:1 a 10,06:1.

O Brand Guide passou a consumir o contrato accent; Checkbox, Radio e Switch foram criados no UI Kit; o DataTable deixou de usar `action-primary` e passou a compor Checkbox; stories, preview e testes foram ampliados. `selected-border` permanece independente mesmo coincidindo inicialmente com `selected-bg`. No Switch, `selected-fg` é restrito ao thumb/ícone e não governa label ou descrição.

Validações concluídas: build completo, TypeScript, build de Storybook, lint/auditoria, `test:tokens` e 92 pares reais de contraste. A direção visual light/dark e os estados dos controles foram aprovados após inspeção interativa. Em 2026-09-13, o Chromium foi disponibilizado e a suíte oficial Playwright passou com 5/5 cenários no bundle real em 1440/390 e light/dark.

A confirmação específica dos estados encontrou e remediou uma falha de cascata: o Tailwind emitia a variante `group-active` antes do bloco de `group-hover`; como os seletores tinham a mesma especificidade, hover vencia quando os dois estados coexistiam. Checkbox, Radio e Switch passaram a elevar apenas a especificidade da variante active, sem `!important`, preservando o guard de hover para ponteiro fino. Disabled continua sem classes hover/active por ramificação e focus-visible permanece ortogonal.

A suíte oficial agora cobre selecionado, indeterminado, não selecionado/desligado, hover, active, hover+active, focus-visible e disabled nos três controles, em 1440/light, 1440/dark, 390/light e 390/dark. Ela também altera temporariamente `--sld-action-primary-bg` durante a asserção para provar que os controles continuam governados por `--sld-control-selected-*`. `npm run test:ui`, `npm run test:tokens`, `npm run typecheck` e `npm run build` passaram. VC-02 está **tecnicamente concluída**.

Commit técnico final da VC-02: `ebaacc0 fix: enforce VC-02 active precedence`.

Pendências preservadas, sem autorização para execução: decisão VC-01, motion/guards restantes, encoding, geometria mobile, cobertura de preview e inventário de legado, conforme a matriz e o checkpoint de migração.

Arquivos consolidados em VC-02: `solide-tokens.css`, `solide-brand-guide.html`, `packages/tokens/build/verify-tokens.js`, derivados rastreados de tokens/contraste, `packages/ui-kit/src/atoms/{Checkbox,Radio,Switch}/`, exportações do UI Kit, `DataTable.tsx`, `preview/main.tsx`, stories e `tests/system.spec.ts`.

**Próximo passo exato:** A próxima frente exige autorização expressa. Nenhuma implementação adicional está autorizada nesta consolidação.

## Decisão e Consolidação VC-01 — 2026-09-13

**Decisão:** A ação do Alert/Banner warning (VC-01) foi implementada como uma ação **sólida e semanticamente independente**.
- Tokens criados: `--sld-action-warning-bg/text/hover/active`.
- Light default: `warning-400`, hover/active `warning-500`.
- Dark default: `warning-500`, hover/active `warning-400`.
- Foreground: `warm-950` em ambos.
- Contrastes mínimos de 6,93:1 atingidos e validados.
- Remoção de `#8A4F05` como fundo da ação warning.
- Restrição via TypeScript em `Button.types.ts`: `tone="warning"` exige `variant="solid"`.
- `disabled` e focus continuam mapeados de forma transversal pela suíte global.
- `hover` e `active` compartilham cor até a resolução de motion na VC-09.
- Validação visual aprovada (1440/390, light/dark). Testes UI adicionados e aprovados.
- Commit técnico: `503122f`.
- **Status:** VC-01 tecnicamente implementada. Componente Alert/Banner (VC-06) permanece aberto.

## Consolidação VC-04 — 2026-09-14

**Registro:** O ThemeToggle teve sua convergência visual remediada.
- O modo light foi preservado utilizando `surface-card` e `text-primary`.
- O modo dark passou a utilizar os novos tokens `--sld-theme-toggle-thumb-bg/fg` mapeados para `warm-50` e `warm-950`.
- O contraste no dark foi estabilizado em 17,91:1 tanto no UI Kit quanto no contrato; Guide também supera o mínimo de 3:1.
- Os testes no Playwright aguardam o fim da transição nativa via `getAnimations().finished`, impedindo falsos negativos gerados pela avaliação durante a animação CSS.
- Foram verificados 101 pares semânticos de contraste e 334 referências no contrato de tokens, além de 10/10 cenários UI em 1440/390 (light e dark).
- Commit técnico: `331a1cdf5515d1a9a8b5fa7ca435939b213a78cc`.

**Status:** VC-04 tecnicamente remediada.

**Próximo passo exato:** A próxima frente exige autorização expressa. Nenhuma implementação adicional está autorizada nesta consolidação.

## Consolidação VC-08 — 2026-09-14

**Registro:** Hover sem guarda de cursor fino foi remediado nos componentes.
- Commit técnico: `08ffae1`.
- 7 componentes corrigidos: Button, Header, Sidebar, SearchBar, DataTable, SegmentedTabs e ModalHeader (incluído após inventário).
- Estratégia de guard aplicada via Tailwind com `[@media(hover:hover)_and_(pointer:fine)]`.
- Motivo do `[&&]` no active do Button: a media query arbitrária fez o bloco hover ser emitido pelo Tailwind no final do CSS gerado, vencendo o seletor `active`. A especificidade do `active` foi elevada pontualmente para garantir que a cor de clique prevaleça enquanto o botão estiver pressionado.
- Cobertura `matchMedia` validando fine e coarse (touch).
- Suíte Playwright executada com sucesso (14/14 cenários).
- Build, typecheck e test:tokens aprovados.

**Status:** VC-08 tecnicamente remediada. VC-09, VC-10, VC-11 e VC-12 continuam abertas.

## Consolidação VC-09A — 2026-09-14

**Registro:** O contrato de press do Button foi formalizado e validado visualmente no Brand Guide (VC-09A). Naquele checkpoint, a frente VC-09 permaneceu parcialmente aberta aguardando a implementação da física spring no UI Kit, pendência posteriormente resolvida pela consolidação VC-09B abaixo.
- **Commit de formalização/contrato:** `0147f186cb2e52ce8643aac486f39e11fec65eb1`.
- **Commit técnico final/corretivo da VC-09A:** `6bd3059cd3332e3716da6df1245929954bc74ef7`.
- **Decisões consolidadas:**
  - target scale 0.97;
  - spring.snappy com stiffness 400 e damping 28;
  - opacidade integral 0.65 rejeitada para Button por degradar contraste;
  - cores semânticas active preservadas;
  - pointer primário recebe scale e active;
  - right click é ignorado;
  - Enter/Space recebem apenas active, sem scale;
  - disabled/loading não recebem press;
  - Loading usa `disabled` nativo e `aria-busy="true"`;
  - pointer cancel/out restaura o estado;
  - reduced motion remove scale/transições e preserva active instantâneo;
  - transform não usa duration/easing CSS fixos no Guide;
  - exportação determinística por `@solide/tokens/motion`.
- **Validações:**
  - build, typecheck, lint, build:storybook passaram;
  - test:tokens passou com 101 pares semânticos e 334 referências;
  - test:ui passou com 45/45;
  - inspeção em 1440/390, light/dark; quatro comparações visuais de Loading;
  - Primary e Ghost cobertos;
  - mouse, touch, teclado, troca de modalidade, right click, cancelamento, disabled, Loading e reduced motion cobertos.

**Status:** VC-09A tecnicamente concluída.

**Próximo passo exato:** A próxima frente exige autorização expressa. Nenhuma implementação adicional está autorizada nesta consolidação.

## Consolidação VC-09B — 2026-09-15

**Registro:** O press do Button foi totalmente implementado no UI Kit, marcando a VC-09 como integralmente remediada.
- **Commit técnico VC-09B:** `a9f586f2b8653a5bf5caf39bd063a57b204b09fe`
- **Implementação:** `<button>` nativo com física spring imperativa via Framer Motion.
- **Integração:** `buttonPress.scale` e `spring.snappy` consumidos de `@solide/tokens/motion`.
- **Física e modalidades:**
  - mouse/touch recebem scale e active;
  - teclado recebe active sem scale;
  - right click e ponteiro não primário ignorados;
  - cancelamento, saída, disabled, loading, reduced motion e unmount protegidos;
  - handlers públicos compostos sem alteração da API.
- **Validações:**
  - 95/95 testes UI aprovados;
  - build, typecheck, test:tokens, build:storybook, lint e diff check aprovados;
  - validação visual em 1440/390, light/dark.

**Status naquele checkpoint:** VC-09B tecnicamente concluída; VC-09 integralmente remediada. VC-10, VC-11 e VC-12 continuavam pendentes.

**Próximo passo exato:** A próxima frente exige autorização expressa. Nenhuma implementação adicional está autorizada nesta consolidação.

## Consolidação VC-10 — 2026-09-15

**Registro:** O motion do SegmentedTabs foi alinhado ao contrato sem alteração perceptiva da composição.
- **Commit técnico:** `73cd33a fix: use semantic motion for segmented tabs`.
- `transition-all duration-150 ease-out` foi substituído por transições exclusivas de `background-color`, `color` e `box-shadow`.
- O componente consome `--sld-durationFast` e `--sld-easingSnappy` e remove motion sob `prefers-reduced-motion`.
- Build, typecheck, test:tokens, lint e build:storybook passaram; a suíte UI passou em 97/97.

**Status:** VC-10 tecnicamente remediada.

**Próximo passo exato:** executar a VC-11 sob a autorização integral concedida em 2026-09-15.

## Consolidação VC-11 — 2026-09-15

**Registro:** Um wrapper `Modal` passou a ser o proprietário único do ciclo de vida e motion de overlays do UI Kit.
- **Commit técnico:** `b68789b55abbb69218ab3e7a2d5a888e0c5837d5`.
- Drawer usa `spring.default`; modal central usa `spring.gentle`, gerados do contrato canônico.
- A implementação preserva semântica nativa de `<dialog>`, Escape, clique no backdrop, restauração de foco e reduced motion.
- DashboardLayout compõe o wrapper no drawer mobile; Storybook demonstra `Modal + ModalHeader`.
- Build, typecheck, test:tokens, lint e build:storybook passaram; a suíte UI passou em 99/99.

**Status:** VC-11 tecnicamente remediada.

**Próximo passo exato:** executar a VC-12 sob a autorização integral concedida em 2026-09-15.

## Consolidação VC-12 — 2026-09-15

**Registro:** O collapse/expand da Sidebar deixou de animar propriedades não relacionadas.
- **Commit técnico:** `868c79c fix: constrain sidebar motion to width`.
- A transição cobre somente `width`, usando `--sld-durationBase` e `--sld-easingSnappy`.
- Reduced motion remove a transição.
- Build, typecheck e lint passaram; a suíte UI passou em 101/101.

**Status:** VC-12 tecnicamente remediada; a frente de motion VC-09–VC-12 está concluída.

**Próximo passo exato:** implementar a VC-06 (Alert/Banner) sob a autorização integral concedida em 2026-09-15.

## Consolidação VC-05 — 2026-09-16

**Registro:** A revisão do Ghost Button não identificou divergência entre o Brand Guide, o contrato de tokens e o UI Kit. O padrão normativo é mantido: transparente em repouso, superfície neutra sem borda apenas em hover/active e texto semântico próprio.

- A inspeção visual manual cobriu 1440/light, 1440/dark, 390/light e 390/dark no preview integrado. Em todos os cenários, a ação Ghost "Consultar" permanece legível, hierarquicamente secundária e distinguível do conteúdo adjacente.
- A suíte oficial Playwright passou em **101/101** ao executar o Chromium fora do sandbox; ela cobre Guide e UI Kit, cursor fino, touch/coarse, hover, active, teclado, disabled, cancelamento e reduced motion.
- `npm run build`, `npm run typecheck`, `npm run test:tokens` (101 pares de contraste e 345 referências) e `npm run lint` passaram.
- Nenhum token, componente ou teste precisou de alteração. A inclusão de borda foi rejeitada porque não é autorizada pelo padrão visual vigente.

**Status:** VC-05 tecnicamente remediada por validação.

**Próximo passo exato:** implementar a VC-06 (Alert/Banner), mantendo a frente isolada até validação e commit.

## Consolidação VC-06 — 2026-09-16

**Registro:** O UI Kit passou a fornecer `Alert` reutilizável para feedback contextual persistente. O componente reproduz os quatro tons do Brand Guide, compõe ações por `Button` existente e disponibiliza descarte controlado.

- Success e info usam `role="status"`; warning e danger usam `role="alert"`, evitando urgência indevida para mensagens informativas.
- Os quatro tons usam somente `--sld-status-*-{bg,border,text}`. Nenhum token ou valor visual novo foi introduzido.
- O ícone de danger reproduz o `circle-x` do Brand Guide; o restante reutiliza ícones existentes.
- Stories, preview e testes Playwright cobrem quatro tons, ação warning/danger, fechamento, foco visível, contraste de tokens e ausência de overflow em 1440/390 px, claro/escuro.
- Inspeção visual manual aprovada nas quatro composições; a suíte completa passou em **105/105**.

**Status:** VC-06 tecnicamente remediada.

**Próximo passo exato:** corrigir a VC-07 (Input/FormField), mantendo a frente isolada até validação e commit.
