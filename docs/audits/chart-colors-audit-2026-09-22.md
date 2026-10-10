# Auditoria de Cores e Contraste de Gráficos
**Data:** 22 de Setembro de 2026

## Descrição do Problema
Os gráficos exibidos no Design System apresentavam problemas de contraste em ambos os temas (claro e escuro). No tema escuro, as cores designadas eram muito escuras (ex: `warning-700`, `teal-700`), misturando-se com o fundo. Adicionalmente, na documentação `solide-brand-guide.html`, os gráficos estavam utilizando variáveis genéricas do sistema (como `--text-primary`, `--solide-success` e `--color-hover-light`) ao invés das variáveis semânticas exclusivas para dados quantitativos (`--sld-chart-*`).

## Alterações Realizadas

### 1. Atualização dos Design Tokens (`solide-tokens.css`)
As variáveis de gráficos (`--sld-chart-1` a `--sld-chart-5`) foram recalibradas utilizando estritamente a paleta de cores existente do **Solide Design System** para garantir alto contraste:
- **Tema Claro:** Padronização das cores para o grau `-500` (ex: `danger-500`, `teal-500`, `cobalt-500`, `success-500`).
- **Tema Escuro:** Padronização das cores para o grau `-400` (ex: `warning-400`, `teal-400`, `success-400`), oferecendo a luminosidade necessária contra fundos dark (`warm-950` / `warm-850`).
*Nota: As atualizações foram validadas pelo pipeline de build local e refletidas automaticamente em `packages/tokens/src/semantic.tokens.json`.*

### 2. Padronização da Documentação (`solide-brand-guide.html`)
Foram removidas as cores hardcoded e aplicados os tokens semânticos `--sld-chart-*` em todos os componentes de gráficos avançados, ativando suporte automático aos temas:
- **Gráfico Spline (Tempo de Resposta Global):** Traçado (stroke), gradiente translúcido de área e *scrub dot* interativo migrados de `--text-primary` para `--sld-chart-4`.
- **Gráfico Spring Bar (Throughput Horário):** Barras primárias e secundárias migradas de `--text-primary` / `--color-hover-light` para `--sld-chart-4` e `--sld-chart-3`. Blocos de CSS redundantes contendo `[data-theme="dark"]` com cor fixa foram removidos para delegar a inversão de tema ao CSS variable nativo.
- **Gráfico Donut (Distribuição de Status de Contratos):** Atributos `stroke` do SVG e indicativos da legenda migrados de `--text-primary`, `--solide-success`, `--solide-warning` e `--solide-error` para a escala analítica `--sld-chart-4`, `--sld-chart-5`, `--sld-chart-1` e `--sld-chart-2`.

## Validação e Conformidade
As regras do arquivo `AGENTS.md` foram rigorosamente seguidas:
- Apenas as paletas oficiais exportadas foram utilizadas (nenhuma cor arbitrária injetada).
- Todos os testes sistêmicos passaram localmente (`npm run build`, `npm run typecheck` e `npm run test:tokens`).
