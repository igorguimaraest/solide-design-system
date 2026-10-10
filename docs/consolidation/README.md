# Consolidação do Solide Design System

## Decisões

- `solide-tokens.css` é a fonte técnica canônica. O Brand Guide consome esse arquivo; o pacote `@solide/tokens`, os JSONs derivados e o tema nativo são gerados a partir dele.
- A escala de neutros usa o namespace `--sld-palette-neutral-*` (era `--sld-palette-warm-*` até 2026-10-10, quando passou a cinza frio sutil), com números crescentes do claro para o escuro. Os neutros legados preservam os valores históricos para impedir inversão silenciosa de luminosidade.
- `--sld-brand-accent` representa a identidade cobalto. Ações usam `--sld-action-*`; componentes não usam diretamente a cor de marca.
- Status possuem papéis separados para fundo sutil, borda, texto, ícone, fundo sólido, conteúdo sobre sólido e hover.
- Tipografia por papéis, spacing, radius, shadow, motion, iconografia e geometria desktop foram preservados.
- O App Shell móvel agora usa drawer modal nativo abaixo de 1024 px, fecha com Escape e restaura o foco. O conteúdo usa 16 px de padding e tabelas preservam rolagem horizontal.

## Compatibilidade

Em 2026-10-10 os 103 apelidos legados que apenas repetiam um token `--sld-*` (`--solide-*`, `--bg-*`, `--surface-*`, `--text-*` de cor, `--border-*`, `--color-*`, `--app-*`, `--nav-*`, `--r-*`, `--shadow-*`, `--motion-*`) foram removidos. Guia, UI Kit e preset Tailwind passaram a usar diretamente o nome `--sld-*`; não havia consumidores externos. Cada valor tem agora um nome só.

Ainda restam, por terem valores próprios (unificá-los mudaria cores na tela):

| Legado | Situação |
| --- | --- |
| primitivos `--solide-neutral-*` e `--sld-color-neutral-*` | escalas paralelas à `--sld-palette-neutral-*`; unificar exige decisão visual |
| tipografia `--text-*`, `--lh-*`, `--tracking-*`, `--weight-*`, `--font-*` | nome único do valor; não são apelidos |

## Validação

- `contrast.json`: pares semânticos efetivamente calculados; não constitui certificação global WCAG.
- `audit.json`: inventário reproduzível de arquivos, componentes, referências e literais.
- `screenshots/` (gerado localmente e ignorado no Git): light/dark em 1440 px e 390 px para UI Kit, além do Brand Guide.
- `npm run test:ui`: interação de Button, Tabs, DataTable, SearchBar, tema e drawer móvel.
