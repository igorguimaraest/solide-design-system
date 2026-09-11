# @solide/tokens

O contrato público deste pacote é o CSS exportado por `@solide/tokens`.
Ele é uma cópia exata de `../../solide-tokens.css`, arquivo carregado pelo
`../../solide-brand-guide.html`.

Use:

```css
@import "@solide/tokens";
```

Os JSONs em `src/` permanecem apenas como material interno de compatibilidade
e verificação estrutural. Eles não são exportados pelo pacote e não definem
uma paleta ou composição alternativa. Qualquer mudança visual começa no brand
guide e no `solide-tokens.css`, nunca nesses JSONs.

Depois de alterar o contrato, execute na raiz do repositório:

```text
npm run build
npm run typecheck
npm run test:tokens
```
