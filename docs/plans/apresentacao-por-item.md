# Plano — apresentação do guia com um item por bloco

Status: **rascunho para decisão**. Nenhum arquivo do guia foi alterado por este plano.

## 1. Diagnóstico verificado

- `solide-brand-guide.html` tem 16 abas (`doc-screen`), cada uma ligada a um item da sidebar por `showScreen(...)`.
- Muitas abas misturam itens distintos. Exemplos:
  - `screen-controles` reúne Button, Input, Switch, Checkbox, Radio e máscaras.
  - `screen-alertas` reúne banners de alerta e toasts.
  - `screen-app-shell` reúne header, sidebar e área de trabalho em um único preview.
  - `screen-estados-skeleton-tags` reúne avatares, estados vazios, skeleton e tags.
  - `screen-overlays-periodos` reúne date picker, modais, drawer, command palette, accordions e hover card.
- Os blocos de demonstração estão marcados como `comp-title`. Há 14 deles, e cada um deve virar uma unidade própria.
- O UI Kit (`packages/ui-kit`) tem componentes separados por átomos, moléculas e organismos. Ele serve como implementação, não como autoridade visual (AGENTS.md).
- `npm run typecheck` e `npm run test:tokens` passaram na verificação inicial.
- Há alteração não commitada no guia (cerca de 344 linhas de CSS marcadas como "EXPERIMENTO — APRESENTAÇÃO EDITORIAL") no branch `codex/presentation-layout-experiment`. Esse trecho precisa de decisão antes de qualquer transformação.

## 2. Regras que valem para o trabalho

- Fonte visual normativa: `solide-brand-guide.html`. Valores só por token de `solide-tokens.css`.
- Lacuna no guia = parar e registrar. Não criar valor, variante ou ícone inventado.
- Cada tela alterada precisa de comparação visual em desktop e mobile. Build e testes não bastam.
- Ao concluir: `npm run build`, `npm run typecheck` e `npm run test:tokens`.
- Uma aba por vez. Um branch e um PR por fatia, a partir do `main`.

## 3. Estrutura alvo

Cada item vira um bloco próprio, com:

1. Nome e uma linha de uso.
2. Todas as variantes e estados que o guia já demonstra (tamanhos, tipos, estados de foco, desabilitado, erro, carregamento, tema escuro).
3. Cores e tokens usados, listados em texto.
4. Comparação desktop e mobile.

Exemplos: sidebar sozinha, botões sozinhos, alertas sozinhos, cada um em seu bloco.

## 4. Decisões pendentes para o Igor

- **Branch do experimento:** manter o CSS experimental e commitá-lo antes, ou descartá-lo? Recomendação: commitar em branch próprio para não perder o trabalho, e partir dele.
- **Navegação:** a sidebar passa de 16 para dezenas de entradas. Recomendação: manter os 16 grupos como seções e colocar os itens como subitens dentro de cada grupo.
- **Abas sem item** (visão geral, manifesto, do's and don'ts, templates de autenticação e exportação): recomendação: manter como páginas de contexto, fora da divisão por item.

## 5. Divisão por agente

Os agentes não devem editar o mesmo trecho do HTML ao mesmo tempo. O guia é um único arquivo de cerca de 12,7 mil linhas, então a divisão é em fases.

| Fase | Trabalho | Agente sugerido | Motivo |
| --- | --- | --- | --- |
| 0 | Resolver o branch do experimento e os pontos da seção 4 | Igor decide | Muda a base de todo o resto |
| 1 | Inventário: para cada item, listar variantes, estados e tokens que o guia demonstra, e apontar lacunas | Claude Code (subagente Explore) | Leitura ampla, sem edição |
| 2 | Estrutura: novos IDs por item, navegação da sidebar, remoção de mistura entre blocos | Claude Code | Mexe na estrutura e na navegação do arquivo inteiro; exige coerência |
| 3 | Preenchimento de cada aba já dividida, em lotes | Codex, uma aba por branch | Trabalho repetitivo e separável, sem colisão se cada lote for uma aba |
| 4 | Revisão visual desktop e mobile, item a item, contra o guia atual | Antigravity | Tarefa de comparação visual; a capacidade dele aqui é suposição minha, a confirmar |
| 5 | Verificação e revisão de diff por fatia | Claude Code (subagente de revisão) e `/code-review` | Regra do CLAUDE.md |

Observação: eu, Claude Code, não consigo acionar Codex nem Antigravity desta sessão. Eles precisam ser rodados por você, a partir deste documento.

## 6. Critério de pronto por fatia

- Cada item da aba tem seu próprio bloco, sem outros itens misturados.
- Nenhuma cor, espaço, raio ou sombra fora de `solide-tokens.css`.
- Comparação visual desktop e mobile registrada.
- `npm run build`, `npm run typecheck` e `npm run test:tokens` com saída real anexada.
- Lacunas listadas, sem preenchimento inventado.
