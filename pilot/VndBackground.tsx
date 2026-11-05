import React, {useEffect, useRef, useState} from 'react';
import {Button} from '@sber-orm/ui-kit';
import {chat$} from './mocks/auth';
import {ERoles, type IMessage} from '@/types';
import type {ChatThread} from '../src/components/ThreadDrawer/context';
import {createRun, appendEvent, type AgentRun} from '../src/components/AgentActivity/model';

export interface BackgroundThread extends ChatThread {
  jobState?: 'running' | 'ready' | 'saved';
  documentIds?: string;
  documentName?: string;
  folder?: string;
}
const folders = ['Операционные риски', 'Внутренние нормативные документы', 'Методология'];
export function useVndBackground<T extends BackgroundThread>(options: {
  activeId: React.MutableRefObject<string>;
  getThreads: () => T[];
  update: (change: (items:T[]) => T[]) => void;
  snapshot: () => unknown;
  append: (message:IMessage) => void;
  open: (id:string) => void;
  publishRun: (id:string, run:AgentRun) => void;
}) {
  const latest = useRef(options); latest.current = options;
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const [notices,setNotices] = useState<{id:string; unread:boolean}[]>([]);
  const [panel,setPanel] = useState(false);
  const [folderDialog,setFolderDialog] = useState<string>();
  const [folder,setFolder] = useState(folders[0]);
  const [knowledge,setKnowledge] = useState(false);
  const [files,setFiles] = useState<{id:string; name:string; folder:string; documentIds:string}[]>([]);
  const [chatOpen,setChatOpen] = useState(chat$.value.isPortalOpen);
  useEffect(() => { const sub=chat$.observer$.subscribe({next:value=>{setChatOpen(value.isPortalOpen); if(value.isPortalOpen) markRead(latest.current.activeId.current);}}); return ()=>{sub.unsubscribe(); timers.current.forEach(clearTimeout);}; },[]);
  const markRead = (id:string) => {
    setNotices(items=>items.map(item=>item.id===id?{...item,unread:false}:item));
    latest.current.update(items=>items.map(item=>item.id===id?{...item,unread:false}:item));
  };
  const openResult = (id:string) => {latest.current.open(id); chat$.openChat(); markRead(id); setPanel(false);};
  const start = (id:string, documentIds:string, documentName:string) => {
    if(timers.current.has(id)) return;
    const startedAt = Date.now();
    const pendingId = `vnd-background-${crypto.randomUUID()}`;
    const pending:IMessage={id:pendingId,role:ERoles.bot,text:'',extras:{agentPending:'true'},timeCreated:new Date(startedAt).toISOString()};
    let run=createRun(pendingId,`vnd-request-${crypto.randomUUID()}`,startedAt);
    run=appendEvent(run,{id:`${pendingId}-plan`,runId:pendingId,at:startedAt,kind:'plan',tool:'write_todos',todos:[{content:'Изучить документ',status:'in_progress'},{content:'Сверить с групповым стандартом',status:'pending'}]});
    run={...run,currentActivity:'Проверяю ВНД по групповому стандарту…'};
    latest.current.append(pending);
    latest.current.publishRun(id,run);
    latest.current.snapshot();
    latest.current.update(items=>items.map(item=>item.id===id?{...item,jobState:'running',documentIds,documentName,unread:false}:item));
    timers.current.set(id,setTimeout(()=>{
      timers.current.delete(id);
      if(!latest.current.getThreads().some(item=>item.id===id)) return;
      const visible=latest.current.activeId.current===id && chat$.value.isPortalOpen && document.visibilityState==='visible';
      run=appendEvent(run,{id:`${pendingId}-complete`,runId:pendingId,at:Date.now(),kind:'plan',tool:'write_todos',todos:[{content:'Изучить документ',status:'completed'},{content:'Сверить с групповым стандартом',status:'completed'}]});
      run=appendEvent(run,{id:`${pendingId}-finish`,runId:pendingId,at:Date.now(),kind:'finish'});
      latest.current.publishRun(id,run);
      const message:IMessage={id:crypto.randomUUID(),role:ERoles.bot,text:'**Проверка завершена.** Отклонений от выбранного группового стандарта не найдено.\n\nПредлагаю сохранить актуальный ВНД в базу знаний, в папку «Операционные риски». **Напишите «Да»**, чтобы подтвердить, или укажите другую папку: «Внутренние нормативные документы» или «Методология».',timeCreated:new Date().toISOString()};
      if(latest.current.activeId.current===id) {latest.current.append(message); latest.current.snapshot();}
      latest.current.update(items=>items.map(item=>item.id===id?{...item,jobState:'ready',unread:!visible,updatedAt:Date.now(),...((latest.current.activeId.current!==id)?{messages:[...(item as T & {messages:IMessage[]}).messages,message]}:{})}:item));
      setNotices(items=>[{id,unread:!visible},...items.filter(item=>item.id!==id)]);
    },10000));
  };
  const save = (id:string, targetFolder = folder) => {
    const thread=latest.current.getThreads().find(item=>item.id===id);
    if(!thread || thread.jobState!=='ready') return;
    setFiles(items=>[...items.filter(item=>item.id!==id),{id,name:thread.documentName || 'ВНД.docx',folder:targetFolder,documentIds:thread.documentIds || '[]'}]);
    latest.current.append({id:crypto.randomUUID(),role:ERoles.bot,text:`Сохранил «${thread.documentName || 'ВНД.docx'}» в базу знаний, в папку «${targetFolder}».`,timeCreated:new Date().toISOString()});
    latest.current.snapshot();
    latest.current.update(items=>items.map(item=>item.id===id?{...item,jobState:'saved',folder:targetFolder,unread:false,updatedAt:Date.now()}:item));
    setFolderDialog(undefined);
  };
  const saveFromChat = (id:string, text:string): boolean => {
    const input=text.trim().toLowerCase().replace(/[«»\"'.!?]/g,'').replace(/\\s+/g,' ');
    if (/^(нет|не надо|отмена|не сохранять|пока не сохраняй)/.test(input)) {
      latest.current.append({id:crypto.randomUUID(),role:ERoles.bot,text:'Хорошо, пока не сохраняю. Если решите сохранить ВНД позднее, напишите «Сохрани».',timeCreated:new Date().toISOString()});
      latest.current.snapshot();
      return true;
    }
    const targetFolder=folders.find(item=>input.includes(item.toLowerCase()));
    if (targetFolder || /^(да|давай|подтверждаю|сохранить|сохрани|сохраняй|ок|окей|хорошо)(\\b|$)/u.test(input)) {
      save(id,targetFolder || folders[0]);
      return true;
    }
    return false;
  };
  const active=options.getThreads().find(item=>item.id===options.activeId.current);
  const cancel = (id:string) => {const timer=timers.current.get(id); if(timer) clearTimeout(timer); timers.current.delete(id); setNotices(items=>items.filter(item=>item.id!==id));};
  const legacySaveControls = false; // Retain the previous folder picker flow for a later iteration.
  return {start,markRead,cancel,saveFromChat, ui:<>
    {false && <div className="vnd-notification"><button aria-label="Уведомления" onClick={()=>setPanel(!panel)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg> Уведомления {notices.some(item=>item.unread)&&<span className="vnd-dot"/>}</button>{panel&&<div className="vnd-notice-panel"><strong>Уведомления</strong>{!notices.length&&<p>Новых уведомлений нет</p>}{notices.map(item=><button key={item.id} onClick={()=>openResult(item.id)}><strong>{item.unread?'● ':''}Проверка ВНД завершена</strong><span>Отклонений не найдено · Открыть чат</span></button>)}</div>}</div>}
    {legacySaveControls && chatOpen && active?.jobState==='ready'&&<div className="vnd-save-actions"><span>База знаний · {active.documentName}</span><Button size="S" onClick={()=>{setFolder(folders[0]);setFolderDialog(active.id);}}>Сохранить ВНД</Button><Button size="S" variant="secondary" onClick={()=>{setFolder(folders[0]);setFolderDialog(active.id);}}>Выбрать папку</Button></div>}
    {legacySaveControls && chatOpen && active?.jobState==='saved'&&<div className="vnd-save-actions"><span>ВНД сохранён в базе знаний</span><Button size="S" variant="secondary" onClick={()=>setKnowledge(true)}>Открыть в базе знаний</Button></div>}
    {legacySaveControls && folderDialog&&<div className="demo-action" role="dialog" aria-modal="true" aria-label="Сохранить ВНД"><h2>Сохранить ВНД в базу знаний</h2><p>{active?.documentName}</p><label>Папка<select autoFocus value={folder} onChange={e=>setFolder(e.target.value)}>{folders.map(item=><option key={item}>{item}</option>)}</select></label><p>Будет сохранён только актуальный файл ВНД.</p><div className="vnd-dialog-actions"><Button onClick={()=>save(folderDialog)}>Сохранить</Button><Button variant="secondary" onClick={()=>setFolderDialog(undefined)}>Отмена</Button></div></div>}
    {knowledge&&<div className="demo-action" role="dialog" aria-modal="true" aria-label="База знаний"><h2>База знаний</h2>{files.map(file=><div key={file.id} className="vnd-knowledge-file"><small>{file.folder}</small><strong>{file.name}</strong><span>Актуальная версия · DOCX</span></div>)}<p>Демонстрационное сохранение в прототипе.</p><Button variant="secondary" onClick={()=>setKnowledge(false)}>Вернуться в чат</Button></div>}
  </>};
}
