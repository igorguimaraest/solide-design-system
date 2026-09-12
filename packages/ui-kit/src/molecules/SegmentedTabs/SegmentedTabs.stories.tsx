import React,{useState} from 'react';
import {SegmentedTabs} from './SegmentedTabs';
export default {title:'Molecules/SegmentedTabs',component:SegmentedTabs};
export function Default(){const [value,setValue]=useState('all');return <><SegmentedTabs idPrefix="example" value={value} onChange={setValue} options={[{id:'all',label:'Todos'},{id:'pending',label:'Pendentes'},{id:'blocked',label:'Bloqueado',disabled:true}]}/><div role="tabpanel" id={`example-panel-${value}`} aria-labelledby={`example-tab-${value}`}>{value}</div></>}
