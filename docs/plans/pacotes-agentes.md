# Pacotes de trabalho por agente

Base: `docs/plans/apresentacao-por-item.md` e `docs/plans/inventario-abas.md`. Todo pacote segue AGENTS.md: tokens de `solide-tokens.css`, sem valor inventado, lacuna registrada e não preenchida, comparação visual desktop e mobile, e ao final `npm run build`, `npm run typecheck` e `npm run test:tokens` com saída real.

## Pré-requisito (Igor)

Decidir o destino do CSS experimental não commitado (ver plano, seção 4). Nenhum pacote começa antes disso.

## Claude Code — fase 2: estrutura

- Escopo: IDs por item, navegação da sidebar com subitens dentro de cada grupo, separação de blocos que misturam itens, remoção de comentários órfãos.
- Arquivos: `solide-brand-guide.html` (estrutura e navegação apenas).
- Não faz: preencher variantes, criar estados, alterar cores ou espaçamentos.
- Entrega: um branch, um PR, lista de IDs antigos e novos.

## Codex — fase 3: preenchimento, uma aba por branch

Para cada aba, na ordem do inventário:

1. Ler o bloco do item no guia atual.
2. Reapresentar só o item, com as variantes e estados que o guia já demonstra.
3. Listar tokens usados em texto, sem valores soltos.
4. Registrar lacunas em `docs/plans/lacunas-<aba>.md`.

Ordem sugerida: alertas, controles, segmented & abas, tabelas, overlays, app shell, gráficos, estados, padrões de interface, ícones, marca, cores, tipografia, espaço & movimento.

## Antigravity — fase 4: revisão visual

- Escopo: comparar, item a item, a versão dividida com a versão atual do guia, em desktop e mobile, nos dois temas quando existirem.
- Entrega: capturas lado a lado e lista de diferenças, sem alterar o código.
- Observação: a escolha deste agente para revisão visual é uma suposição; confirme antes.

## Claude Code — fase 5: revisão e verificação

- Subagente de revisão contra o diff de cada fatia (regra do CLAUDE.md).
- Sugerir ao Igor rodar `/code-review` antes de cada commit.
