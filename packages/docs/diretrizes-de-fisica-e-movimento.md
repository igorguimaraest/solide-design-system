# Diretrizes de Física e Movimento para Produtos Digitais

## Propósito

Esta diretriz define como uma interface deve responder ao toque, ao gesto e à mudança de estado para transmitir continuidade, materialidade e controle.

A referência é uma interação contínua e previsível: o software reage como um objeto coerente, preserva o movimento em curso e responde imediatamente à intenção do usuário.

---

## Princípios

### 1. O movimento explica uma mudança

Toda animação precisa esclarecer uma relação espacial ou causal:

- Um painel vem da borda porque pertence à navegação lateral;
- Uma janela cresce a partir do contexto que a acionou;
- Um item removido se contrai e libera espaço;
- Um controle retorna à posição de repouso quando o usuário solta o gesto.

> Se o movimento não esclarece origem, destino, hierarquia ou resultado, ele é decoração e deve ser removido.

### 2. A interface deve preservar continuidade

Uma animação não deve reiniciar ou saltar quando o usuário muda de ideia. Se uma gaveta está abrindo e a pessoa a fecha, ela precisa inverter a direção a partir da posição e velocidade atuais.

Use animações baseadas em física de mola para elementos que o usuário pode interromper: painéis, modais, controles, cards interativos, abas móveis e elementos arrastáveis.

Evite transições lineares ou curvas de duração fixa nesses casos. Elas descrevem tempo; uma mola descreve comportamento.

### 3. A resposta ao toque vem antes do resultado

O usuário precisa perceber que seu toque foi reconhecido antes da operação terminar. Todo controle acionável deve oferecer retorno imediato no pressionamento, como uma pequena redução de escala, opacidade ou ambos.

Esse retorno não substitui o estado final. Ele confirma a intenção; o estado final confirma o resultado.

### 4. A física deve ser consistente

Uma mesma família de interação deve usar a mesma resposta física em todo o produto. Um switch, um botão e uma opção selecionável podem ter intensidades diferentes, mas não devem parecer pertencer a motores de movimento diferentes.

Defina poucos perfis de movimento, nomeados por intenção:

| Perfil | Uso |
| :--- | :--- |
| **Rápido** (`snappy`) | Pressionamento, toggle, seleção e microinterações |
| **Padrão** (`default`) | Navegação, drawers, sheets e transições de contexto |
| **Suave** (`gentle`) | Modais grandes, cards em destaque e mudanças de foco importantes |

---

## Sistema de Movimento

### Mola

Uma mola é definida por rigidez e amortecimento. A rigidez determina a rapidez com que o elemento busca o destino; o amortecimento controla quanto ele oscila antes de estabilizar.

Use uma biblioteca que implemente física de mola na plataforma escolhida. Em vez de decidir cada duração isoladamente, escolha perfis consistentes e reutilize-os.

Ponto de partida utilizado no Solide:

```ts
export const spring = {
  snappy:  { stiffness: 400, damping: 28 },
  default: { stiffness: 170, damping: 26 },
  gentle:  { stiffness: 120, damping: 20 },
};
```

Esses valores são pontos de partida. Ajuste-os com teste em dispositivo real, mantendo os nomes e os papéis semânticos.

### Pressionamento

No toque ou clique, o elemento deve responder sem atraso. Ao soltar, ele retorna com mola.

```ts
whileTap: {
  scale: 0.97,
  opacity: 0.65,
}
```

O retorno deve ser mais perceptível que a entrada. A entrada confirma o toque; a volta confirma que o elemento recuperou seu repouso.

### Entrada e Saída

A entrada estabelece contexto. A saída confirma encerramento:

- Um modal aparece próximo ao centro, com escala e opacidade sutis.
- Um sheet sobe a partir da borda inferior.
- Um drawer desliza a partir da lateral.
- Um toast reduz sua barra temporal, depois se contrai levemente para o centro antes de sair.

A saída nunca deve parecer um corte abrupto, salvo quando a pessoa escolhe reduzir movimento.

---

## Gestos

### Arrastar para dispensar

Em componentes como sheets, modais móveis e cartões dispensáveis, a decisão de fechar deve considerar distância e velocidade.

Feche quando o usuário:
- Ultrapassar uma fração significativa do percurso; ou
- Fizer um gesto rápido na direção de fechamento.

Isso permite que um arraste curto e decidido tenha o mesmo resultado de um arraste longo e lento. Se o limiar não for atingido, o componente deve voltar ao repouso com uma mola.

### Resistência elástica

Quando um arraste passa do limite natural, o deslocamento visível deve crescer menos que o deslocamento do dedo. Essa resistência comunica o limite sem parecer um bloqueio rígido.

A resistência deve aumentar progressivamente. O usuário ainda controla o objeto, mas sente que ele está saindo de sua região válida.

### Rolagem

Use a rolagem nativa sempre que possível. Ela já preserva aceleração, desaceleração e comportamento esperado pela plataforma.

Não recrie scroll com animações lineares. Para componentes que exigem física própria, use desaceleração exponencial e preserve a velocidade no momento em que o gesto termina.

---

## Superfície, Luz e Profundidade

A percepção de física não vem apenas do movimento. Forma, luz e elevação precisam concordar com ele:

- Superfícies elevadas recebem sombra em camadas, não uma única sombra escura.
- O realce de borda e o brilho interno devem seguir uma única direção de luz no produto.
- Raios internos devem ser concêntricos aos raios externos: o raio do filho é o raio do pai menos o espaçamento entre eles.
- Material translúcido deve ser usado com parcimônia. Uma única superfície de vidro por contexto mantém a hierarquia clara.

A luz deve reforçar elevação e foco, nunca competir com o conteúdo.

---

## Feedback Háptico

Haptics reforçam eventos pontuais; não devem carregar informação essencial.

Associe cada padrão a uma intenção:

| Evento | Intensidade sugerida |
| :--- | :--- |
| Pressionamento discreto | Leve |
| Mudança de seleção | Seleção |
| Confirmação de ação | Média |
| Operação importante | Forte |
| Sucesso, aviso ou erro | Notificação semântica |

Na web, vibração é suporte opcional e não funciona de forma uniforme, especialmente no Safari em iOS. O produto deve permanecer compreensível apenas com feedback visual e sonoro, quando aplicável.

---

## Acessibilidade e Redução de Movimento

Respeite a preferência do sistema para reduzir movimento (`prefers-reduced-motion: reduce`).

Quando ela estiver ativa:
- Remova deslocamentos, escalas e oscilações não essenciais;
- Preserve feedback de estado, como opacidade, mudança de conteúdo, foco e rótulos;
- Garanta que o elemento apareça diretamente na posição final;
- Mantenha temporizadores e resultados funcionais, mesmo que a animação visual seja removida.

> Reduzir movimento não significa remover resposta. Significa trocar movimento por clareza estática.

---

## Critérios de Qualidade

Uma interação está pronta quando responde positivamente a estas perguntas:

1. O usuário entende o que mudou e por quê?
2. A interação pode ser interrompida sem salto visual?
3. O toque recebe resposta imediata?
4. O gesto considera direção, distância e velocidade?
5. O componente retorna naturalmente ao repouso quando a ação não se completa?
6. A animação respeita a preferência de redução de movimento?
7. A luz, a sombra, a forma e o movimento indicam a mesma hierarquia?
8. O comportamento continua claro sem cor, vibração ou animação?

---

## O que Evitar

- Transições genéricas de duração fixa em elementos interrompíveis.
- Animações que começam ou terminam sem relação espacial com o contexto.
- Movimento excessivo em listas, textos e conteúdos que precisam ser lidos.
- Efeitos de hover como única resposta para ações que também existem em touch.
- Haptics ou cor como único indicador de sucesso, falha ou seleção.
- Superfícies translúcidas, brilho e sombras aplicados indiscriminadamente.
- Movimento que deixa um elemento fora da posição correta quando a preferência de redução está ativa.

---

## Regra Final

A sensação de qualidade não vem de "adicionar animação". Ela vem de fazer cada resposta parecer inevitável: o objeto se move porque foi tocado, para onde pertence, com a resistência que seu material sugere, e para quando o usuário decide.
