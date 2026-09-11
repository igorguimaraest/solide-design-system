# Solide — Manual de Marca, Design Tokens & Diretrizes de UX

> **Empresa:** Solide  
> **Fundador:** Igor Guimarães  
> **Domínio Oficial:** `solide.dev.br`  
> **Versão:** 3.3.0  
> **Classificação:** Engenharia de Software, Inteligência Artificial & Infraestrutura Crítica  

---

## 1. Filosofia & Identidade Visual

A Solide é fundamentada no princípio de **tecnologia sólida e engenharia inteligente**. Seus produtos digitais e plataformas operam em ambientes corporativos e de missão crítica, exigindo confiabilidade, precisão matemática e sobriedade estética.

### Princípios Estéticos
1. **Anti-IA Genérica:** A Solide rejeita explicitamente clichês visuais associados a IA sem instrução — como gradientes roxos saturados, sombras fluorescentes, brilhos excessivos e linguagem hiperbólica.
2. **Superfície & Profundidade:** No claro, o canvas é branco, o shell é `#E9E9E6` e o hover é `#E0E0DD`. No escuro, o shell é `#000000`, o conteúdo elevado é `#1C1C1E` e o hover é `#2A2A2C`.
3. **Forma com propósito:** Campos, botões, cards e modais usam os raios definidos em tokens. A busca pode ser arredondada dentro de uma header reta: ela é um controle, não a moldura da aplicação.

---

## 2. Regras de Logotipo & Ativos de Marca

O logotipo Solide é composto pelo isotipo geométrico do **S** em chanfro estilizado e pelo wordmark institucional.

### Arquivos Vetoriais Oficiais
- Modo Claro: `solide-logo-light.svg` (aplicação sobre fundos brancos e cinzas claros)
- Modo Escuro: `solide-logo-dark.svg` (aplicação sobre fundos pretos e ardósia escura)
- Favicon & App Icon: `solide-favicon.svg`, `solide-favicon-dark.svg`, `solide-touch-icon.png`

### Regras de Uso
- **Área de Resguardo (Clearspace):** Distância mínima livre equivalente a $1\times$ a altura do isotipo em torno de todos os lados do logo.
- **Tamanho Mínimo de Aplicação:** 
  - Meios digitais: $24\text{px}$ de altura.
  - Meios impressos: $8\text{mm}$ de altura.
- **Usos Proibidos (Don'ts):**
  - Nunca distorcer as proporções horizontais ou verticais.
  - Nunca aplicar sombras coloridas, contornos neon ou gradientes arbitrários.
  - Nunca posicionar o logo claro sobre superfícies com contraste inferior a 4.5:1.

---

## 3. Arquitetura monocromática & contraste

A interface usa neutros quentes e sem tom azulado. Cores só aparecem como feedback funcional: sucesso, aviso, erro e ação primária.

| Papel | Claro | Escuro |
| :--- | :--- | :--- |
| Canvas | `#FFFFFF` | `#000000` |
| Shell | `#E9E9E6` | `#000000` |
| Conteúdo elevado | `#FFFFFF` | `#1C1C1E` |
| Hover de superfície | `#E0E0DD` | `#2A2A2C` |
| Texto primário | `#000000` | `#FFFFFF` |

O par de texto principal e canvas é validado automaticamente no teste de tokens: 19.80:1 no claro e 18.97:1 no escuro. Texto normal exige no mínimo 4.5:1; indicadores e componentes não textuais, 3:1.

### Consumo no Tailwind CSS
Via `@solide/tokens/preset` ou `./packages/tokens/build/tailwind.preset.js`:
- Superfícies: `bg-solide-canvas`, `bg-solide-surface`, `bg-solide-elevated`
- Textos: `text-solide-primary`, `text-solide-secondary`, `text-solide-muted`
- Bordas: `border-solide-subtle`, `border-solide-strong`
- Foco: `ring-solide-focus`
- Opacidades: `hover:bg-opacity-solide-hover`, `active:bg-opacity-solide-active`

---

## 4. Grid de Espaçamento Base-8 (Subgrid 4pt)

O ritmo vertical e horizontal das interfaces da Solide respeita a escala de potências de 4 e 8:

| Token | Valor em Pixels | Uso Principal |
| :--- | :---: | :--- |
| `--sld-space-1` | `4px` | Micro-espaçamentos, lacunas entre ícone e texto |
| `--sld-space-2` | `8px` | Padding interno de badges, gap entre elementos de formulário |
| `--sld-space-3` | `12px` | Padding horizontal de inputs e botões pequenos |
| `--sld-space-4` | `16px` | Espaçamento padrão de cards, padding de botões médios |
| `--sld-space-5` | `20px` | Padding de cards confortáveis e modais |
| `--sld-space-6` | `24px` | Separação entre blocos de conteúdo e seções |
| `--sld-space-8` | `32px` | Separação entre módulos principais |
| `--sld-space-10` | `40px` | Altura padrão de controles de entrada |
| `--sld-space-12` | `48px` | Altura de linha de tabela e alvos de toque móveis |
| `--sld-space-16` | `64px` | Margem externa de layouts de tela cheia |

---

## 5. Tipografia Oficial & O Mistério do "Zero com Pontinho"

### As 2 Famílias Oficiais
1. **Inter (Interface e títulos):** Aplicada em títulos, corpo da interface, labels, inputs, botões, tabelas e menus. Mantém a leitura consistente em densidades compactas e confortáveis.
2. **JetBrains Mono (Dados & código):** Aplicada em valores monetários, chaves de API, latências, hashes e colunas de tabelas com dados numéricos.

### O "Zero Pontilhado" (*Dotted Zero*)
Nas tabelas e métricas da Solide, é obrigatório o uso da classe `.tabular-nums`:
```css
.tabular-nums {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}
```
Na fonte *JetBrains Mono*, a ativação dos números tabulares mantém todos os dígitos com a mesma largura física exata (evitando que colunas de valores dancem na tela) e renderiza o número zero com um **ponto central distintivo**. Isso elimina qualquer ambiguidade entre o numeral `0` e a letra maiúscula `O`, protegendo operadores contra erros em transações financeiras e tokens de segurança.

---

## 6. Diretrizes de UX Writing & Microcopy

A linguagem da Solide reflete a mentalidade de engenharia: **precisa, concisa, transparente e focada em resolução imediata**.

### A. Mensagens de Erro
- **Incorreto (Genérico/IA):** *"Ops! Ocorreu um erro inesperado. Tente novamente mais tarde."*
- **Padrão Solide:** *"Falha na conexão com o cluster de inferência. Código: ERR_TIMEOUT_504. [Ver telemetria] [Tentar novamente]"*
- **Regra:** Sempre responda três perguntas:
  1. *O que aconteceu?*
  2. *Por que aconteceu?*
  3. *Qual é a ação corretiva que o usuário pode tomar agora?*

### B. Confirmação de Ações Destrutivas
- Toda ação irreversível (exclusão de nós, revogação de chaves) deve exigir atrito deliberado:
  - Título objetivo: *"Revogar Chave de API de Produção"*
  - Descrição de impacto: *"Todas as requisições autenticadas com este token serão rejeitadas imediatamente. Esta ação não pode ser desfeita."*
  - Rótulo de botão claro: *"Revogar Chave"* (nunca usar apenas *"OK"* ou *"Sim"*).

### C. Estados Vazios (Empty States)
- Nunca deixe o usuário em um beco sem saída.
- Todo estado vazio deve conter:
  1. Ilustração/ícone minimalista
  2. Título explicativo (*"Nenhum cluster ativo"* ou *"Nenhuma transação encontrada"*)
  3. Instrução de contexto (*"Ajuste os filtros de data ou inicie um novo provisionamento."*)
  4. Botão de ação primária direta (*"+ Novo Cluster"* ou *"Limpar Filtros"*).

---

## 7. Contratos de Acessibilidade & Teclado

1. **Restauração de Foco:** Ao fechar qualquer modal, drawer ou paleta de comandos (`Ctrl+K`), o foco do teclado DEVE ser devolvido imediatamente ao botão ou elemento que disparou a abertura.
2. **Focus Trap:** Diálogos e modais devem interceptar a tecla `Tab`, impedindo que o foco vaze para elementos inativos no fundo da página.
3. **Tecla ESC Universal:** Pressionar `Escape` deve encerrar o elemento de sobreposição aberto mais recente.
