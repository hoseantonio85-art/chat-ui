import React, {useLayoutEffect, useRef, useState} from 'react';
import './VndUploadDialog.css';
export function VndUploadDialog({onClose,onChat,onSubmit}: {onClose:()=>void;onChat:()=>void;onSubmit:(file:File)=>Promise<void>}) {
  const dialog=useRef<HTMLDialogElement>(null);
  const [file,setFile]=useState<File>(); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
  useLayoutEffect(()=>{dialog.current?.showModal();return()=>dialog.current?.close();},[]);
  const choose=(value?:File)=>{setError('');if(value && value.size>15*1024*1024){setError('Размер файла не должен превышать 15 МБ.');return;}setFile(value);};
  const submit=async()=>{if(!file || busy)return;setBusy(true);try{await onSubmit(file);}catch{setError('Не удалось загрузить документ. Попробуйте ещё раз.');}finally{setBusy(false);}};
  return <dialog ref={dialog} className="vnd-upload-dialog" aria-labelledby="vnd-upload-title" onCancel={e=>{e.preventDefault();if(!busy)onClose();}} onClick={e=>{if(e.target===e.currentTarget && !busy)onClose();}}>
    <header><h2 id="vnd-upload-title">Загрузка документов</h2><button type="button" aria-label="Закрыть загрузку" onClick={onClose} disabled={busy}>×</button></header>
    <section className="vnd-upload-banner"><div><strong>Проверьте ВНД на соответствие стандартам группы</strong><p>Норм найдёт возможные отклонения и поможет сохранить актуальный документ.</p></div><button type="button" onClick={onChat} disabled={busy}>Проверить ВНД</button></section>
    <div className="vnd-upload-folder"><small>Область знаний</small><strong>📁 Стандарты</strong></div>
    <label className="vnd-upload-zone" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();if(!busy)choose(e.dataTransfer.files[0]);}}><span aria-hidden="true">♧</span><div>Перетащите документ сюда или <b>выберите вручную</b></div><small>Документы размером до 15 МБ</small><input type="file" aria-label="Документ для проверки ВНД" disabled={busy} onChange={e=>choose(e.target.files?.[0])}/></label>
    {file && <div className="vnd-upload-file"><span>{file.name}</span><small>{(file.size/1024).toFixed(0)} КБ</small><button type="button" aria-label="Удалить выбранный документ" disabled={busy} onClick={()=>choose()}>×</button></div>}
    {error && <p role="alert">{error}</p>}
    <footer><button type="button" disabled={busy} onClick={onClose}>Отменить</button><button type="button" disabled={!file || busy} onClick={submit}>{busy?'Загружаю…':'Отправить на проверку'}</button></footer>
  </dialog>;
}
