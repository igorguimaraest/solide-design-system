# Auditoria de convergência visual — Solide

Data: 2026-09-12
Escopo: `main` consolidada, sem alterações de implementação.

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
| VC-01 | Warning action | Banner usa `--solide-warning` + `--solide-neutral-900` via style inline. | Não há Alert/Banner. | `--sld-status-warning-solid/on-solid` existem, mas não são usados. | GUIDE_CORRECT / IMPLEMENTATION_WRONG; BOTH_NEED_REVIEW para o peso. | High | peso visual | Medir contraste e comparar ação secondary/outline, solid warning ou primary separado. | guide, futuro Alert |
| VC-02 | Checkbox selecionado | `.solide-checkbox` é neutro (preto/branco por tema). | DataTable usa native `accent-[--sld-action-primary-bg]` azul. | Não há token de controle de seleção. | TOKEN_CONTRACT_PROBLEM | High | semântica | Decidir seleção neutra vs accent e migrar ambos juntos. | guide, tokens, DataTable |
| VC-03 | Checkbox/radio/switch | Guia tem estados complete, disabled, indeterminate e motion. | UI Kit não exporta esses primitivos; tabela é parcial. | Sem API/contrato. | DOCUMENTATION_GAP | High | affordance | Especificar API/estados antes de implementar. | UI Kit, stories |
| VC-04 | Theme toggle | Switch 50×26, track/thumb, `role=switch`, `aria-checked`, tema dark próprio. | Header usa ícone sem track/role/estado persistente. | Sem contrato de componente. | GUIDE_CORRECT / IMPLEMENTATION_WRONG | High | affordance/visibilidade | Restaurar padrão ou atualizar guia por decisão explícita; conferir contorno dark. | Header, preview, guide |
| VC-05 | Ghost button | Transparente em repouso; fundo só em hover. | Mesma estratégia. | `--sld-action-ghost-*`. | BOTH_NEED_REVIEW | Medium | affordance | Validar em contexto/dark; não adicionar borda sem atualizar padrão. | Button, guide |
| VC-06 | Alertas/banners | Quatro variantes e ação warning demonstradas. | Sem componente/story/preview. | status semantic tokens. | GUIDE_CORRECT / IMPLEMENTATION_WRONG | High | hierarquia | Especificar e cobrir só na fase de correção. | UI Kit, preview |
| VC-07 | Input/FormField | Foco `:focus-visible` global. | Input usa `focus:` também por mouse. | `--sld-action-focusRing`. | IMPLEMENTATION_WRONG | Medium | foco | Unificar gatilho e testar erro/disabled/keyboarding. | Input, FormField |
| VC-08 | Hover em touch | Guard `(hover:hover) and (pointer:fine)`. | `hover:` sem guard em Button, Sidebar, Header, SearchBar, DataTable e tabs. | Extensão WEB. | IMPLEMENTATION_WRONG | High | comportamento | Aplicar estratégia de guard antes de mudar aparência. | componentes/preview CSS |
| VC-09 | Press de Button | Guia declara scale/opacity táteis. | Só transição de cores. | motion/`--sld-durationFast`. | IMPLEMENTATION_WRONG | High | feedback | Reintroduzir apenas o press documentado, com reduced-motion. | Button, guide |
| VC-10 | SegmentedTabs motion | Motion usa tokens. | `duration-150 ease-out` literal. | duration/easing tokens. | IMPLEMENTATION_WRONG | High | consistência | Trocar por tokens e limitar propriedades. | SegmentedTabs |
| VC-11 | Drawer/modal motion | Guia/geometria pedem drawer e motion. | `<dialog>` abre instantaneamente; ModalHeader não compõe modal. | base/snappy/gentle. | IMPLEMENTATION_WRONG | High | feedback | Definir wrapper responsável pela animação. | DashboardLayout, Modal |
| VC-12 | Sidebar motion | Geometria exige durationBase + easingSnappy. | `transition-all` sem easing e amplo demais. | durationBase/easingSnappy. | IMPLEMENTATION_WRONG | Medium | ruído/comportamento | Animar só largura com easing semântico. | Sidebar |
| VC-13 | DataTable/paginação | Seleção neutra, hover guardado e controles coerentes. | checkboxes blue, hovers sem guard, disabled `opacity-40` literal. | seleção/disabled/focus. | TOKEN_CONTRACT_PROBLEM | Medium | contraste/affordance | Consolidar depois de VC-02/08. | DataTable, tokens |
| VC-14 | Encoding PT-BR | Trechos auditados legíveis. | 11 stories usam `??`/`?` no lugar de acentos. | N/A. | IMPLEMENTATION_WRONG | High | conteúdo | Corrigir UTF-8 e criar checagem. | stories listados abaixo |
| VC-15 | Preview integrado | Guide cobre alertas, seleção, navegação, cards e estados. | Preview não cobre Alert, checkbox/radio/switch, Sidebar compacta nem estados completos. | aceitação. | DOCUMENTATION_GAP | Medium | cobertura | Expandir após decidir componentes faltantes. | preview, testes |
| VC-16 | Geometria mobile | Documento especifica drawer/16 px/overflow abaixo de 1024. | O próprio escopo diz não autorizar variante mobile. | geometria normativa. | DOCUMENTATION_GAP | Medium | comportamento | Corrigir redação normativa. | geometry, DESIGN_SYSTEM |
| VC-17 | Valores legados | CSS do guia ainda tem valores avulsos/inline. | UI Kit também tem medidas em utilitários; não há inventário de exceções. | contrato de tokens. | BOTH_NEED_REVIEW | Low | consistência | Inventariar antes de limpeza mecânica. | guide, UI Kit, tokens |

## Motion

Press de Button perdeu scale/opacity; Tabs usa tempo/curva fora de token; drawer/modal abre sem transição; Sidebar anima `all`; hover não respeita cursor fino; e os três controles de seleção não existem como primitivas reutilizáveis.

## Encoding

Ocorrências em 11 stories: `Button`, `Badge`, `Typography`, `FormField`, `SearchBar`, `ModalHeader`, `DataTable`, `EmptyState`, `Sidebar`, `AuthLayout` e `DashboardLayout`. Não houve `�`/`??` nos componentes de produção, preview ou Brand Guide.

## Ordem de correção após autorização

1. Definir contratos de seleção, Alert/Banner e ThemeToggle.
2. Decidir VC-01/VC-02 visualmente nos dois temas.
3. Corrigir motion/estados com tokens e guards (VC-08–VC-12).
4. Completar componentes e cobertura (VC-03, VC-06, VC-15).
5. Corrigir encoding/documentação (VC-14, VC-16).
6. Inventariar legado (VC-17).

## Próximo passo obrigatório

Revisar lado a lado no Work as combinações 1440/light, 1440/dark, 390/light e 390/dark, registrando capturas para os 18 IDs antes de iniciar correções.

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
