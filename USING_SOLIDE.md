# Como usar o Solide em um aplicativo

Este é o manual operacional para pessoas e agentes aplicarem o Solide sem
interpretar livremente o brand guide.

## O que cada artefato faz

| Artefato | Função |
| --- | --- |
| `solide-brand-guide.html` | Fonte visual normativa e catálogo de padrões |
| `solide-tokens.css` | Tokens oficiais usados pelo próprio guia |
| `@solide/tokens` | Distribuição do mesmo CSS para aplicações |
| `packages/ui-kit` | Componentes React derivados dos padrões do guia |
| `icons/` | SVGs autorizados |
| `solide-icons-data.js` | Catálogo pesquisável usado pelo guia |
| `apps/<app>/design-brief.md` | Conteúdo, navegação e prioridades do app |

## Projeto novo

1. Crie `apps/<nome>/design-brief.md` usando o modelo abaixo.
2. Identifique no guia as telas e componentes correspondentes. Registre seus
   IDs, por exemplo `screen-app-shell`, `comp-sidebar` e `pane-auth-login`.
3. Importe `@solide/tokens`. Em projetos sem empacotador, copie
   `solide-tokens.css` integralmente, sem selecionar ou renomear valores.
4. Em React, reutilize o UI Kit somente após conferir que o componente ainda
   corresponde ao guia. Em outra tecnologia, reproduza a estrutura demonstrada
   usando exclusivamente os tokens e SVGs oficiais.
5. Construa uma rota de cada vez e valide desktop, mobile, tema claro, tema
   escuro e navegação por teclado antes de avançar.

## Projeto existente

1. Preserve comportamento, dados, autenticação e rotas antes da mudança visual.
2. Faça um inventário das telas e associe cada uma a uma referência do guia.
3. Substitua primeiro tokens globais; depois primitivas; depois composições.
4. Não empilhe CSS corretivo sobre estilos antigos. Remova a camada visual
   substituída ou isole a nova interface em componentes próprios.
5. Apps sem React/Tailwind devem migrar a camada de interface para React e o UI Kit; até existir um pacote HTML/CSS oficial, adaptação manual não é equivalente.
6. Compare screenshots lado a lado com as referências do guia antes de chamar
   o trabalho de concluído, registrando no brief os viewports, temas e estados
   avaliados e mantendo as capturas junto ao trabalho revisado.

## Modelo obrigatório de brief

```md
# <Aplicativo> — brief Solide

## Objetivo do produto
<Uma frase sobre o que o usuário resolve.>

## Tecnologia de interface
<React/UI Kit, HTML/CSS, nativo ou outra.>

## Telas e referências do guia
| Tela do app | ID no brand guide | Estados necessários |
| --- | --- | --- |
| Login | pane-auth-login | padrão, carregando, erro |
| Dashboard | screen-app-shell / comp-sidebar | expandido, compacto, mobile |

## Navegação e conteúdo
<Itens, ordem, ações principais e dados reais.>

## Geometria da composição
<Referência do guia para shell, alinhamentos, espaçamento entre regiões,
grade, reflow e comportamento de textos ou dados longos.>

## Lacunas
<Necessidades que ainda não existem no brand guide.>

## Aceitação visual
<Viewports, temas e screenshots que precisam ser comparados.>
```

## Como interpretar o brand guide

- Use o ID da seção como referência, não expressões vagas como “parecido com
  o dashboard”.
- Copie a hierarquia e os estados, não apenas as cores.
- Valores exibidos em exemplos são consumidos por token. Não copie números de
  atributos `style` quando existir um token equivalente.
- Azul representa ação, seleção e foco; não é decoração de superfície.
- Cores funcionais indicam estado. Elas não substituem texto neutro nem viram
  fundos extensos sem o padrão demonstrado.
- Use somente SVGs do catálogo oficial. Emoji não é ícone de produto.
- Uma demonstração não autoriza misturar padrões de telas diferentes em uma
  nova composição.

## Quando parar

Pare e registre uma lacuna se faltar no guia:

- uma composição equivalente à tela;
- um estado de interação ou responsividade;
- um token necessário;
- um ícone com significado adequado;
- orientação para a tecnologia do aplicativo;
- uma decisão entre duas demonstrações aparentemente incompatíveis.

Primeiro atualize o guia, depois os tokens ou componentes e, por último, o app.

## Verificação

Na raiz do Solide:

```text
npm run build
npm run typecheck
npm run test:tokens
```

O teste de tokens confirma que a saída de `@solide/tokens` é uma cópia exata
do CSS carregado pelo brand guide. Ainda é obrigatória a revisão visual.
