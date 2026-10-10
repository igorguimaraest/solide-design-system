# SOLIDE — resumo para quem vai construir uma tela

Leitura padrão. Cobre o necessário para 90% das interfaces. Os valores vêm de
`solide-tokens.css` (fonte única). Consulte o `solide-brand-guide.html` (vitrine,
~600 KB) só quando precisar ver um padrão montado — e leia só a seção dele.

## Como usar

- Importe `@solide/tokens` ou copie `solide-tokens.css` inteiro.
- Use sempre o nome `--sld-*` de **papel** (superfície, texto, borda, ação,
  status). A paleta crua (`--sld-palette-*`) é só para a camada de tokens.
- Tema: `data-theme="light"` ou `"dark"` no `<html>`. Os papéis trocam sozinhos.
- React: componentes em `packages/ui-kit`. Ícones: `icons/` (SVG).

## Cores (papéis)

| Papel | Token | Claro | Escuro |
| --- | --- | --- | --- |
| Fundo da moldura (header, sidebar) | `--sld-surface-shell` | `#E4E6EA` | `#111112` |
| Fundo da página | `--sld-surface-canvas` | `#F8F9FA` | `#18191A` |
| Cartão / área de trabalho | `--sld-surface-card` | `#FFFFFF` | `#222224` |
| Fundo rebaixado / hover leve | `--sld-surface-sunken` | `#EEF0F3` | `#18191A` |
| Hover | `--sld-surface-hover` | `#D7DBDF` | `#36383A` |
| Texto principal | `--sld-text-primary` | `#222224` | `#F8F9FA` |
| Texto secundário | `--sld-text-secondary` | `#636669` | `#BCC0C5` |
| Borda padrão | `--sld-border-default` | `#D7DBDF` | `#36383A` |
| Borda forte (campos) | `--sld-border-strong` | `#6E7175` | `#84888C` |
| Ação principal (botão) | `--sld-action-primary-bg` / `-hover` / `-text` | `#1D63D6` | `#5C9EFF` |
| Foco | `--sld-action-focusRing` | `#154FAF` | `#5C9EFF` |
| Seleção | `--sld-selection-bg` / `-text` / `-border` | azul claro | azul escuro |
| Perigo (botão) | `--sld-action-danger-bg` | `#A92F27` | `#EE6E62` |
| Desabilitado | `--sld-disabled-bg` / `-fg` | | |

Status — cada tom tem `-bg`, `-border`, `-text`, `-icon`, `-solid`, `-on-solid`, `-hover`:
`--sld-status-success-*` (verde), `--sld-status-warning-*` (âmbar),
`--sld-status-danger-*` (vermelho), `--sld-status-info-*` (azul),
`--sld-status-neutral-*` (cinza). Gráficos: `--sld-chart-1` … `--sld-chart-5`.

Neutros: cinza frio sutil (`--sld-palette-neutral-0…950`). Azul de marca: cobalto
(`--sld-palette-cobalt-*`, base `#2D7CF6`).

## Tipografia

Fonte: Inter (`--sld-font-ui`); números e código: JetBrains Mono (`--sld-font-mono`).

| Uso | Tamanho / linha | Peso | Token |
| --- | --- | --- | --- |
| Título grande | 34 / 41 (28 / 34 no celular) | 700 | `--text-large-title` |
| Título 1 | 28 / 34 (22 / 28 no celular) | 700 | `--text-title1` |
| Título 2 | 22 / 28 (20 / 25 no celular) | 600 | `--text-title2` |
| Destaque | 17 / 22 | 600 | `--text-headline` |
| Texto corrido | 17 / 24 | 400 | `--text-body` |
| Texto de interface | 14 / 20 | 400 | `--text-body-ui` |
| Nota / dados de tabela | 13 / 18 | 500 | `--text-footnote` / `--text-dados` |
| Rótulo (caixa alta) | 11 / 14, +0,06em | 700 | `--text-caption` |

Cada tamanho tem `--lh-*`, `--tracking-*` e `--weight-*` correspondentes.

## Espaço, forma, sombra, movimento

- **Espaço** (base 4 px): `--sld-space-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 20 ·
  `-6` 24 · `-8` 32 · `-10` 40 · `-12` 48 · `-16` 64 · `-20` 80.
- **Raio**: `--sld-radius-sm` 4 · `-md` 8 (botões, campos) · `-lg` 12 (cartões,
  tabelas) · `-xl` 16 (modais) · `-full` (pílulas, badges).
- **Sombra**: `--sld-shadow-xs` … `-xl` (já incluem um contorno de 1 px).
- **Alturas**: botão e campo 32 / 40 / 48 (`--sld-btn-h-*`, `--sld-input-h-*`);
  linha de tabela 48; header 56; sidebar 256 (compacta 68); toque mínimo 44.
- **Movimento**: `--sld-durationFast` 100 ms · `-Base` 180 ms · `-Slow` 300 ms;
  curva `--sld-easingSnappy`. Respeite `prefers-reduced-motion`.

## 10 regras

1. Só tokens. Nada de hex, rgb ou px soltos quando existe token.
2. Use o papel, não a paleta: `--sld-text-secondary`, não `--sld-palette-neutral-600`.
3. Azul é ação, seleção e foco. Não é decoração de fundo.
4. Cor de status indica estado e vem sempre com texto ou ícone — nunca só a cor.
5. Estrutura de tela: moldura `shell` (header + sidebar) envolvendo a área de
   trabalho em `card`. Ver padrão `screen-app-shell` no guia.
6. Uma ação principal por área. As demais são secundárias ou ghost.
7. Todo componente cobre: hover, foco visível, desabilitado, carregando, vazio e erro.
8. Funciona em claro e escuro, desktop e celular (a partir de 390 px, sem
   rolagem horizontal fora de tabelas).
9. Contraste mínimo AA: 4,5:1 para texto, 3:1 para ícones e bordas de controle.
10. **Faltou algo? Use o token mais próximo, avise em uma linha e registre em
    `STATUS.md › Lacunas`** (data, projeto, o que faltou, qual token usou).
    Não pare o trabalho por isso.
