# Inventário das abas do guia — consolidado

Fonte: `solide-brand-guide.html` (estado de trabalho atual, com o diff experimental não commitado). Três agentes de leitura, somente leitura, produziram os relatórios. Os achados marcados como **verificado** foram conferidos no arquivo. Os demais são relatados e precisam de conferência antes de virar tarefa.

## Itens por aba

| Aba | Itens que hoje dividem o bloco | Deve virar |
| --- | --- | --- |
| Visão geral | wordmark, isotipo, botões de exemplo, meta-grid | contexto, sem item |
| Marca & arquivos | logotipos, lockup, ícones de app, favicon, geometria, raios | 1 item por tipo de arquivo |
| Cores | 26 tokens, estados semânticos, botões de exemplo | 1 item por grupo de cor e 1 por estado |
| Tipografia | Inter, JetBrains Mono, escala de 9 papéis, pesos, regras | 1 item por família e 1 por papel |
| Espaço & movimento | escala de espaçamento, princípios, molas, perfis, háptico | 1 item por escala e 1 por perfil de mola |
| Ícones | catálogo, busca, filtro | 1 item (catálogo) |
| Controles | Button, Input, Select, Switch, Checkbox, Radio, máscaras | 1 item por controle e 1 por máscara |
| Segmented & abas | breadcrumbs, tabs, segmented, KPI cards | 1 item por padrão; KPI sai daqui |
| Alertas | banners (4 variantes), toasts (3 gatilhos) | 1 item por banner e 1 por toast |
| Tabelas | date picker, toolbar, tabela, hover card, paginação | 1 item para tabela, 1 para date picker, 1 para paginação |
| Estados, skeleton & tags | avatares, presença, empty state, skeleton | 1 item por padrão; tags não existe |
| Gráficos | KPI, série temporal, barras, donut, capacidade | 1 item por tipo de gráfico |
| Overlays & períodos | date range, modal, drawer, command palette, accordion, hover card | 1 item por overlay |
| App shell | iframe externo, header, sidebar, área de trabalho, bloco de código | 1 item por região: header, sidebar, área de trabalho |
| Diretrizes & cobertura | manifesto, do's and don'ts | contexto, sem item |
| Padrões de interface | login, cadastro, esqueci a senha, onboarding B2B, aplicações | 1 item por template |

## Confirmado no arquivo

- A visão geral diz "Catálogo de Ícones (64)" e a aba de ícones diz "2.066 SVGs oficiais".
- Controles mistura switch, checkbox e status pills no mesmo bloco.
- Existem duas famílias de switch: `solide-switch` e o legado `switch`.
- Não há marcação de tema escuro entre as linhas 6911 e 8012.
- Gráficos: o container das barras com spring está vazio no HTML; as barras são injetadas por JS.
- App shell: o preview é um iframe para `preview-dist/preview/index.html`, fora do guia. Não foi verificado.

## Relatado, a conferir

- Caption: token de 11px, exemplos em 10px.
- Regra tipográfica "nunca abaixo de 11px" contradita pelo badge de 10px.
- Regra "não reduzir leading" contradita pelo responsivo.
- Título "5 padrões" com 4 listados.
- Movimento: tabela usa k/c, código usa stiffness/damping, sem mapeamento.
- Foco: o texto cita `--sld-action-focusRing`, mas nenhum `:focus` é demonstrado nas abas de controles.
- Tabelas: "Mostrando 1-4 de 128" com 25 por página; não localizado na busca.
- Estados: tags não existe; a aba promete "padrões de dados" e "máscaras", que não aparecem.
- Padrões: nenhum formulário mostra erro, validação ou carregamento; CNPJ sem máscara.
- Comentários de seção vazios ou deslocados (ex.: "MANIFESTO ANTI-IA", "BOTÕES", "BANNERS").
- Valores literais em código de exemplo (hex, rgba, cubic-bezier) fora dos tokens.

## Lacunas de estado (comuns)

- Sem estados de hover, foco ou desabilitado na maioria dos itens.
- Sem tema escuro explícito em várias abas.
- Sem estados de erro, vazio ou carregamento em gráficos, tabelas e formulários.
- Sem versão mobile demonstrada na maioria das abas.

Cada lacuna acima é uma pergunta para o Igor ou para o guia, não um valor para inventar (AGENTS.md).
