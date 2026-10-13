# STATUS — SOLIDE Design System

Atualizado em 2026-10-13.

## Etapa atual: documentação e apresentação

- Direção aprovada: estrutura documental, laboratório por componente e catálogo visual.
- Última entrega: 29 páginas individuais com uso, estados, acessibilidade, tokens e exemplos HTML; grupos da sidebar visíveis, ícones no modo compacto, busca e cabeçalho móvel ajustados.
- Branch: `codex/documentacao-componentes`.
- PR: https://github.com/igorguimaraest/solide-design-system/pull/3 — aberto, aguardando conferência visual; sem merge ou publicação.
- Prévia nesta sessão: http://127.0.0.1:8080/solide-brand-guide.html#componentes. Clique em Botões ou Campo de texto.
- Verificação local: build, typecheck, test:tokens, lint e build:storybook passaram. Suíte completa 123/123; após acabamento final de navegação, 6/6 testes direcionados passaram.
- Apresentação: 29 páginas percorridas em 1440/390px, claro/escuro; sem overflow, tokens ausentes ou erros JavaScript nos quatro cenários. Capturas inspecionadas em `docs/audits/componentes/`.
- Revisão manual das mudanças concluída; nenhum defeito grave identificado aberto. Evidências e limitações em `docs/audits/componentes/validacao.md`.
- CI do PR: em execução no momento deste registro; o resultado deve ser consultado antes do merge.
- Limites: celular simulado em Chromium, sem teste em aparelho físico; exemplos HTML não substituem os contratos React do UI Kit; variantes completas e componentes compostos continuam nos laboratórios existentes.
- Execução local restabelecida por comandos aprovados fora do isolamento padrão. O modo padrão travou; causa não comprovada e nenhuma configuração global alterada.
- Artefato anterior preservado fora deste PR: `docs/plans/prototipo-apresentacao/`, não rastreado.
- Decisão pendente: Igor conferir visualmente a prévia. Próximo passo: após aprovação visual e CI passando, juntar o PR; publicação somente conforme autorização aplicável.

## Lacunas desta etapa

Nenhum token novo necessário. Avisos existentes de bundle acima de 500 kB permanecem, sem impedir build.

## Histórico até 2026-10-10

Os registros abaixo são históricos; o estado atual e o próximo passo são os da seção acima.

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
- 2026-10-10: passos 1 e 2a **juntados ao `main`** pelo PR #2 (merge `6f29fe8`), depois de revisão de código (nível baixo) e da verificação do GitHub (CI ok). O PR levou junto os 40 commits de `codex/visual-convergence-audit` que estavam fora do `main` (base do trabalho).
  - Achado da revisão, anterior a este trabalho e não corrigido: no preset Tailwind, `bg-solide-success/error/warning/info` apontam para a cor de **texto** do status (`--sld-status-*-text`). Hoje nenhum componente usa essas classes; corrigir para `-bg` antes de usá-las.
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

## Para retomar (leia isto primeiro)
- Estado: tudo salvo e no `main` do GitHub (último commit `c27e859` + este). Nada pendente no git; sem branches abertos.
- Regras de trabalho do Igor (ele não programa): decidir e avisar em uma linha; mostrar a tela testada no navegador em vez de pedir opinião técnica; "pronto" só com prova (testes rodados). Uma feature por vez, um branch e um PR por feature.
- Leitura mínima para trabalhar no SOLIDE: `SOLIDE-RESUMO.md` e `AGENTS.md`. O `solide-brand-guide.html` (~600 KB) só por seção.
- Como ver o guia: `npm run serve` e abrir `http://localhost:8080/solide-brand-guide.html`.
- Antes de dar algo por concluído: `npm run build`, `npm run typecheck`, `npm run lint`, `npm run test:tokens` e `npx playwright test` (118 testes; ~2 min).
- Cuidado ao renomear tokens: `docs/consolidation/audit.json` e `packages/tokens/src/*` são gerados pelo build — rode o build e commite o resultado.
- O repositório é **público**: nenhum segredo, nenhum dado de cliente.

## Próximos passos (nesta ordem)
1. ~~Arrumação (não muda o visual)~~ → **feito** em 2026-10-10.
2. Identidade com a skill `prototype`, sempre na mesma tela real do SOLIDE:
   - ~~3 bases de neutro~~ → feito: frio sutil.
   - **Próximo: 3 fontes de título** (Inter fica no texto corrido). Mesmo método dos neutros: protótipo em `docs/plans/prototipo-fontes/` que carrega o guia real num iframe e troca só `--sld-font-display`/`--font-family` dos títulos, com barra ← → e capturas claro/escuro/celular. Sugestão de candidatas: uma sans geométrica, uma sans humanista e uma serifada de display — escolher e justificar; o Igor costuma delegar a escolha com justificativa.
   - Depois: 3 tons de azul para `--sld-palette-cobalt-*` (hoje base `#2D7CF6`, considerado genérico). Respeitar contraste: botão primário ≥ 4,5:1 com texto branco.
   - Por último: elemento-assinatura (a identidade ainda não tem um).
3. Logo em vetor de verdade: `solide-logo-*.svg` e `solide-favicon*.svg` são PNG embrulhado em SVG (~260 KB). Refazer a partir do logo.
4. Decisões visuais adiadas (cada uma muda cores/tamanhos na tela, por isso pedem aprovação): unificar `--solide-neutral-*` e `--sld-color-neutral-*` (~50 usos) com a escala `--sld-palette-neutral-*`; remover a escala tipográfica não usada `--sld-font-size-*`; trocar o `--sld-surface-overlay` claro (`rgba(18,17,16,0.45)`, preto quente antigo) por um preto neutro.
5. Defeitos conhecidos, ainda não tratados: texto dos alertas parece negrito e espaçado demais (causa não confirmada); cabeçalho do guia corta o avatar e rola de lado em 390 px; classes `bg-solide-success/error/warning/info` do preset Tailwind apontam para cor de texto (nenhum componente usa hoje).
6. Decidir o destino do experimento "apresentação editorial" do guia (já commitado): manter ou descartar — ver `docs/plans/apresentacao-por-item.md`.
