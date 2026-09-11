# Retrospectiva — tentativa de aplicar Solide ao Nemu

**Status da tentativa Nemu: reprovada pelo responsável pelo produto.**

**Status da documentação Solide: correções aplicadas em 2026-09-11.** O
brand guide passou a ser a autoridade declarada, `@solide/tokens` passou a
publicar uma cópia exata de `solide-tokens.css`, e `USING_SOLIDE.md` passou a
definir o procedimento de adoção. Esta atualização não torna a tentativa Nemu
aceita; ela evita repetir a mesma ambiguidade.

Esta tentativa não deve ser usada como referência visual, nem como exemplo de
implementação Solide. A prévia local do Nemu foi apresentada e recusada por
estar visualmente feia, desalinhada e distante do resultado esperado.

## Responsabilidade da execução

A principal falha foi de execução do agente:

1. O Nemu é uma interface HTML renderizada pelo Worker, mas o UI Kit Solide é
   React/Tailwind. Em vez de parar e propor uma migração de interface ou pedir
   uma decisão técnica, o agente criou um adaptador de CSS sobre o HTML
   existente.
2. Esse adaptador foi construído por camadas de sobrescrita. Isso gerou regras
   concorrentes, como a grade de métricas que inicialmente ficou quebrada, e
   tornou o resultado inconsistente.
3. Foram usados SVGs próprios para ícones e uma composição inferida. Isso
   viola o contrato de reutilizar `Icon`, `Sidebar`, `Header` e
   `DashboardLayout` reais.
4. A prévia foi mostrada antes de haver uma comparação visual séria com uma
   referência aprovada do Nemu. Testes de tipo e de API passaram, mas eles não
   comprovam qualidade visual.

Conclusão: a entrega falhou principalmente porque a implementação não seguiu
o contrato técnico e visual que o próprio Solide exige. Isso é responsabilidade
do agente, não do usuário.

## Lacunas e contradições no Solide

Antes da correção de 2026-09-11 havia fontes múltiplas e conflitantes:

| Assunto | Guia | Pacote anterior |
| --- | --- | --- |
| Superfície secundária | `#e9e9e6` (`--bg-secondary`) | `#FAFAFA` (`--solide-bg-surface`) |
| Borda sutil | `#c6c6c8` (`--border-subtle`) | `#E5E5E5` (`--solide-border-subtle`) |
| Sucesso | `#34c759` (`--solide-success`) | `#10B981` (`--solide-feedback-success`) |

Essas divergências foram removidas da distribuição pública: os aliases
`--solide-*` agora apontam para os tokens do guia e `@solide/tokens` é uma
cópia exata de `solide-tokens.css`.

Além disso:

- O guia de marca é uma demonstração extensa, não uma especificação de uma
  tela concreta do Nemu. Ele mostra possibilidades, mas não diz qual estrutura,
  densidade, hierarquia e comportamento devem ser escolhidos para cada rota.
- O UI Kit contém componentes React/Tailwind, enquanto o Nemu atual não possui
  uma camada React. O contrato anterior dizia para usar os componentes reais,
  porém não define como aplicá-los em apps renderizados no servidor.
- As stories mostram peças isoladas; falta uma tela de referência aprovada,
  versionada e capturada para o caso de uso "Nemu — dashboard operacional".
- Há aliases legados e nomes paralelos de token (`--bg-*`, `--border-*`,
  `--solide-*`). Sem uma única API pública, uma IA pode combinar famílias de
  token que não deveriam coexistir. A API pública agora documenta os aliases
  como compatibilidade do mesmo contrato, não como uma segunda paleta.

Essas lacunas não justificam o resultado ruim; elas explicam por que o guia não
reduz suficientemente a margem de interpretação.

## Condições mínimas antes de uma nova tentativa

1. Manter o brand guide como fonte única e corrigir qualquer divergência antes
   de aplicar o sistema em um app.
2. Criar um **brief visual por app** com referências de desktop e mobile,
   incluindo estados vazios, carregamento, erro, foco e hover.
3. Publicar uma composição completa e versionada de `DashboardLayout` para o
   Nemu, não apenas componentes isolados.
4. Definir uma estratégia oficial para aplicações sem React: migração para
   React/Tailwind ou um pacote de HTML/CSS gerado pelo mesmo UI Kit. Não aceitar
   adaptação manual como equivalente aos componentes.
5. Adicionar uma verificação visual obrigatória: comparação de screenshot com
   a referência aprovada antes de apresentar qualquer implementação.

Enquanto essas condições não existirem, o procedimento correto é parar após
identificar a incompatibilidade e pedir definição — não inventar a tela.
