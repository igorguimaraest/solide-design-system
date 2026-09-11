# Geometria de composição — App Shell e navegação lateral

Referência normativa para `screen-app-shell` e `comp-sidebar` em `solide-brand-guide.html`.

## Escopo

Aplica-se ao padrão desktop já demonstrado no guia.
Não autoriza inferir uma variante mobile, drawer ou bottom navigation.

## Regiões

| Região | Âncora | Relação |
| --- | --- | --- |
| Header | topo do shell | ocupa toda a largura do shell |
| Sidebar | abaixo do header, à esquerda | expandida ou compacta por ação explícita |
| Área de trabalho | ao lado da sidebar | cartão tonal, flush no topo/esquerda e solto à direita/embaixo |

## Geometria desktop

| Item | Token |
| --- | --- |
| Header | `--sld-header-h` |
| Sidebar expandida | `--sld-sidebar-w` |
| Sidebar compacta | `--sld-sidebar-w-compact` |
| Offset direito e inferior da área de trabalho | `--sld-app-shell-main-offset` |
| Padding vertical da área de trabalho | `--sld-app-shell-main-padding-block` |
| Padding horizontal da área de trabalho | `--sld-app-shell-main-padding-inline` |
| Gap interno da área de trabalho | `--sld-app-shell-main-gap` |
| Sombra da área de trabalho | `--sld-app-shell-main-shadow` |

O header separa marca/toggle, busca central limitada por `--sld-app-shell-search-max-w` e controles do operador. A área de trabalho usa `min-width: 0` para permitir a compressão de conteúdo tabular.

## Estados de navegação

A sidebar alterna somente entre `--sld-sidebar-w` e `--sld-sidebar-w-compact`, por ação explícita. A transição usa `--sld-durationBase` e `--sld-easingSnappy`.

## Responsividade

**Lacuna documentada:** o guia não demonstra uma variante do App Shell em viewport estreito. Antes de adotar este padrão em mobile, deve existir uma demonstração aprovada no guia com a geometria, a navegação e os estados correspondentes.

## Conteúdo de tamanhos reais

Textos longos devem quebrar dentro da área de trabalho, sem aumentar a largura do shell.
Tabelas devem comprimir e usar o comportamento de overflow demonstrado pela tabela correspondente.
Estados vazios, carregamento, erro e ações concorrentes seguem suas respectivas referências do guia; não são definidos por este documento.
