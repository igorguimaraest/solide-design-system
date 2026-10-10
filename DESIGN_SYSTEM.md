# Solide — contrato do sistema de design

## Autoridade

`SOLIDE-RESUMO.md` é a leitura padrão: resume os tokens e as regras de uso em
duas páginas. Quem constrói uma tela começa por ele.

`solide-brand-guide.html` é a vitrine visual do Solide. Ele demonstra a
aparência, a hierarquia, os padrões de composição e os comportamentos, e é
consultado por seção quando for preciso ver um padrão montado.

`solide-tokens.css` é o contrato de tokens carregado pelo guia e distribuído
pelo pacote `@solide/tokens`. A compilação copia esse arquivo sem transformá-lo,
de modo que aplicações e guia recebam os mesmos valores.

`packages/ui-kit` é a implementação reutilizável dos padrões do guia. Quando
um componente divergir visualmente do guia, o componente deve ser corrigido;
ele não ganha precedência sobre o guia.

## Ordem de precedência

1. `solide-brand-guide.html` — decisão visual e comportamento demonstrado.
2. `solide-tokens.css` — nomes e valores que implementam o guia.
3. `packages/ui-kit` — componentes reutilizáveis derivados do guia.
4. `packages/docs` — explicações complementares.
5. Brief do aplicativo — conteúdo, rotas e prioridades próprias, sem redefinir
   a identidade Solide.

Não é permitido combinar uma alternativa de uma fonte antiga com o guia.
Divergência encontrada durante a adoção: siga o guia, avise em uma linha e
registre em `STATUS.md › Lacunas` para corrigir no Solide.

## Uso

O procedimento completo para projetos existentes e novos está em
[`USING_SOLIDE.md`](USING_SOLIDE.md).

## Geometria de composição — ampliação obrigatória do guia


O padrão já formalizado está em [`docs/geometry/app-shell-sidebar.md`](docs/geometry/app-shell-sidebar.md). Documentos de geometria vinculados nesta seção são normativos junto à demonstração correspondente do guia.
O sistema não está completo apenas por ter cores, tipografia, raios e uma
escala de espaçamento. Antes da próxima adoção visual, o brand guide deve
passar a declarar, por padrão de tela, a sua geometria de composição:

- qual elemento ancora o conteúdo e onde cada região começa e termina;
- alinhamento horizontal e vertical entre título, busca, ações, métricas,
  tabelas e navegação;
- distância entre regiões, entre elementos de uma região e dentro de cada
  componente;
- largura, comportamento e relação entre cabeçalho, sidebar e área de
  trabalho;
- grade, colunas, quebra de linha e reordenação em desktop e mobile;
- regra para conteúdo de tamanhos reais: textos longos, tabelas, estados
  vazios e ações concorrentes.

Enquanto um padrão de tela não tiver esse mapa, use os tokens de espaço mais
próximos do padrão demonstrado mais parecido, avise em uma linha e registre a
lacuna em `STATUS.md › Lacunas`. Sem esse mapa, uma implementação pode usar os
tokens corretos e ainda assim parecer desalinhada — exatamente o problema
encontrado no Nemu —, por isso a comparação visual em desktop e celular é
obrigatória.

Uma lacuna de responsividade permanece uma lacuna mesmo quando a geometria
desktop estiver documentada: o comportamento mobile precisa ser conferido na
tela, não deduzido.
## Critério de conformidade

Uma interface só pode ser apresentada como Solide quando:

- carrega `@solide/tokens` ou uma cópia exata de `solide-tokens.css`;
- reproduz o padrão correspondente exibido no brand guide;
- segue o mapa de geometria da composição correspondente, incluindo âncoras,
  alinhamento, espaços e comportamento responsivo;
- usa os ícones existentes em `icons/` ou `solide-icons-data.js`;
- implementa os estados exibidos no guia, inclusive responsivo, foco, vazio,
  carregamento, erro e tema escuro quando aplicáveis;
- usa só tokens; onde faltou algo, usou o mais próximo e registrou a lacuna;
- foi comparada visualmente com o guia em desktop e mobile;
- passa por `npm run build`, `npm run typecheck` e `npm run test:tokens`.

Se o guia não demonstrar uma necessidade do produto, ela é uma lacuna: use o
token ou padrão mais próximo, avise em uma linha e registre em
`STATUS.md › Lacunas`. O trabalho segue; lacunas que se repetem viram token e
padrão no Solide.
