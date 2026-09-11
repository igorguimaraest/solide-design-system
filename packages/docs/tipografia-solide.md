# Tipografia Solide

## Propósito

A tipografia do Solide usa duas famílias com papéis claros:

- **Inter** conduz a interface, leitura e controles operacionais.
- **JetBrains Mono** identifica dados, códigos, métricas e valores que exigem precisão visual e alinhamento tabular absoluto.

A separação ajuda o operador a reconhecer imediatamente o que é conteúdo, ação, navegação ou dado operacional.

---

## Famílias Tipográficas

### Inter

Inter é a fonte padrão da interface. Projetada para telas de computador e dispositivos de alta densidade, possui excelente legibilidade em corpos pequenos e médios. Use-a em tudo que a pessoa lê, navega ou aciona:

- Títulos de página e seção;
- Textos corridos e documentação;
- Rótulos de campos (*labels*) e placeholders;
- Botões, chips e links;
- Menus, abas e navegação lateral;
- Mensagens de erro, alerta e confirmação;
- Cabeçalhos de tabelas e conteúdo de texto;
- Descrições, ajuda contextual e estados vazios.

### JetBrains Mono

JetBrains Mono é a fonte técnica para dados, código e conteúdo telemetria. Criada para operadores de sistemas críticos, possui distinção absoluta entre o zero cortado com ponto central (`0`), a letra `O`, o número `1` e a letra `l`. Use-a em:

- Valores monetários (`R$`);
- Métricas, percentuais e taxas de SLA;
- Quantidades e saldos de inventário;
- Identificadores (`ID`, `UUID`);
- Códigos de documento fiscal (`CNPJ`, `CPF`, chaves NFe);
- Datas e horários técnicos;
- Números de versão e builds;
- Logs e rastreamento;
- Trechos de código e comandos de terminal;
- Chaves de API, hashes SHA-256 e referências criptográficas.

> **Regra**: Não use JetBrains Mono em títulos, textos corridos, botões, navegação ou mensagens de interface.

---

## Escala Tipográfica Oficial (Papéis Semânticos)

A escala é organizada por **papéis semânticos**, combinando entrelinhas (*leading*) fixas e calibração de tracking óptico:

| Papel | Fonte | Tamanho | Entrelinha | Peso | Tracking | Uso Oficial |
|---|---|---:|---:|---:|---:|---|
| **Large Title** | Inter | 34px | 41px | 700 | -0.02em | Título principal de tela, capas e aberturas |
| **Title 1** | Inter | 28px | 34px | 700 | -0.02em | Título principal de página e módulos |
| **Title 2** | Inter | 22px | 28px | 600 | -0.01em | Seções importantes ou título de card principal |
| **Headline** | Inter | 17px | 22px | 600 | -0.01em | Título de item, ênfase ou ação primária |
| **Body (Leitura)** | Inter | 17px | 24px | 400 | -0.01em | Texto principal, leitura contínua e artigos |
| **Body UI (Operacional)** | Inter | 14px | 20px | 400/500 | 0em | Formulários, inputs, diálogos e linhas de tabela padrão |
| **Footnote** | Inter | 13px | 18px | 400/500 | +0.01em | Sidebar, abas, metadados, ajuda e descrições |
| **Caption / Micro** | Inter | 11px | 14px | 700 | +0.06em | Cabeçalhos de tabela (`<th>`), badges de status, chips (Caixa Alta) |
| **Dados** | JetBrains Mono | 12px ou 13px *(ou herdado)* | Conforme o contexto | 400 ou 500 | 0em | Valores monetários, IDs, métricas com `tabular-nums` |

### Adaptação para Telas Compactas (Mobile / Painéis Estreitos)

Em telas compactas, **apenas os títulos diminuem**, preservando rigorosamente o tamanho do corpo e metadados para garantir legibilidade:

| Papel | Tamanho Padrão | Tamanho Compacto | Entrelinha Compacta |
|---|---:|---:|---:|
| **Large Title** | 34px | 28px | 34px |
| **Title 1** | 28px | 22px | 28px |
| **Title 2** | 22px | 20px | 25px |

*Body*, *Body UI*, *Footnote*, *Caption* e *Dados* mantêm seus tamanhos originais.

---

## Estrutura de Uso Prática

### 1. Página
```text
Inter / Large Title (34px • 700)
Projetos da equipe

Inter / Body (17px • 400)
Acompanhe os projetos, responsáveis e o andamento das atividades em tempo real.
```

### 2. Seção
```text
Inter / Title 2 (22px • 600)
Projetos recentes
```

### 3. Card de Métrica Operacional
```text
Inter / Footnote (13px • 500)
Faturamento no período

JetBrains Mono / Dados (22px • 600 • tabular-nums)
R$ 128.450,00

Inter / Caption (11px • 700 • +0.06em • uppercase)
+14.8% VS MÊS ANTERIOR
```

### 4. Tabela Operacional (Alta Densidade)
```text
Inter / Caption (11px • 700 • uppercase)
EMPRESA / PROJETO

Inter / Body UI (14px • 500)
Distribuidora Minas Express Ltda

JetBrains Mono / Dados (12px • 400)
PRJ-2026-018

Inter / Caption (11px • 600)
Em análise

JetBrains Mono / Dados (12px • 400)
09/09/2026 · 14:32
```

### 5. Alerta de Sistema
```text
Inter / Headline (17px • 600)
Certificado digital A1 expirando

Inter / Footnote (13px • 400)
O certificado vence em 5 dias. Atualize para evitar interrupções fiscais.
```

---

## Matriz de Pesos Oficiais

| Peso | Denominação | Uso Mandatório no Ecossistema |
|---:|:---|:---|
| **400** | Regular | Corpo de texto, descrições, parágrafos, ajuda e dados comuns |
| **500** | Medium | Dados mono em destaque, itens de menu, navegação e ênfase moderada |
| **600** | SemiBold | Headlines, títulos de seção (Title 2), ações principais e abas ativas |
| **700** | Bold | Large Title, Title 1 e Badges/Chips em caixa alta |

> **Diretriz**: Use pesos para criar hierarquia intencional. Evite misturar mais de 2 pesos no mesmo componente.

---

## Regras de Aplicação

1. **Inter é a fonte padrão da interface**: Todo elemento textual que não seja dado numérico ou código deve usar Inter.
2. **JetBrains Mono é estrita para dados e telemetria**: Aparece exclusivamente em moedas, métricas, códigos fiscais, hashes e identificadores.
3. **Herança contextual de tamanho**: Valores monetários, percentuais e IDs podem herdar o tamanho do container (ex: 28px num hero de métrica), mantendo a família JetBrains Mono e números tabulares.
4. **Alinhamento Tabular Obrigatório (`tabular-nums`)**: Todas as exibições numéricas com JetBrains Mono ou Inter monetária devem ativar `font-variant-numeric: tabular-nums`.
5. **Não crie tamanhos soltos**: Use sempre um papel tipográfico definido na escala oficial.
6. **Não use texto pequeno para informação essencial**: Rótulos e valores críticos nunca devem ficar abaixo de 11px.
7. **Preserve a entrelinha de cada papel**: Nunca reduza a entrelinha (`line-height`) para espremer texto verticalmente; isso compromete acentuações da língua portuguesa.
8. **Contraste e sobriedade**: Garanta contraste mínimo WCAG AAA (7:1) em textos principais e 4.5:1 em metadados. Não use JetBrains Mono puramente como efeito decorativo.

---

## Tokens de Design (CSS Variables)

```css
:root {
  /* Famílias Oficiais */
  --font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Papéis Semânticos: Tamanhos */
  --text-large-title: 34px;
  --lh-large-title: 41px;
  --tracking-large-title: -0.02em;
  --weight-large-title: 700;

  --text-title1: 28px;
  --lh-title1: 34px;
  --tracking-title1: -0.02em;
  --weight-title1: 700;

  --text-title2: 22px;
  --lh-title2: 28px;
  --tracking-title2: -0.01em;
  --weight-title2: 600;

  --text-headline: 17px;
  --lh-headline: 22px;
  --tracking-headline: -0.01em;
  --weight-headline: 600;

  --text-body: 17px;
  --lh-body: 24px;
  --tracking-body: -0.01em;
  --weight-body: 400;

  --text-body-ui: 14px;
  --lh-body-ui: 20px;
  --tracking-body-ui: 0em;
  --weight-body-ui: 400;

  --text-footnote: 13px;
  --lh-footnote: 18px;
  --tracking-footnote: 0.01em;
  --weight-footnote: 400;

  --text-caption: 11px;
  --lh-caption: 14px;
  --tracking-caption: 0.06em;
  --weight-caption: 700;

  --text-dados: 13px;
  --lh-dados: 18px;
  --weight-dados: 500;
}

/* Utilitário Numérico Mandatório */
.tabular-nums, .dados-mono {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
}
```

---

## Checklist de Conformidade Tipográfica

- [ ] **Inter** foi usada em toda a interface, navegação e leitura?
- [ ] **JetBrains Mono** aparece estritamente em dados, códigos, identificadores e valores?
- [ ] Cada elemento textual utiliza um **papel tipográfico definido** na escala (sem tamanhos soltos)?
- [ ] O recurso **tabular-nums** foi ativado em colunas financeiras e numéricas?
- [ ] Há **hierarquia clara** de pesos e contrastes entre títulos, corpo e metadados?
- [ ] A tela continua perfeitamente **legível em dispositivos menores** com a adaptação de títulos?
