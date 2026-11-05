import React, {useEffect, useRef, useState} from 'react';
import {Button} from '@sber-orm/ui-kit';
import {chat$} from './mocks/auth';
import {ERoles, type IMessage} from '@/types';
import type {ChatThread} from '../src/components/ThreadDrawer/context';

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
    const pending:IMessage={id:crypto.randomUUID(),role:ERoles.bot,text:'Проверяю ВНД. Можно продолжить работу — сообщу, когда результат будет готов.',timeCreated:new Date().toISOString()};
    latest.current.append(pending); latest.current.snapshot();
    latest.current.update(items=>items.map(item=>item.id===id?{...item,jobState:'running',documentIds,documentName,unread:false}:item));
    timers.current.set(id,setTimeout(()=>{
      timers.current.delete(id);
      if(!latest.current.getThreads().some(item=>item.id===id)) return;
      const visible=latest.current.activeId.current===id && chat$.value.isPortalOpen && document.visibilityState==='visible';
      const message:IMessage={id:crypto.randomUUID(),role:ERoles.bot,text:'**Проверка завершена.** Отклонений от выбранного группового стандарта не найдено.\n\nСохранить актуальный ВНД в базу знаний? Предлагаю папку «Операционные риски».',timeCreated:new Date().toISOString()};
      if(latest.current.activeId.current===id) {latest.current.append(message); latest.current.snapshot();}
      latest.current.update(items=>items.map(item=>item.id===id?{...item,jobState:'ready',unread:!visible,updatedAt:Date.now(),...((latest.current.activeId.current!==id)?{messages:[...(item as T & {messages:IMessage[]}).messages,message]}:{})}:item));
      setNotices(items=>[{id,unread:!visible},...items.filter(item=>item.id!==id)]);
    },10000));
  };
  const save = (id:string) => {
    const thread=latest.current.getThreads().find(item=>item.id===id);
    if(!thread || thread.jobState!=='ready') return;
    setFiles(items=>[...items.filter(item=>item.id!==id),{id,name:thread.documentName || 'ВНД.docx',folder,documentIds:thread.documentIds || '[]'}]);
    latest.current.append({id:crypto.randomUUID(),role:ERoles.bot,text:`Сохранил «${thread.documentName || 'ВНД.docx'}» в базу знаний, в папку «${folder}».`,timeCreated:new Date().toISOString()});
    latest.current.snapshot();
    latest.current.update(items=>items.map(item=>item.id===id?{...item,jobState:'saved',folder,unread:false,updatedAt:Date.now()}:item));
    setFolderDialog(undefined);
  };
  const active=options.getThreads().find(item=>item.id===options.activeId.current);
  const cancel = (id:string) => {const timer=timers.current.get(id); if(timer) clearTimeout(timer); timers.current.delete(id); setNotices(items=>items.filter(item=>item.id!==id));};
  return {start,markRead,cancel, ui:<>
    <div className="vnd-notification"><button aria-label="Уведомления" onClick={()=>setPanel(!panel)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg> Уведомления {notices.some(item=>item.unread)&&<span className="vnd-dot"/>}</button>{panel&&<div className="vnd-notice-panel"><strong>Уведомления</strong>{!notices.length&&<p>Новых уведомлений нет</p>}{notices.map(item=><button key={item.id} onClick={()=>openResult(item.id)}><strong>{item.unread?'● ':''}Проверка ВНД завершена</strong><span>Отклонений не найдено · Открыть чат</span></button>)}</div>}</div>
    {chatOpen && active?.jobState==='ready'&&<div className="vnd-save-actions"><span>База знаний · {active.documentName}</span><Button size="S" onClick={()=>{setFolder(folders[0]);setFolderDialog(active.id);}}>Сохранить ВНД</Button><Button size="S" variant="secondary" onClick={()=>{setFolder(folders[0]);setFolderDialog(active.id);}}>Выбрать папку</Button></div>}
    {chatOpen && active?.jobState==='saved'&&<div className="vnd-save-actions"><span>ВНД сохранён в базе знаний</span><Button size="S" variant="secondary" onClick={()=>setKnowledge(true)}>Открыть в базе знаний</Button></div>}
    {folderDialog&&<div className="demo-action" role="dialog" aria-modal="true" aria-label="Сохранить ВНД"><h2>Сохранить ВНД в базу знаний</h2><p>{active?.documentName}</p><label>Папка<select autoFocus value={folder} onChange={e=>setFolder(e.target.value)}>{folders.map(item=><option key={item}>{item}</option>)}</select></label><p>Будет сохранён только актуальный файл ВНД.</p><div className="vnd-dialog-actions"><Button onClick={()=>save(folderDialog)}>Сохранить</Button><Button variant="secondary" onClick={()=>setFolderDialog(undefined)}>Отмена</Button></div></div>}
    {knowledge&&<div className="demo-action" role="dialog" aria-modal="true" aria-label="База знаний"><h2>База знаний</h2>{files.map(file=><div key={file.id} className="vnd-knowledge-file"><small>{file.folder}</small><strong>{file.name}</strong><span>Актуальная версия · DOCX</span></div>)}<p>Демонстрационное сохранение в прототипе.</p><Button variant="secondary" onClick={()=>setKnowledge(false)}>Вернуться в чат</Button></div>}
  </>};
}
