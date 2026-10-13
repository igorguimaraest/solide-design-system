/* Conteúdo individual da vitrine; exemplos HTML e contratos React têm fontes distintas. */
(() => {
 const entries = [
 ['button','Botões','controles','Executar uma ação com intenção clara.','Uma ação principal por área; use perigo para ações destrutivas.','Usar botão para indicar um status sem ação.','Padrão, hover, foco, desabilitado e carregando. Bloqueie envio repetido.','Nome acessível; Enter e Espaço ativam. Ícones sozinhos precisam de rótulo.','action-primary-bg,action-primary-text,btn-h-md,radius-md','button'],
 ['input','Campo de texto','controles','Receber uma informação curta.','Rótulo persistente, ajuda contextual e mensagem de erro junto ao campo.','Placeholder como único rótulo.','Vazio, preenchido, foco, erro, somente leitura e desabilitado.','Associe label; aria-invalid e aria-describedby identificam erro e ajuda.','input-h-md,border-strong,action-focusRing','input'],
 ['form-field','Campo com ajuda','controles','Compor rótulo, entrada e orientação.','Uma instrução curta com erro específico que explique como corrigir.','Mensagem genérica ou erro comunicado só pela cor.','Ajuda inicial, erro de validação e recuperação após correção.','O rótulo e a descrição pertencem ao mesmo controle.','text-secondary,status-danger-text,space-2','field'],
 ['switch','Switch','controles','Ativar ou desativar uma configuração.','Mudanças booleanas com efeito imediato.','Escolher uma opção entre várias ou confirmar envio de formulário.','Ligado, desligado, foco e desabilitado.','Nome estável; anuncie o estado e permita alternar com Espaço.','action-primary-bg,disabled-bg,action-focusRing','switch'],
 ['checkbox','Checkbox','controles','Marcar opções independentes.','Seleção múltipla; seleção parcial de uma coleção.','Exigir escolha única entre opções.','Marcado, desmarcado, indeterminado e desabilitado.','Rótulo clicável; Espaço alterna; indeterminado deve ser anunciado.','selection-bg,selection-border,action-focusRing','checkbox'],
 ['radio','Radio','controles','Escolher uma opção de um grupo.','Opções mutuamente exclusivas com rótulos curtos.','Permitir várias escolhas no mesmo grupo.','Selecionado, não selecionado, foco e desabilitado.','Mesmo name; fieldset e legend; setas percorrem as opções.','selection-bg,selection-border,action-focusRing','radio'],
 ['mascaras','Máscaras','controles','Ajudar a ler informações formatadas.','Datas, identificadores e valores com formato conhecido.','Tratar máscara como validação ou impedir colar um valor.','Vazio, parcial, completo e inválido.','Informe formato e erro; preserve edição e colagem. Valide também no servidor.','input-h-md,border-strong,status-danger-text','mask'],
 ['search','Busca','controles','Encontrar itens de uma coleção.','Consulta com resultado, estado vazio e opção de limpar.','Ocultar filtros essenciais dentro da busca.','Vazia, digitando, carregando, resultados e nenhum resultado.','Nome acessível e anúncio da quantidade de resultados.','surface-card,text-secondary,action-focusRing','search'],
 ['tabs','Abas','segmented-abas','Alternar conteúdo relacionado na mesma página.','Poucas seções paralelas com título curto.','Etapas obrigatórias de um processo sequencial.','Aba ativa, inativa, foco e painel correspondente.','tablist, tab e tabpanel; setas navegam; aria-selected acompanha a seleção.','selection-bg,selection-text,action-focusRing','tabs'],
 ['segmented','Controle segmentado','segmented-abas','Alternar uma perspectiva ou filtro pequeno.','Duas a quatro opções curtas, como período ou visualização.','Muitas opções ou títulos longos.','Uma opção ativa; troca atualiza o conteúdo associado.','Informe a opção selecionada e permita operação por teclado.','selection-bg,selection-text,radius-md','tabs'],
 ['breadcrumbs','Breadcrumbs','segmented-abas','Mostrar a localização na hierarquia.','Páginas com níveis e acesso aos ancestrais.','Representar histórico de navegação ou etapas.','Ancestrais navegáveis e página atual sem ação redundante.','nav com rótulo; página atual com aria-current="page".','text-secondary,text-primary,space-2','breadcrumbs'],
 ['alert','Alertas','alertas','Manter uma informação importante junto ao contexto.','Erro recuperável, orientação, aviso ou confirmação persistente.','Mostrar alertas de destaque para mensagens comuns.','Informação, sucesso, aviso e erro; ação e fechamento quando necessários.','Texto e ícone acompanham a cor; reserve role=alert para urgência.','status-info-bg,status-info-text,status-info-border','alert'],
 ['toast','Toasts','alertas','Confirmar rapidamente uma operação.','Resultado breve de uma ação, sem interromper o fluxo.','Guardar erro crítico ou instrução longa que exige leitura.','Sucesso, aviso e erro; fechamento manual e duração adequada.','Região viva educada; ações acessíveis e tempo suficiente para leitura.','surface-card,text-primary,shadow-lg','toast'],
 ['table','Tabelas','tabelas','Comparar registros e operar sobre uma coleção.','Dados estruturados com colunas, filtros e ações claras.','Conteúdo narrativo ou cartão em formato de tabela.','Dados, carregando, vazio, erro, seleção e ordenação.','Cabeçalhos associados; ordenação anunciada; rolagem da tabela no celular.','surface-card,border-default,text-secondary','table'],
 ['badge','Tags e badges','estados-skeleton-tags','Identificar um status ou categoria em pouco espaço.','Estado curto acompanhado de texto explícito.','Usar badge como botão sem implementar interação.','Tons de status; neutro para categorias sem significado de urgência.','Nunca comunicar apenas pela cor; texto legível nos dois temas.','status-success-bg,status-success-text,radius-full','badge'],
 ['avatar','Avatares','estados-skeleton-tags','Representar uma pessoa ou equipe.','Foto, iniciais ou fallback, com presença quando pertinente.','Transmitir permissão ou identidade verificada somente pela foto.','Foto, iniciais, fallback e presença; nomes em grupos.','Nome acessível; imagem decorativa quando o nome já aparece ao lado.','surface-sunken,text-primary,radius-full','avatar'],
 ['skeleton','Skeleton','estados-skeleton-tags','Antecipar a estrutura durante o carregamento.','Espera inicial com geometria parecida com o conteúdo final.','Manter animação quando ocorreu erro ou ausência de dados.','Carregando; substituído por conteúdo, vazio ou erro.','Anuncie carregamento uma vez; ocultar formas decorativas; respeitar movimento reduzido.','surface-sunken,surface-hover,radius-md','skeleton'],
 ['empty','Estado vazio','estados-skeleton-tags','Explicar por que não há conteúdo e o próximo passo.','Primeiro uso ou busca sem resultados com ação contextual.','Exibir uma falha de rede como ausência de registros.','Primeiro uso, sem resultados e conteúdo removido. Erro é um estado separado.','Título explicativo; ação com rótulo específico e ordem de leitura clara.','text-primary,text-secondary,space-6','empty'],
 ['chart','Gráficos','graficos','Mostrar comparação e tendência.','Séries com período, unidade e legenda.','Comunicar um valor exato apenas pela posição ou cor.','Dados, carregando, vazio e erro; troca de período preserva contexto.','Inclua resumo textual ou tabela; séries distinguíveis além da cor.','chart-1,chart-2,text-secondary','chart'],
 ['date','Seletor de período','overlays-periodos','Escolher um intervalo de datas.','Relatórios com presets e período personalizado.','Ocultar qual data é início e qual é fim.','Fechado, aberto, seleção parcial, intervalo completo e inválido.','Teclado, foco visível, Escape e anúncio do intervalo selecionado.','selection-bg,selection-text,surface-card','date'],
 ['modal','Modal','overlays-periodos','Pedir uma decisão em contexto focado.','Tarefa curta ou confirmação que exige atenção.','Encadear modais ou usar para tarefas extensas.','Fechado, aberto, processando, erro e concluído.','Título acessível, foco contido, Escape quando permitido e retorno ao acionador.','surface-card,surface-overlay,radius-xl','modal'],
 ['drawer','Drawer','overlays-periodos','Abrir detalhes sem perder o contexto da lista.','Inspeção ou edição complementar de um registro.','Esconder a tarefa principal em um painel pequeno.','Fechado, aberto, carregando, vazio e erro.','Se modal, conter foco e devolver ao acionador; no celular ocupar espaço legível.','surface-card,surface-overlay,shadow-lg','lab'],
 ['command','Command palette','overlays-periodos','Encontrar ações por teclado.','Atalho para navegação e comandos frequentes.','Substituir o menu visível por uma interface só de teclado.','Fechada, aberta, consulta, resultados e nenhum resultado.','Nome acessível; setas, Enter e Escape; anunciar opção ativa.','surface-card,selection-bg,action-focusRing','lab'],
 ['accordion','Accordion','overlays-periodos','Expandir informações complementares.','Conteúdo secundário com título que explica cada seção.','Esconder ações essenciais ou instruções obrigatórias.','Fechado, aberto e foco; política de uma ou várias seções abertas.','Botão com aria-expanded ou details/summary nativos.','border-default,text-primary,space-3','accordion'],
 ['popover','Popover e hover card','overlays-periodos','Mostrar contexto junto ao acionador.','Informação complementar e ações pequenas.','Depender apenas de hover ou guardar conteúdo indispensável.','Fechado, aberto por clique ou foco; fechamento e reposicionamento.','Acesso por toque e teclado; Escape fecha; diferencie dica de diálogo interativo.','surface-card,shadow-lg,radius-md','accordion'],
 ['header','Cabeçalho','app-shell','Manter acesso à navegação, busca e conta.','Ações globais persistentes, com prioridades claras no celular.','Acumular ações locais junto das globais.','Desktop completo; celular compacto; menu e busca abertos.','Landmark header; nome nos botões de ícone; foco e ordem de tabulação.','surface-shell,text-primary,space-3','lab'],
 ['sidebar','Sidebar','app-shell','Organizar os destinos principais.','Grupos legíveis e indicação do destino atual.','Misturar ação destrutiva com destino de navegação.','Expandida, compacta, item ativo e menu modal no celular.','nav rotulado; aria-current; menu móvel com Escape e retorno de foco.','surface-shell,selection-bg,selection-text','lab'],
 ['theme','Alternador de tema','app-shell','Escolher a aparência clara ou escura.','Preferência acessível em uma ação global.','Mudar significado ou conteúdo ao alternar o tema.','Claro, escuro e preferência persistida.','Rótulo estável e estado anunciado; contraste em ambos os temas.','surface-shell,text-primary,action-focusRing','theme'],
 ['modal-header','Cabeçalho de modal','overlays-periodos','Apresentar título e fechamento do diálogo.','Título curto associado ao modal, com ação de fechar clara.','Título genérico ou fechar sem indicar perda de alterações.','Título, descrição opcional e botão de fechar com foco visível.','Relacionar o título ao diálogo; nome acessível no botão de fechar.','text-primary,border-default,space-4','lab']
 ];
 const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 const sample = (kind,id,demo) => {
  const input = '<label class="doc-field">Nome do projeto<input class="input-base" placeholder="Ex.: Catálogo"></label>';
  switch(kind) {
   case 'button': return '<button class="btn btn-primary" data-doc-toast>Salvar alterações</button><button class="btn btn-secondary">Cancelar</button><button class="btn btn-primary" disabled aria-busy="true">Processando...</button>';
   case 'input': return input + '<label class="doc-field">Campo indisponível<input class="input-base" value="Somente consulta" disabled></label>';
   case 'field': return `<label class="doc-field">Nome do projeto<input class="input-base input-error" aria-invalid="true" aria-describedby="${id}-error"><span class="input-hint-error" id="${id}-error">Informe um nome para continuar.</span></label>`;
   case 'switch': return '<label class="solide-switch-label"><span class="solide-switch"><input type="checkbox" role="switch"><span class="solide-switch-track"></span></span>Notificações</label>';
   case 'checkbox': return '<label><input class="solide-checkbox" type="checkbox">Receber novidades</label><label><input class="solide-checkbox" type="checkbox" checked disabled>Opção indisponível</label>';
   case 'radio': return `<fieldset><legend>Visualização</legend><label><input class="solide-radio" name="${id}" type="radio" checked>Lista</label><label><input class="solide-radio" name="${id}" type="radio">Cartões</label></fieldset>`;
   case 'mask': return '<label class="doc-field">Data (dia/mês/ano)<input class="input-base" inputmode="numeric" placeholder="DD/MM/AAAA" maxlength="10" data-doc-date-mask></label>';
   case 'search': return '<label class="doc-field">Buscar componentes<input class="input-base" type="search" placeholder="Digite botão ou campo" data-doc-search></label><p role="status" data-doc-search-result>Digite para buscar no catálogo.</p>';
   case 'tabs': return `<div data-doc-tabs><div role="tablist" aria-label="Resumo do projeto"><button class="btn btn-primary" role="tab" aria-selected="true" id="${id}-tab-0" aria-controls="${id}-panel-0">Resumo</button><button class="btn btn-secondary" role="tab" aria-selected="false" tabindex="-1" id="${id}-tab-1" aria-controls="${id}-panel-1">Atividade</button></div><p role="tabpanel" id="${id}-panel-0" aria-labelledby="${id}-tab-0">Visão geral do projeto.</p><p role="tabpanel" id="${id}-panel-1" aria-labelledby="${id}-tab-1" hidden>Última atualização: hoje.</p></div>`;
   case 'breadcrumbs': return '<nav class="solide-breadcrumbs" aria-label="Localização"><a href="#componentes" data-doc-route>Componentes</a><span aria-hidden="true">/</span><span aria-current="page">Breadcrumbs</span></nav>';
   case 'alert': return '<p class="status-pill status-pill-info" role="status">Informação: suas alterações foram salvas.</p>';
   case 'toast': return '<button class="btn btn-primary" data-doc-toast>Mostrar confirmação</button>';
   case 'table': return '<table><caption>Projetos de exemplo</caption><thead><tr><th scope="col">Projeto</th><th scope="col">Estado</th></tr></thead><tbody><tr><th scope="row">Catálogo</th><td>Ativo</td></tr><tr><th scope="row">Portal</th><td>Rascunho</td></tr></tbody></table>';
   case 'badge': return '<span class="status-pill status-pill-success">Ativo</span><span class="status-pill status-pill-neutral">Rascunho</span><span class="status-pill status-pill-danger">Erro</span>';
   case 'avatar': return '<span class="solide-avatar solide-avatar-md" role="img" aria-label="Equipe SOLIDE">SL</span><span>Equipe SOLIDE</span>';
   case 'skeleton': return '<div role="status">Carregando conteúdo...</div><div class="skeleton-shimmer" aria-hidden="true" style="width:100%;height:var(--sld-space-8);border-radius:var(--sld-radius-md)"></div>';
   case 'empty': return '<div class="empty-state-box"><h4>Nenhum projeto ainda</h4><p>Crie seu primeiro projeto para começar.</p><button class="btn btn-primary" data-doc-toast>Criar projeto de exemplo</button></div>';
   case 'chart': return '<div class="doc-bars" aria-hidden="true"><span></span><span></span><span></span></div><p>Projetos concluídos: janeiro 2, fevereiro 3, março 4.</p>';
   case 'date': return `<label class="doc-field">Início<input class="input-base" type="date" value="2026-10-01" data-doc-start></label><label class="doc-field">Fim<input class="input-base" type="date" value="2026-10-13" data-doc-end></label><p role="status" data-doc-range>Período de exemplo: 1 a 13 de outubro.</p>`;
   case 'modal': return `<button class="btn btn-primary" data-doc-open>Abrir exemplo</button><dialog data-doc-dialog aria-labelledby="${id}-title"><h3 id="${id}-title">Confirmar alterações</h3><p>Este exemplo não grava dados.</p><button class="btn btn-secondary" data-doc-close>Fechar</button></dialog>`;
   case 'accordion': return '<details><summary>Como aplicar este componente?</summary><p>Use os tokens existentes e mantenha o conteúdo acessível pelo teclado.</p></details>';
   case 'theme': return '<button class="btn btn-secondary" data-doc-theme>Alternar tema do guia</button>';
   default: return `<p>Veja o componente em contexto no laboratório existente.</p><a class="btn btn-secondary" href="#${demo}" data-doc-route>Explorar demonstração</a>`;
  }
 };
 const main = document.querySelector('.doc-container');
 const insertPage = page => main.insertBefore(page, main.querySelector(':scope > footer'));
 const catalog = document.createElement('div');
 catalog.id='screen-componentes'; catalog.className='doc-screen';
 catalog.innerHTML='<div class="screen-header"><span class="chip">Componentes</span><h2 class="stl">Biblioteca de componentes</h2><p class="sd">Escolha um componente para consultar uso, estados, acessibilidade, tokens e exemplos.</p></div><div class="component-catalog"></div>';
 insertPage(catalog);
 for(const [slug,title,demo,description,use,avoid,states,a11y,tokens,kind] of entries) {
  const id='screen-componente-'+slug;
  const preview=sample(kind,id,demo);
  const page=document.createElement('article'); page.id=id; page.className='doc-screen component-doc';
  page.innerHTML=`<div class="screen-header"><a href="#componentes" data-doc-route>← Todos os componentes</a><p class="reference-label">Componentes / ${title}</p><h2 class="stl">${title}</h2><p class="sd">${description}</p></div><nav class="reference-row" aria-label="Nesta página"><a href="#${id}-exemplo">Exemplo</a><a href="#${id}-uso">Uso</a><a href="#${id}-estados">Estados</a><a href="#${id}-acessibilidade">Acessibilidade</a><a href="#${id}-tokens">Tokens</a></nav><section id="${id}-exemplo"><h3>Exemplo</h3><div class="component-preview">${preview}</div><p>Exemplo HTML da vitrine. <a href="#${demo}" data-doc-route>Ver variantes no laboratório →</a></p></section><section id="${id}-uso" class="component-info"><div><h3>Quando usar</h3><p>${use}</p></div><div><h3>Evite</h3><p>${avoid}</p></div></section><section id="${id}-estados"><h3>Estados e comportamento</h3><p>${states}</p></section><section id="${id}-acessibilidade"><h3>Acessibilidade</h3><p>${a11y}</p></section><section id="${id}-tokens"><h3>Tokens</h3><ul>${tokens.split(',').map(t=>`<li><code>--sld-${t}</code></li>`).join('')}</ul><p>Valores definidos em solide-tokens.css; os papéis acompanham os temas claro e escuro.</p></section><section><h3>Exemplo de marcação</h3><pre><code>${escape(preview)}</code></pre></section>`;
  insertPage(page);
  catalog.querySelector('.component-catalog').insertAdjacentHTML('beforeend',`<a class="component-tile" href="#componente-${slug}" data-doc-route><strong>${title}</strong><span>${description}</span></a>`);
 }
 const navIcon = document.querySelector('#doc-sidebar .nav-icon').outerHTML.replace('<svg ', '<svg aria-hidden="true" ');
 const group=document.createElement('div');group.className='doc-sidebar-group component-nav';group.setAttribute('data-nav-group','');
 group.innerHTML='<div class="doc-sidebar-title">Documentação individual</div>'+[['componentes','Todos os componentes'],...entries.map(e=>['componente-'+e[0],e[1]])].map(([id,title])=>`<a class="doc-sidebar-link" href="#${id}" aria-label="${title}" data-tooltip="${title}" data-doc-route><div class="nav-item-left">${navIcon}<span class="nav-label">${title}</span></div></a>`).join('');
 document.querySelector('#doc-sidebar a[href="#screen-icones"]') .insertAdjacentElement('afterend',group);
 document.querySelectorAll('#screen-visao-geral a[href="#screen-controles"]').forEach(a=>{a.href='#componentes';a.removeAttribute('onclick');a.setAttribute('data-doc-route','');});
 document.addEventListener('click',event=>{
  const route=event.target.closest('[data-doc-route]');
  if(route) { window.showScreen(route.hash.slice(1),route,event); return; }
  const button=event.target.closest('button');if(!button)return;
  if(button.hasAttribute('data-doc-toast'))window.showToast('Exemplo: ação concluída.');
  if(button.hasAttribute('data-doc-theme'))window.toggleTheme();
  if(button.hasAttribute('data-doc-open'))button.parentElement.querySelector('dialog').showModal();
  if(button.hasAttribute('data-doc-close'))button.closest('dialog').close();
  if(button.getAttribute('role')==='tab' && button.closest('[data-doc-tabs]'))selectTab(button);
 });
 function selectTab(button) {
  const root=button.closest('[data-doc-tabs]');
  root.querySelectorAll('[role="tab"]').forEach(tab=>{const active=tab===button;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;tab.className=active?'btn btn-primary':'btn btn-secondary';document.getElementById(tab.getAttribute('aria-controls')).hidden=!active;});
 }
 document.addEventListener('keydown',event=>{
  const tab=event.target.closest('[data-doc-tabs] [role="tab"]');if(!tab)return;
  const tabs=[...tab.parentElement.children];let index=tabs.indexOf(tab);
  if(event.key==='ArrowRight')index=(index+1)%tabs.length;
  else if(event.key==='ArrowLeft')index=(index+tabs.length-1)%tabs.length;
  else if(event.key==='Home')index=0;else if(event.key==='End')index=tabs.length-1;else return;
  event.preventDefault();selectTab(tabs[index]);tabs[index].focus();
 });
 document.addEventListener('input',event=>{
  const el=event.target;
  if(el.hasAttribute('data-doc-date-mask')) { const value=el.value.replace(/\D/g,'').slice(0,8);el.value=value.replace(/^(\d{2})(\d)/,'$1/$2').replace(/^(\d{2}\/\d{2})(\d)/,'$1/$2'); }
  if(el.hasAttribute('data-doc-search')) {const matches=entries.filter(e=>e[1].toLocaleLowerCase('pt-BR').includes(el.value.toLocaleLowerCase('pt-BR')));el.closest('.component-preview').querySelector('[data-doc-search-result]').textContent=el.value?(matches.length?matches.map(e=>e[1]).join(', '):'Nenhum componente encontrado.'):'Digite para buscar no catálogo.';}
  if(el.hasAttribute('data-doc-start')||el.hasAttribute('data-doc-end')) {const root=el.closest('.component-preview'),start=root.querySelector('[data-doc-start]').value,end=root.querySelector('[data-doc-end]').value;root.querySelector('[data-doc-range]').textContent=!start||!end?'Selecione início e fim.':start>end?'O fim precisa ser igual ou posterior ao início.':`Período selecionado: ${start} a ${end}.`;}
 });
 // Links internos de conteúdo não alteram a rota da página.
 document.querySelectorAll('.component-doc > nav a').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();document.getElementById(link.hash.slice(1)).scrollIntoView({behavior:'instant'});}));
 // Restaurar rota sem inserir outra entrada no histórico ao voltar ou avançar.
 window.addEventListener('popstate',()=>{const route=location.hash.slice(1)||'visao-geral';window.showScreen(route);});
})();
