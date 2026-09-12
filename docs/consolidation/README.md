# Consolidação do Solide Design System

## Decisões

- `solide-tokens.css` é a fonte técnica canônica. O Brand Guide consome esse arquivo; o pacote `@solide/tokens`, os JSONs derivados e o tema nativo são gerados a partir dele.
- A escala nova usa o namespace `--sld-palette-warm-*`, com números crescentes do claro para o escuro. Os neutros legados preservam os valores históricos para impedir inversão silenciosa de luminosidade.
- `--sld-brand-accent` representa a identidade cobalto. Ações usam `--sld-action-*`; componentes não usam diretamente a cor de marca.
- Status possuem papéis separados para fundo sutil, borda, texto, ícone, fundo sólido, conteúdo sobre sólido e hover.
- Tipografia por papéis, spacing, radius, shadow, motion, iconografia e geometria desktop foram preservados.
- O App Shell móvel agora usa drawer modal nativo abaixo de 1024 px, fecha com Escape e restaura o foco. O conteúdo usa 16 px de padding e tabelas preservam rolagem horizontal.

## Compatibilidade

Aliases `--solide-*`, `--bg-*`, `--text-*` e `--border-*` continuam disponíveis. São compatibilidade temporária para o Brand Guide e consumidores existentes. Código novo deve usar `--sld-*` semântico.

| Uso legado | Substituição recomendada | Remoção |
| --- | --- | --- |
| `--color-accent` / `--solide-accent` em botões | `--sld-action-primary-*` | após os consumidores externos migrarem |
| `--solide-feedback-*` como texto/fundo indistinto | `--sld-status-<tone>-<role>` | após os consumidores externos migrarem |
| `--bg-*`, `--text-*`, `--border-*` | papéis `--sld-surface-*`, `--sld-text-*`, `--sld-border-*` | após o CSS histórico do guia ser reduzido |
| primitivos `--solide-neutral-*` | tokens semânticos; `--sld-palette-warm-*` apenas na camada de tokens | sem prazo até inventário dos consumidores externos |

## Validação

- `contrast.json`: pares semânticos efetivamente calculados; não constitui certificação global WCAG.
- `audit.json`: inventário reproduzível de arquivos, componentes, referências e literais.
- `screenshots/` (gerado localmente e ignorado no Git): light/dark em 1440 px e 390 px para UI Kit, além do Brand Guide.
- `npm run test:ui`: interação de Button, Tabs, DataTable, SearchBar, tema e drawer móvel.
