import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Button,Badge,Input,Typography,FormField,SearchBar,SegmentedTabs,DataTable,EmptyState,ModalHeader,DashboardLayout,AuthLayout} from '../packages/ui-kit/src';
import './style.css';
function App(){
 const [theme,setTheme]=useState<'light'|'dark'>('light');
 const [tab,setTab]=useState('all');const [selected,setSelected]=useState<string[]>([]);const [nav,setNav]=useState('overview');
 const sections=[{title:'Gestão',items:[{id:'overview',label:'Visão geral',icon:'activity',isActive:nav==='overview',onClick:()=>setNav('overview')},{id:'records',label:'Registros administrativos',icon:'copy',isActive:nav==='records',onClick:()=>setNav('records')}]}];
 return <DashboardLayout sidebarSections={sections} currentTheme={theme} onThemeToggle={()=>setTheme(t=>t==='light'?'dark':'light')} headerUser={{name:'Igor Guimarães',role:'Administração'}}>
 <Typography variant="h1">Solide — revisão do sistema</Typography>
 <Typography variant="body-sm" tone="secondary">Cores, estados e componentes do contrato compartilhado.</Typography>
 <div className="flex flex-wrap gap-3" data-testid="buttons">
 <Button data-testid="primary">Salvar alterações</Button><Button tone="secondary">Cancelar</Button><Button tone="danger">Excluir registro</Button><Button variant="outline">Exportar</Button><Button variant="ghost">Consultar</Button><Button disabled>Indisponível</Button><Button isLoading>Salvando</Button>
 </div>
 <div className="flex flex-wrap gap-3">{(['success','warning','error','info','brand','neutral'] as const).map(t=><Badge key={t} tone={t}>{t}</Badge>)}</div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <FormField id="name" label="Nome"><Input placeholder="Nome completo" /></FormField><FormField id="email" label="E-mail" error="Informe um e-mail válido"><Input defaultValue="inválido" /></FormField><Input aria-label="Campo desabilitado" disabled value="Sem edição"/><SearchBar defaultValue="Solide" /></div>
 <SegmentedTabs idPrefix="review" options={[{id:'all',label:'Todos'},{id:'pending',label:'Pendentes'},{id:'disabled',label:'Bloqueados',disabled:true}]} value={tab} onChange={setTab}/>
 <div id={`review-panel-${tab}`} role="tabpanel" aria-labelledby={`review-tab-${tab}`}><DataTable columns={[{key:'name',header:'Nome',sortable:true},{key:'status',header:'Situação',render:()=> <Badge tone="success">Ativo</Badge>}]} data={[{id:'1',name:'Secretaria de Administração',status:'Ativo'},{id:'2',name:'Unidade de Gestão',status:'Ativo'}]} keyField="id" selectedIds={selected} onSelectionChange={setSelected}/></div>
 <ModalHeader title="Detalhes do registro" subtitle="Informações de cadastro" onClose={()=>{}}/>
 <EmptyState title="Nenhum resultado" description="Ajuste os filtros para encontrar um registro." actionLabel="Limpar filtros" onAction={()=>{}}/>
 <details><summary>Autenticação</summary><AuthLayout title="Entrar na sua conta"><Input aria-label="E-mail de acesso"/><Button>Entrar</Button></AuthLayout></details>
 </DashboardLayout>
}
createRoot(document.getElementById('root')!).render(<App/>);
