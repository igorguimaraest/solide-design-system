# Solide — contrato do sistema de design

## Autoridade

`solide-brand-guide.html` é a fonte visual normativa do Solide. Ele determina
a aparência, a hierarquia, os padrões de composição e os comportamentos.

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
Qualquer divergência encontrada deve ser corrigida no Solide antes da adoção.

## Uso

O procedimento completo para projetos existentes e novos está em
[`USING_SOLIDE.md`](USING_SOLIDE.md).

## Geometria de composição — ampliação obrigatória do guia

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

Essa especificação não autoriza criar números novos por aproximação. Os
valores devem ser extraídos de padrões já demonstrados no guia ou serem
formalmente definidos nele como tokens e exemplos antes de chegarem a um app.
Sem esse mapa, uma implementação pode usar os tokens corretos e ainda assim
parecer desalinhada — exatamente o problema encontrado no Nemu.

## Critério de conformidade

Uma interface só pode ser apresentada como Solide quando:

- carrega `@solide/tokens` ou uma cópia exata de `solide-tokens.css`;
- reproduz o padrão correspondente exibido no brand guide;
- segue o mapa de geometria da composição correspondente, incluindo âncoras,
  alinhamento, espaços e comportamento responsivo;
- usa os ícones existentes em `icons/` ou `solide-icons-data.js`;
- implementa os estados exibidos no guia, inclusive responsivo, foco, vazio,
  carregamento, erro e tema escuro quando aplicáveis;
- não contém valores visuais inventados fora do guia;
- foi comparada visualmente com o guia em desktop e mobile;
- passa por `npm run build`, `npm run typecheck` e `npm run test:tokens`.

Se o guia não demonstrar uma necessidade do produto, ela é uma lacuna. A
implementação deve parar nesse ponto até que o padrão seja acrescentado ao
guia e ao contrato de tokens/componentes.
