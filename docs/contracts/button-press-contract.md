# Contrato de Física e Movimento: Button Press (VC-09A)

## Autoridade e Precedência
Este documento consolida o comportamento oficial de clique/pressão para botões e elementos acionáveis no Solide Design System. O CSS canônico (`solide-tokens.css`) é a fonte primária da verdade.

## Contradição Encontrada
O arquivo legado `solide-brand-guide.html` continha duas diretrizes contraditórias para o estado pressionado:
1. Uma regra CSS legada `.btn:active` que aplicava `transform: scale(0.98)`.
2. Um exemplo genérico na seção de motion descrevendo um `whileTap` global com `scale: 0.97` e `opacity: 0.65`.

## Decisão Aprovada
- **Scale**: Fixado em `0.97` para feedback tátil/mouse adequado (substituindo o antigo 0.98).
- **Mola (Spring)**: O comportamento utilizará o preset `spring.snappy` (Stiffness 400, Damping 28).
- **Opacidade rejeitada no Button inteiro**: O uso de `opacity: 0.65` no contêiner do botão foi **expressamente rejeitado** porque reduz drasticamente o contraste do texto contra o fundo, quebrando os critérios de acessibilidade.
- **Cor `active`**: As cores semânticas do estado `active` (ex: `--sld-action-primary-active`) já embutidas no sistema continuam atuando como o feedback cromático de pressão, não exigindo opacidade.

## Prova de Contraste (Evidência da Rejeição de Opacidade)
Os cálculos a seguir avaliam o impacto da aplicação arbitrária de `opacity: 0.65` no estado pressionado, misturando o foreground e o background ativo com opacidade 0.65 sobre as superfícies da página (`surface-card` e `surface-shell`).

As análises utilizam exclusivamente as cores **ACTIVE** (do estado pressionado) do Design System, e **não** as cores de repouso (default):
- `--sld-action-primary-active`
- `--sld-action-secondary-active`
- `--sld-action-danger-active`
- `--sld-action-warning-active`
- `--sld-action-ghost-active`

combinadas com seus respectivos foregrounds correspondentes.

| Variante | Tema | Fundo | Active (Normal) | Com Opacity (0.65) | Falha WCAG AA (< 4.5:1)? |
| --- | --- | --- | --- | --- | --- |
| primary | light | card | 10.06:1 | 3.90:1 | ❌ |
| primary | light | shell | 10.06:1 | 4.10:1 | ❌ |
| primary | dark | card | 4.78:1 | 2.77:1 | ❌ |
| primary | dark | shell | 4.78:1 | 2.68:1 | ❌ |
| secondary | light | card | 11.36:1 | 4.05:1 | ❌ |
| secondary | light | shell | 11.36:1 | 4.21:1 | ❌ |
| secondary | dark | card | 11.24:1 | 5.94:1 | ✅ |
| secondary | dark | shell | 11.24:1 | 6.02:1 | ✅ |
| danger | light | card | 11.21:1 | 4.28:1 | ❌ |
| danger | light | shell | 11.21:1 | 4.44:1 | ❌ |
| danger | dark | card | 5.43:1 | 3.01:1 | ❌ |
| danger | dark | shell | 5.43:1 | 2.92:1 | ❌ |
| warning | light | card | 6.93:1 | 3.12:1 | ❌ |
| warning | light | shell | 6.93:1 | 3.25:1 | ❌ |
| warning | dark | card | 8.88:1 | 4.48:1 | ❌ |
| warning | dark | shell | 8.88:1 | 4.35:1 | ❌ |
| ghost | light | card | 11.36:1 | 4.05:1 | ❌ |
| ghost | light | shell | 11.36:1 | 4.21:1 | ❌ |
| ghost | dark | card | 11.24:1 | 5.94:1 | ✅ |
| ghost | dark | shell | 11.24:1 | 6.02:1 | ✅ |

*Nota: Todas as variantes em seu estado ACTIVE canônico cumprem o critério de acessibilidade WCAG AA (≥ 4.5:1). A adição arbitrária de `opacity: 0.65` degrada severamente o contraste, quebrando a conformidade WCAG AA em 16 das 20 combinações testadas (apenas Secondary e Ghost em modo escuro permanecem acima de 4.5:1, em ~5.94–6.02:1). Isso comprova a necessidade técnica da rejeição da opacidade.*

## Tokens e Exportação (`@solide/tokens/motion`)
Os seguintes tokens foram adicionados ao contrato canônico:
- `--sld-button-press-scale: 0.97;`
- `--sld-spring-snappy-stiffness: 400;`
- `--sld-spring-snappy-damping: 28;`

Esses tokens geram de forma determinística o arquivo TypeScript `packages/tokens/src/motion.ts`, que pode ser consumido pelas aplicações React importando `@solide/tokens/motion`.

## Estados
- **Mouse / Touch**: Disparam simultaneamente o scale 0.97 e a cor de `active`.
- **Cancelamento (Pointer Cancel/Out)**: Retorna a scale 1 e estado `hover` ou `default`.
- **Teclado**: Dispara apenas o estado `active` quando acionado (Enter/Space), preservando o foco.
- **Disabled / Loading**: O botão é bloqueado contra interações; *não* escala (escala travada em 1) e não muda para a cor de active.
- **Reduced Motion (`prefers-reduced-motion: reduce`)**: O *scale* e as transições são cancelados (transform: none / scale: 1). A cor *active* permanece aplicada como único feedback instantâneo.

## Escopo e Futuro
- **Nenhuma alteração de API pública** foi planejada ou executada na biblioteca de componentes nesta etapa.
- A **VC-09B** será a etapa responsável por instalar as dependências React (Framer Motion ou similar) e migrar o arquivo fonte `Button.tsx`.
- As frentes **VC-10, VC-11 e VC-12** (referentes a animações de Tabs, Modais e Sidebar) estão **explicitamente fora do escopo** desta remediação e permanecem não autorizadas neste momento.
