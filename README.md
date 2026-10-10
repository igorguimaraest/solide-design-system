# Solide Design System

Comece por [`SOLIDE-RESUMO.md`](SOLIDE-RESUMO.md): cores, tipografia, espaços e
as 10 regras em duas páginas. O
[`solide-brand-guide.html`](solide-brand-guide.html) é a vitrine com todos os
padrões montados — abra no navegador para ver; consulte por seção quando
precisar de um exemplo.

## Comece aqui

1. [`SOLIDE-RESUMO.md`](SOLIDE-RESUMO.md) — leitura padrão.
2. [`USING_SOLIDE.md`](USING_SOLIDE.md) — fluxo de projeto novo ou existente.
3. [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) — o que é fonte de quê.
4. Brief do app em `apps/<app>/design-brief.md`, se houver.

## Sistema × vitrine

| Parte | Arquivos | Quem usa |
| --- | --- | --- |
| Sistema | `SOLIDE-RESUMO.md`, `solide-tokens.css` / `@solide/tokens`, `packages/ui-kit`, `icons/` | IA e apps, sempre |
| Vitrine | `solide-brand-guide.html`, `docs/plans/`, `docs/audits/`, protótipos | Igor olha; IA consulta sob demanda |

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
