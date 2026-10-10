import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Alert,Button,Badge,Input,Typography,FormField,SearchBar,SegmentedTabs,DataTable,EmptyState,ModalHeader,DashboardLayout,AuthLayout,Checkbox,Radio,RadioGroup,Switch,ToastProvider,useToast} from '../packages/ui-kit/src';
import './style.css';

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex gap-3 mb-6" aria-label="Toasts">
      <Button tone="secondary" onClick={() => toast({ tone: 'success', title: 'Fatura #FAT-2026-09 Cancelada', description: 'O lançamento foi estornado do livro fiscal.', action: { label: 'Desfazer', onClick: () => console.log('Undo') } })}>Toast Sucesso</Button>
      <Button tone="secondary" onClick={() => toast({ tone: 'warning', title: 'Certificado Digital A1 Expirando', description: 'O certificado vence em 5 dias. Atualize para evitar interrupção de NFS-e.', action: { label: 'Renovar Agora', onClick: () => console.log('Renew') } })}>Toast Alerta</Button>
      <Button tone="secondary" onClick={() => toast({ tone: 'error', title: 'Falha na Conexão com SEFAZ', description: 'O gateway reportou timeout (código 504). Tentando reconexão.', action: { label: 'Ver Logs', onClick: () => console.log('Logs') } })}>Toast Erro</Button>
    </div>
  );
}

function App(){
 const [theme,setTheme]=useState<'light'|'dark'>('light');
 const [tab,setTab]=useState('all');const [selected,setSelected]=useState<string[]>([]);const [reviewPage,setReviewPage]=useState(1);const [nav,setNav]=useState('overview');
 const [backup,setBackup]=useState(true);const [environment,setEnvironment]=useState('production');const [sync,setSync]=useState(true);
 const [showInfoAlert,setShowInfoAlert]=useState(true);
 const [testDisabled,setTestDisabled]=useState(false);const [testLoading,setTestLoading]=useState(false);const [testUnmounted,setTestUnmounted]=useState(false);
 const isHarness = window.location.search.includes('harness=vc-09b');
 React.useEffect(()=>{
   if (isHarness) {
     const win = window as unknown as { setTestDisabled: typeof setTestDisabled; setTestLoading: typeof setTestLoading; setTestUnmounted: typeof setTestUnmounted; };
     win.setTestDisabled=setTestDisabled;
     win.setTestLoading=setTestLoading;
     win.setTestUnmounted=setTestUnmounted;
   }
 },[isHarness]);
 const sections=[{title:'Gestão',items:[{id:'overview',label:'Visão geral',icon:'activity',isActive:nav==='overview',onClick:()=>setNav('overview')},{id:'records',label:'Registros administrativos',icon:'copy',isActive:nav==='records',onClick:()=>setNav('records')}]}];
 return <ToastProvider><DashboardLayout sidebarSections={sections} currentTheme={theme} onThemeToggle={()=>setTheme(t=>t==='light'?'dark':'light')} headerUser={{name:'Igor Guimarães',role:'Administração'}}>
 <Typography variant="h1">Solide — revisão do sistema</Typography>
 <Typography variant="body-sm" tone="secondary">Cores, estados e componentes do contrato compartilhado.</Typography>
 <ToastDemo />
 <div className="flex flex-wrap gap-3" data-testid="buttons">
  <Button data-testid="primary" onPointerDown={(e) => (e.currentTarget as HTMLElement).setAttribute('data-down-called', 'true')} onPointerUp={(e) => (e.currentTarget as HTMLElement).setAttribute('data-up-called', 'true')} onPointerCancel={(e) => (e.currentTarget as HTMLElement).setAttribute('data-cancel-called', 'true')} onPointerLeave={(e) => (e.currentTarget as HTMLElement).setAttribute('data-leave-called', 'true')} onPointerOut={(e) => (e.currentTarget as HTMLElement).setAttribute('data-out-called', 'true')} onKeyDown={(e) => (e.currentTarget as HTMLElement).setAttribute('data-keydown-called', 'true')} onKeyUp={(e) => (e.currentTarget as HTMLElement).setAttribute('data-keyup-called', 'true')} onBlur={(e) => (e.currentTarget as HTMLElement).setAttribute('data-blur-called', 'true')}>Salvar alterações</Button><Button tone="secondary">Cancelar</Button><Button tone="danger">Excluir registro</Button><Button variant="outline">Exportar</Button><Button variant="ghost">Consultar</Button><Button disabled>Indisponível</Button><Button isLoading data-testid="loading">Salvando</Button>{isHarness && !testUnmounted && <Button data-testid="dynamic-state" disabled={testDisabled} isLoading={testLoading}>Dinâmico</Button>}
 </div>
 <div className="flex flex-wrap gap-3">{(['success','warning','error','info','brand','neutral'] as const).map(t=><Badge key={t} tone={t}>{t}</Badge>)}</div>
 <section className="grid grid-cols-1 gap-3" aria-label="Alertas">
  <Alert data-testid="alert-success" tone="success" title="Conciliação bancária concluída" description="Todos os 142 lançamentos foram conciliados automaticamente sem divergências." />
  <Alert data-testid="alert-warning" tone="warning" title="Certificado Digital A1 próximo do vencimento" description="Expira em 4 dias úteis. Renove a chave criptográfica para manter a emissão ininterrupta." action={<Button tone="warning" size="sm">Renovar Certificado</Button>} />
  <Alert data-testid="alert-danger" tone="danger" title="Rejeição SEFAZ: Código 539" description="A nota fiscal já consta como autorizada na base estadual. Corrija a numeração para retransmitir." action={<Button tone="danger" size="sm">Corrigir e retransmitir</Button>} />
  <Alert data-testid="alert-info" open={showInfoAlert} dismissible tone="info" title="Ambiente de Contingência SVC-AN ativo" description="O tráfego fiscal está roteado com redundância nacional." onDismiss={()=>setShowInfoAlert(false)} />
 </section>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <FormField id="name" label="Nome"><Input data-testid="input-default" placeholder="Nome completo" /></FormField><FormField id="email" label="E-mail" error="Informe um e-mail válido"><Input data-testid="input-error" defaultValue="inválido" /></FormField><Input data-testid="input-disabled" aria-label="Campo desabilitado" disabled value="Sem edição"/><SearchBar defaultValue="Solide" /></div>
 <section className="grid grid-cols-1 md:grid-cols-3 gap-4" aria-label="Controles de seleção">
 <Checkbox checked={backup} onCheckedChange={setBackup} label="Backup automático" description="Snapshot diário" />
 <RadioGroup value={environment} onValueChange={setEnvironment} aria-label="Ambiente"><Radio value="production" label="Produção"/><Radio value="staging" label="Homologação"/></RadioGroup>
 <Switch checked={sync} onCheckedChange={setSync} label="Sincronização fiscal" description="Atualização contínua" />
 </section>
 <SegmentedTabs idPrefix="review" options={[{id:'all',label:'Todos'},{id:'pending',label:'Pendentes'},{id:'disabled',label:'Bloqueados',disabled:true}]} value={tab} onChange={setTab}/>
 <div id={`review-panel-${tab}`} role="tabpanel" aria-labelledby={`review-tab-${tab}`}><DataTable columns={[{key:'name',header:'Nome',sortable:true},{key:'status',header:'Situação',render:()=> <Badge tone="success">Ativo</Badge>}]} data={[{id:'1',name:'Secretaria de Administração',status:'Ativo'},{id:'2',name:'Unidade de Gestão',status:'Ativo'}]} keyField="id" selectedIds={selected} onSelectionChange={setSelected} currentPage={reviewPage} totalCount={20} onPageChange={setReviewPage}/></div>
 <ModalHeader title="Detalhes do registro" subtitle="Informações de cadastro" onClose={()=>{}}/>
 <EmptyState title="Nenhum resultado" description="Ajuste os filtros para encontrar um registro." actionLabel="Limpar filtros" onAction={()=>{}}/>
 <details><summary>Autenticação</summary><AuthLayout title="Entrar na sua conta"><Input aria-label="E-mail de acesso"/><Button>Entrar</Button></AuthLayout></details>
 </DashboardLayout></ToastProvider>
}
createRoot(document.getElementById('root')!).render(<App/>);
