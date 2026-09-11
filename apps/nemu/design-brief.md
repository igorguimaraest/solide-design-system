# Nemu — Brief de Interface

## Objetivo

Nemu é um painel pessoal de memória persistente para agentes de IA. A interface
deve parecer uma ferramenta operacional calma e precisa, não um painel de
marketing nem uma interface de chat.

## Composição obrigatória

- Base: `DashboardLayout` do UI Kit Solide.
- Navegação: `Sidebar`, com grupos **Memória** (Visão geral, Memórias,
  Coleções, Skills) e **Administração** (Agentes, Tokens, Limites, Exportar).
- Cabeçalho: `Header`, com busca global e identificação do operador.
- Dados: `DataTable` para listas e `EmptyState` para coleções sem registros.
- Ações: átomos `Button`, `Input`, `Badge` e `Icon`.

## Prioridade da visão geral

1. Estado operacional do projeto atual.
2. Memórias, coleções e conexões ativas.
3. Limites e saúde do serviço.
4. Ações que o operador pode executar agora.

## Não fazer

- Não usar emojis como ícones.
- Não criar navegação horizontal como substituta da sidebar no desktop.
- Não usar cards decorativos; cards devem agrupar decisões ou métricas.
- Não inventar cores ou indicadores fora dos componentes oficiais.
- Não usar dados fictícios na prévia sem identificá-los claramente.

## Referências obrigatórias

- `solide-brand-guide.html#screen-app-shell`
- `solide-brand-guide.html#comp-sidebar`
- `solide-brand-guide.html#pane-auth-login`
- `solide-brand-guide.html#screen-estados-skeleton-tags`
- `solide-brand-guide.html#screen-tabelas`
- `docs/geometry/app-shell-sidebar.md` (desktop)

## Lacuna de responsividade

O App Shell mobile não está definido pelo guia. Nemu não deve receber uma versão mobile desse padrão até haver demonstração aprovada.

As stories do UI Kit são auxiliares de implementação. Em caso de divergência,
o brand guide prevalece e o UI Kit deve ser corrigido.

## Aceitação visual

Antes de apresentar uma mudança, comparar a tela em desktop e mobile com os
componentes acima. Se a estrutura do Nemu exigir algo fora deles, registrar a
lacuna e pedir aprovação antes de implementar.
