# Protocolo para agentes

Antes de criar ou alterar uma interface:

1. Leia [`SOLIDE-RESUMO.md`](SOLIDE-RESUMO.md) — cores, tipografia, espaços e as
   10 regras. É a leitura padrão e basta na maioria dos casos.
2. Leia o brief do aplicativo (`apps/<app>/design-brief.md`), se houver.
3. Só se precisar ver um padrão montado (ex.: app shell, tabela, modal),
   consulte a seção correspondente do `solide-brand-guide.html` pelo ID
   (`screen-app-shell`, `comp-sidebar`…). Não leia o guia inteiro.

## Sistema × vitrine

- **Sistema** (a IA usa): `SOLIDE-RESUMO.md`, `solide-tokens.css` /
  `@solide/tokens`, `packages/ui-kit`, `icons/`.
- **Vitrine** (o Igor olha; a IA consulta sob demanda):
  `solide-brand-guide.html`, `docs/plans/`, `docs/audits/`, protótipos.

Valores vêm sempre de `solide-tokens.css`. O guia mostra como compor; o
UI Kit implementa o guia.

## Quando faltar algo

Use o token ou padrão mais próximo, avise em uma linha qual usou e registre em
`STATUS.md › Lacunas` (data, projeto, o que faltou, qual token substituiu).
Não pare o trabalho por isso. Não crie valor novo solto no app — se a lacuna se
repetir, ela vira token no SOLIDE.

## Ao concluir

- Confira a tela no navegador em desktop e celular, claro e escuro.
- No repositório do SOLIDE, rode `npm run build`, `npm run typecheck` e
  `npm run test:tokens`.
