# STATUS — SOLIDE Design System

Atualizado em 2026-10-10.

## Decisão
- O SOLIDE é o design system ÚNICO do Igor (o antigo "estilo Apple" de `~/.claude/design-system` foi arquivado).
- A identidade ainda não agrada 100%: os neutros quentes (`#FAF9F6`, `#E9E6DE` puxando para bege) não convenceram.
- 2026-10-10: neutros trocados para **frio sutil (C)** — escolha delegada pelo Igor. Motivo: cinza com o matiz da cor de ação (azul) dá harmonia sem chamar atenção; é a combinação recomendada pelo Radix Colors (azul ↔ slate). Neutro puro (A) foi o finalista.

## Diagnóstico (auditoria de 2026-10-10)
- Bom: estados completos (erro, vazio, carregando, desativado), contraste correto (botão primário 5,5:1, texto secundário 4,7:1), exemplos com conteúdo real.
- Cópia sem melhoria: tipografia 100% Apple (Inter + escala 34/28/22/17/13); azul `#2D7CF6` genérico; falta elemento-assinatura.
- ~~Custo de token: guia de 588 KB de leitura obrigatória~~ → resolvido: `SOLIDE-RESUMO.md` é a leitura padrão.
- ~~Travas: regras de "pare se faltar algo no guia"~~ → resolvido: "use o mais próximo, avise e registre".
- ~~Até 4 nomes para a mesma cor~~ → resolvido: um nome `--sld-*` por valor.
- Logo `.svg` (268 KB) é PNG embrulhado em SVG, não vetor de verdade.
- ~~Scripts soltos na raiz e alterações não commitadas~~ → resolvido.
- Visual: texto dos alertas parece negrito e espaçado demais (visto na captura, causa não confirmada); muitos estilos de botão lado a lado.

## Andamento
- Passo 1 (arrumação) — feito em 2026-10-10 (aprovado pelo Igor):
  - Scripts soltos: **28** arquivos (a lista dizia 27 por erro de soma) movidos para `c:\tmp\solide-scripts-soltos\` (fora do repo; nenhum era rastreado nem referenciado).
  - Nomes: commit `b3385ee` no branch `solide/arrumacao-nomes` (empilhado sobre `solide/neutro-frio-sutil`). 103 apelidos legados removidos; `--sld-palette-warm-*` → `--sld-palette-neutral-*`. `solide-tokens.css`: 919 → 630 linhas, 484 → 381 nomes. O guia cresceu 588 → 597 KB (nomes oficiais são mais longos).
  - Prova de visual idêntico: estilos calculados de 8.896 elementos (guia + prévia, claro e escuro) iguais antes/depois, exceto 1 elemento animado que já varia sozinho. Build, typecheck, lint, `test:tokens` ok; Playwright 118/118.
  - Registros históricos (`docs/audits`, `docs/retrospectives`, `docs/migration`, `docs/consolidation/palette-mapping.json`) mantêm os nomes antigos de propósito.
  - Alterações antigas salvas: commit `ad29428` (experimento "apresentação editorial" do guia + 2 seletores de teste; manter ou descartar segue em `docs/plans/apresentacao-por-item.md`) e `ba2a562` (planos e protótipos em `docs/plans/`).
  - `SOLIDE-RESUMO.md` criado: leitura padrão da IA (cores por papel com hex claro/escuro, tipografia, espaço, raio, sombra, alturas, movimento, 10 regras). Valores conferidos contra `solide-tokens.css` e o UI Kit.
  - Regras reescritas (`AGENTS.md`, `README.md`, `DESIGN_SYSTEM.md`, `USING_SOLIDE.md`): RESUMO primeiro; guia só por seção; "pare se faltar" → "use o mais próximo, avise em uma linha e registre em STATUS.md › Lacunas"; sistema × vitrine documentado (sem mover arquivos — testes e build apontam para o guia na raiz).
  - Passo 1 **concluído**. Build, typecheck e `test:tokens` ok.
  - **Unificações que mudam visual (decisão futura)**: escalas de cinza paralelas `--solide-neutral-*` e `--sld-color-neutral-*` (~50 usos); escala tipográfica paralela `--sld-font-size-*` (40/32/24/20/16/14/12, 8 usos) ao lado da `--text-*` em uso; `--sld-surface-overlay` claro ainda usa o preto quente antigo `rgba(18,17,16,0.45)`.
  - **Decisão visual futura**: duas escalas de cinza paralelas com valores próprios (`--solide-neutral-*`, `--sld-color-neutral-*`, ~50 usos) — unificar muda cores.
- Passo 2a (neutros): **concluído** — escala C aplicada em `solide-tokens.css`, commit `1d2ba86` no branch `solide/neutro-frio-sutil` (criado a partir de `codex/presentation-layout-experiment`; ainda não juntado).
  - `warm-600` ajustado para `#636669` (o derivado direto dava 4,49:1 em surface-shell, abaixo do AA; agora 4,62:1).
  - Verificado: `npm run build` ok, `typecheck` ok, `test:tokens` ok, Playwright 118/118 passando; guia conferido no navegador (claro/escuro, desktop/celular).
  - Renomeado depois para `--sld-palette-neutral-*` (passo 1).
  - Protótipo em `docs/plans/prototipo-neutros/` (commit `ba2a562`; `?opcoes=A,C` filtra variantes). Capturas mostram o "Atual" = bege antigo.
- Passo 2b: próximos protótipos — 3 fontes de título e depois 3 tons de azul.
- Notado (fora do escopo, não alterado): no celular (390 px) o cabeçalho do brand guide corta o avatar e gera rolagem horizontal; a prévia do UI Kit no App shell tem botão de tema próprio que não segue o tema do guia.

## Lacunas
Tokens que faltaram em projetos reais. Cada linha: data, projeto, o que faltou e qual token substituiu. Corrigir no SOLIDE quando possível.
- (nenhuma registrada ainda)

## Próximos passos (nesta ordem)
1. ~~Arrumação (não muda o visual)~~ → **feito** em 2026-10-10.
2. Identidade com a skill `prototype`, sempre na mesma tela real do SOLIDE:
   - ~~3 bases de neutro~~ → feito: frio sutil.
   - Agora: 3 fontes de título (Inter fica no texto corrido) e 3 tons de azul.
3. Logo em vetor de verdade (à parte).
