# Protocolo obrigatório para agentes

Antes de alterar qualquer interface, leia nesta ordem:

1. `solide-brand-guide.html` — fonte visual normativa;
2. `USING_SOLIDE.md` — procedimento de adoção;
3. `DESIGN_SYSTEM.md` — contrato e precedência;
4. `apps/<app>/design-brief.md` — conteúdo e prioridades do aplicativo.

Use `solide-tokens.css` ou `@solide/tokens` para valores. Use os padrões do
brand guide como referência de composição. `packages/ui-kit` é uma
implementação do guia, nunca uma autoridade visual concorrente.

Não invente cor, espaçamento, raio, sombra, tipografia, ícone, animação,
componente ou layout. Se algo necessário não estiver demonstrado no guia,
registre a lacuna e pare antes de codificar essa parte.

Não apresente uma tela sem comparação visual em desktop e mobile. Testes de
compilação não substituem aprovação visual.

Ao concluir, execute `npm run build`, `npm run typecheck` e
`npm run test:tokens`.
