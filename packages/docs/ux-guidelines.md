# Solide — Diretrizes de UX, Acessibilidade & Contratos de Interação

> **Versão:** 3.3.0  
> **Classificação:** Diretriz de Engenharia e Experiência do Usuário (UX/UI)  
> **Padrão Obrigatório:** WCAG 2.2 Nível AA / AAA  
> **Ambiente:** Aplicações de Missão Crítica, Painéis Corporativos e Ferramentas de Engenharia de IA

---

## 1. Princípios Fundamentais de UX

O design da Solide é regido pela **sobriedade estética, precisão matemática e ausência deliberada de ruído visual**. Interfaces para ambientes operacionais devem priorizar a tomada de decisão rápida, redução de fadiga cognitiva e confiabilidade extrema.

1. **Eficiência Acima do Ornamento**: Todo componente, borda e elemento tipográfico cumpre uma função estrutural ou de feedback. Não são permitidos brilhos, gradientes chamativos de IA ou elementos puramente decorativos.
2. **Previsibilidade Tátil**: Estados interativos (hover, active, focus, disabled) possuem feedback visual consistente em toda a plataforma.
3. **Resolução sem Beco sem Saída**: O usuário nunca é deixado em um estado sem ação de recuperação ou próximo passo evidente.

---

## 2. Acessibilidade & Critérios WCAG 2.2 Nível AA

Todas as interfaces desenvolvidas no ecossistema Solide devem cumprir ou exceder o nível AA da WCAG 2.2:

### A. Limiares de Contraste Cromático
- **Texto Normal (< 18pt regular ou < 14pt bold)**: Mínimo obrigatório de **4.5:1** contra o fundo de leitura.
- **Texto Grande (≥ 18pt regular ou ≥ 14pt bold)**: Mínimo obrigatório de **3.0:1**.
- **Componentes de Interface & Estados Gráficos**: Mínimo obrigatório de **3.0:1** para bordas ativas, ícones de controle, switches e anéis de foco.

### B. Matriz de Contraste Calculada da Solide (Luminância Relativa W3C)

| Modo | Elemento | Hex Elemento | Hex Fundo | Razão Medida | Limiar WCAG | Avaliação |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Light** | `text-primary` | `#000000` | `#FFFFFF` | **21.00 : 1** | $\ge 4.5:1$ | **AAA Aprovado** |
| **Light** | `text-secondary` | `#6A6A70` | `#FFFFFF` | **5.37 : 1** | $\ge 4.5:1$ | **AA Aprovado** |
| **Dark** | `text-primary` | `#FFFFFF` | `#000000` | **21.00 : 1** | $\ge 4.5:1$ | **AAA Aprovado** |
| **Dark** | `text-secondary` | `#8E8E93` | `#000000` | **6.44 : 1** | $\ge 4.5:1$ | **AA Aprovado** |

---

## 3. Contratos de Teclado & Foco Visível

A navegação exclusivamente por teclado deve ser 100% funcional em todos os fluxos da aplicação:

### A. Indicador de Foco (`focus-visible`)
- Todo controle interativo (botões, links, inputs, selects, tabs) deve renderizar um anel de foco exterior de **2px** com deslocamento (*offset*) de **2px**:
  ```css
  :focus-visible {
    outline: 2px solid var(--solide-ring-focus);
    outline-offset: 2px;
  }
  ```
- O anel nunca deve ser suprimido (`outline: none`) a menos que uma classe explícita de anel substituto (`ring-2 ring-solide-focus ring-offset-2`) esteja ativa.

### B. Ciclo de Foco em Modais e Diálogos (*Focus Trap*)
- Ao abrir um modal, drawer ou paleta de comando:
  1. O foco deve ser transferido imediatamente para o primeiro elemento interativo interno ou para o botão de fechamento.
  2. Pressionar `Tab` no último elemento do diálogo deve ciclar o foco de volta para o primeiro elemento interno.
  3. Pressionar `Shift + Tab` no primeiro elemento deve levar ao último elemento interno.
  4. O foco **jamais deve vazar** para a página em segundo plano enquanto o diálogo estiver aberto.

### C. Restauração Obrigatória de Foco
- Ao fechar qualquer elemento sobreposto (seja por clique no botão de fechar, clique no backdrop ou pela tecla `Escape`), o foco DEVE ser restaurado imediatamente ao elemento disparador que abriu o diálogo.

### D. Tecla Escape Universal
- A tecla `Escape` deve fechar modais, tooltips abertos, dropdowns e limpar inputs de busca instantaneamente.

---

## 4. Padrões de Mensagens de Erro & Microcopy

A Solide rejeita mensagens de erro ambíguas, condescendentes ou genéricas. Cada erro deve capacitar o operador técnico a resolver a situação.

### A. A Fórmula das 3 Respostas
Toda notificação ou mensagem de erro deve responder:
1. **O que aconteceu?** (Diagnóstico objetivo).
2. **Por que aconteceu?** (Causa raiz técnica ou contexto da falha).
3. **O que fazer agora?** (Ação corretiva imediata com link ou botão).

### B. Exemplos de Microcopy

| Cenário | ❌ Incorreto (Clichê / Genérico) | ✅ Padrão Solide |
| :--- | :--- | :--- |
| **Timeout de API** | *"Ops! Algo deu errado. Tente de novo mais tarde."* | *"Falha de conexão com o cluster us-east-1. Código: ERR_GATEWAY_504. [Verificar telemetria] [Tentar novamente]"* |
| **Validação de Formulário** | *"Campo inválido."* | *"A chave de API deve iniciar com 'sk_live_' e conter 32 caracteres hexadecimais."* |
| **Ação Destrutiva** | *"Tem certeza? [Sim] [Não]"* | *"Revogar Chave de Produção: Todas as requisições autenticadas com este token serão rejeitadas imediatamente. Esta ação não pode ser desfeita. [Revogar Chave] [Cancelar]"* |
| **Estado Vazio** | *"Nada por aqui..."* | *"Nenhum nó de inferência alocado. Selecione um cluster para iniciar o provisionamento de GPUs. [+ Provisionar Nó]"* |

---

## 5. Hierarquia de Espaçamento e Alvos de Toque

1. **Alvos de Toque Mínimos**: Em dispositivos móveis e telas sensíveis ao toque, todo alvo interativo deve possuir dimensão mínima de **$44 \times 44\text{px}$** (ou padding compensatório equivalente).
2. **Espaçamento Base-4 / Base-8**:
   - `4px` (`--solide-space-1`): Micro-lacunas entre ícone e texto.
   - `8px` (`--solide-space-2`): Espaçamento interno de badges e gaps compactos.
   - `12px` (`--solide-space-3`): Padding horizontal de controles pequenos.
   - `16px` (`--solide-space-4`): Padding padrão de botões e cards.
   - `24px` (`--solide-space-6`): Separação entre módulos e seções.
   - `32px` (`--solide-space-8`): Margens estruturais de página.
