# VC-17 — inventário inicial de valores legados

Levantamento em 2026-09-21, sem alteração visual ou criação de tokens. O
inventário é uma triagem, não uma autorização para substituição mecânica.

## Brand Guide

- 1.427 atributos `style` inline e 2.030 declarações dimensionais numéricas
  encontradas no HTML. Essas contagens incluem demonstrações, documentação e
  exemplos; não equivalem a 2.030 violações independentes.
- Nove hexadecimais distintos fora da folha de tokens: cinco aparecem apenas
  em texto/comentários explicativos (`#E2E4E8`, `#1D1D1F`, `#ffffff`,
  `#262629`, `#F5F5F7`); quatro pertencem ao SVG multicolorido da marca
  Google (`#4285F4`, `#34A853`, `#FBBC05`, `#EA4335`). Nenhum deve ser
  convertido automaticamente em cor Solide.
- O guia ainda contém medidas e transições inline em exemplos interativos.
  Cada ocorrência precisa ser vinculada a um papel de token existente ou
  receber decisão normativa antes de migrar.

## UI Kit

O auditor atual não encontrou cores hex/RGB hardcoded nos 24 componentes
contabilizados. Encontrou dimensões arbitrárias em 11 arquivos:

| Componente | Valores identificados |
| --- | --- |
| Badge | `11px`, `12px` |
| Button | `28px`, `32px`, `40px`, `44px` |
| Checkbox, Radio e Switch | `11.5px`, `13px` |
| FormField | `11px` |
| SearchBar | `10px` |
| SegmentedTabs | `2px`, `3px`, `10px` |
| DataTable | `640px` |
| Header | `10px` |
| Sidebar | `3px`, `10px`, `11px` |

Esses valores exigem classificação por categoria e comparação com o Brand
Guide. O contrato atual não fornece, por exemplo, um papel aprovado para a
largura mínima de `640px` da tabela nem mapeamentos explícitos para todas as
microdimensões. Conforme `AGENTS.md`, não se deve aproximar ou criar tokens
plausíveis. A remediação visual da VC-17 permanece pendente de definição
normativa desses papéis.
