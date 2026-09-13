# Fase B — contratos de componentes ausentes

Status: proposta documental para aprovação. Não autoriza implementação visual, token novo ou alteração do Brand Guide.

## Fonte e limites

- Referência visual: `solide-brand-guide.html` — ThemeToggle (linhas 735–869 e 5220–5228), controles de seleção (2489–2751 e 6814–6921) e Alert/Banner (1498–1538 e 7329–7377).
- Tokens permitidos são apenas os existentes em `solide-tokens.css`.
- A decisão semântica de checkbox neutro versus accent permanece aberta (VC-02). Nenhuma API abaixo fixa essa cor.
- A ação de warning permanece aberta (VC-01). O contrato não prescreve preenchimento para a ação.

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

Estados obrigatórios: unchecked, checked, indeterminate, hover em cursor fino, focus-visible, disabled e motion-reduce. `indeterminate` é propriedade imperativa do input nativo e não substitui `checked`. A semântica é `input[type=checkbox]`; rótulo e descrição precisam associar-se ao controle. A escolha de cor de checked será definida na Fase C.

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

1. Aprovar a cor semântica de checkbox/radio/switch selecionados.
2. Aprovar a composição e contraste da ação warning.
3. Criar stories para cada estado obrigatório e combinações light/dark.
4. Comparar visualmente Guide, Storybook e preview em 1440 e 390 px.
5. Não criar token, raio, espaçamento, shadow ou duração novos sem atualizar a fonte normativa primeiro.