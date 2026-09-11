# Solide Design System

O [`solide-brand-guide.html`](solide-brand-guide.html) é a fonte visual
normativa do Solide. Ele deve ser a primeira leitura antes de criar ou alterar
uma interface.

## Comece aqui

1. Leia [`USING_SOLIDE.md`](USING_SOLIDE.md) para o fluxo de projeto novo ou
   existente.
2. Leia [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) para a ordem de autoridade.
3. Leia o brief em `apps/<app>/design-brief.md` antes de implementar o app.

## Contrato público

| Necessidade | Artefato autorizado |
| --- | --- |
| Referência visual, composição e estados | `solide-brand-guide.html` |
| Tokens CSS | `solide-tokens.css` ou `@solide/tokens` |
| Componentes React | `packages/ui-kit` |
| Ícones | `icons/` ou `solide-icons-data.js` |

`@solide/tokens` publica uma cópia exata de `solide-tokens.css`. A validação
automática falha se isso deixar de ser verdade.

## Desenvolvimento

```text
npm run build
npm run typecheck
npm run test:tokens
```

## Registro

- [Retrospectiva da tentativa Nemu — reprovada](docs/retrospectives/2026-09-10-nemu-solide.md)
