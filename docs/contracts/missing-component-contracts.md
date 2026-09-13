# Fase B — contratos de componentes ausentes

Status: contratos de VC-02 aprovados e implementados; Alert/Banner continua pendente de VC-01.

## Fonte e limites

- Referência visual: `solide-brand-guide.html` — ThemeToggle (linhas 735–869 e 5220–5228), controles de seleção (2489–2751 e 6814–6921) e Alert/Banner (1498–1538 e 7329–7377).
- A fonte canônica de tokens é `solide-tokens.css`.
- VC-02 foi decidida e implementada em 2026-09-13: `checked`, `indeterminate` e `on` usam accent semântico de seleção por meio da família própria `--sld-control-selected-*`, sem reutilizar `action-primary`.
- A ação de warning permanece aberta (VC-01). O contrato não prescreve preenchimento para a ação.

## Contrato cromático proposto para VC-02

Status: **aprovado e implementado em VC-02; validação visual automatizada pendente por ausência do Chromium no ambiente**.

| Token semântico proposto | Light | Dark | Responsabilidade |
| --- | --- | --- | --- |
| `--sld-control-selected-bg` | `--sld-palette-cobalt-600` (`#1D63D6`) | `--sld-palette-cobalt-400` (`#5C9EFF`) | Preenchimento de Checkbox `checked/indeterminate`, Radio `checked` e track de Switch `on`. |
| `--sld-control-selected-border` | `--sld-palette-cobalt-600` (`#1D63D6`) | `--sld-palette-cobalt-400` (`#5C9EFF`) | Contorno do controle selecionado; separado de `bg` para permitir evolução sem quebrar consumidores. |
| `--sld-control-selected-fg` | `--sld-palette-warm-0` (`#FFFFFF`) | `--sld-palette-warm-950` (`#121110`) | Check, barra de indeterminate, ponto do Radio e thumb do Switch quando aplicável. |
| `--sld-control-selected-hover-bg` | `--sld-palette-cobalt-700` (`#154FAF`) | `--sld-palette-cobalt-300` (`#93BFFF`) | Hover do controle já selecionado, somente com cursor fino. |
| `--sld-control-selected-active-bg` | `--sld-palette-cobalt-800` (`#123F87`) | `--sld-palette-cobalt-500` (`#2D7CF6`) | Feedback de pressionamento do controle já selecionado. |

O mapeamento cromático coincide inicialmente com parte da escala usada por ações primárias, mas os papéis não são aliases entre si. Componentes de seleção consumirão apenas `--sld-control-selected-*`; alterações futuras em botões não poderão mudar controles por efeito colateral.

`--sld-control-selected-border` permanece separado mesmo quando coincide com `selected-bg` em Checkbox e Radio preenchidos. Essa separação é intencional: borda e preenchimento podem divergir futuramente em outros controles ou estados sem mudança de API. No Switch, `--sld-control-selected-fg` é restrito ao thumb ou a eventual ícone interno; label e descrição continuam usando os tokens tipográficos normais e nunca herdam `selected-fg`.

### Contraste calculado do glifo

| Estado | Light | Dark |
| --- | ---: | ---: |
| Selected | 5,51:1 | 7,00:1 |
| Hover selected | 7,58:1 | 10,00:1 |
| Active selected | 10,06:1 | 4,78:1 |

Todos os pares superam 4,5:1. Isso é margem adicional para o glifo pequeno, não declaração de conformidade global do componente. Foco continua usando `--sld-action-focusRing` conforme o contrato transversal atual; disabled continua usando os tokens globais de disabled e não recebe uma variante accent própria.

## ThemeToggle

Responsabilidade: alternar exclusivamente entre `light` e `dark`; não controla temas legados `black` ou `blueprint` no UI Kit.

```ts
type ThemeMode = 'light' | 'dark';
type ThemeToggleProps = {
  value: ThemeMode;
  onValueChange: (value: ThemeMode) => void;
  disabled?: boolean;
  'aria-label'?: string;
};
```

Estados obrigatórios: light, dark, hover em cursor fino, focus-visible, disabled e motion-reduce. Semântica obrigatória: elemento `button`, `role="switch"` e `aria-checked` coerente com `value === 'dark'`. A implementação deverá reproduzir track, thumb e ícones documentados, inclusive legibilidade sem interação no dark.

## Checkbox

Responsabilidade: seleção múltipla independente, inclusive seleção parcial controlada.

```ts
type CheckboxProps = {
  checked: boolean;
  indeterminate?: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
};
```

Estados obrigatórios: unchecked, checked, indeterminate, hover em cursor fino, focus-visible, disabled e motion-reduce. `indeterminate` é propriedade imperativa do input nativo e não substitui `checked`. A semântica é `input[type=checkbox]`; rótulo e descrição precisam associar-se ao controle. `checked` e `indeterminate` usam accent semântico de seleção com glifo de foreground explícito.

## Radio

Responsabilidade: escolha exclusiva dentro de um grupo.

```ts
type RadioGroupProps<T extends string> = {
  value: T;
  onValueChange: (value: T) => void;
  disabled?: boolean;
  children: React.ReactNode;
};
type RadioProps<T extends string> = {
  value: T;
  disabled?: boolean;
  label: React.ReactNode;
  description?: React.ReactNode;
};
```

Estados obrigatórios: unchecked, checked, hover em cursor fino, focus-visible, disabled e motion-reduce. A implementação preserva `input[type=radio]`, nome compartilhado e navegação por teclado nativa.

O estado `checked` usa accent semântico de seleção; o ponto interno continua sendo indicador estrutural obrigatório e recebe foreground explícito.

## Switch

Responsabilidade: ligar/desligar uma preferência que produz efeito imediato; não representa seleção em lote.

```ts
type SwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'default' | 'compact';
  label?: React.ReactNode;
  description?: React.ReactNode;
};
```

Estados obrigatórios: off, on, hover em cursor fino, focus-visible, disabled e motion-reduce. Semântica: `input[type=checkbox]` com apresentação de switch e rótulo associado. Os tamanhos somente poderão reproduzir as variantes já demonstradas no Guide.

O estado `on` usa accent semântico de seleção. A posição do thumb continua sendo o indicador estrutural primário, portanto a cor não pode ser o único sinal de estado.

## Alert/Banner

Responsabilidade: comunicar estado persistente e contextual dentro de uma página. Não substitui Toast, que é transitório.

```ts
type AlertTone = 'success' | 'warning' | 'danger' | 'info';
type AlertProps = {
  tone: AlertTone;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
};
```

Estados obrigatórios: quatro tons, ação opcional, dismissível quando houver `onDismiss`, focus-visible da ação/fechamento, tema claro/escuro e motion-reduce. O ícone é semântico ao tom; título e descrição são texto, não cor isolada. `warning` com ação é bloqueado para decisão visual da Fase C, pois o exemplo atual usa style inline fora do token solid/on-solid.

## Critérios de aceite antes da implementação

1. Contrato `--sld-control-selected-*` aprovado e adicionado a `solide-tokens.css`.
2. Aprovar a composição e contraste da ação warning.
3. Criar stories para cada estado obrigatório e combinações light/dark.
4. Comparar visualmente Guide, Storybook e preview em 1440 e 390 px.
5. Não criar token, raio, espaçamento, shadow ou duração novos sem atualizar a fonte normativa primeiro.
