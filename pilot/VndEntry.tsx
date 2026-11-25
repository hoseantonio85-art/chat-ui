import React, {useEffect, useRef, useState} from 'react';
import './vnd.css';
import { VndUploadDialog } from './VndUploadDialog';
export function VndEntry({onOpen}: {onOpen: (welcome: boolean, query?: string, file?: File) => void | Promise<void>}) {
  const [page, setPage] = useState(location.hash === '#knowledge' ? 'knowledge' : 'home');
  const [upload, setUpload] = useState(false);
  const [news, setNews] = useState(false);
  const [query, setQuery] = useState('');
  const bell = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => { const sync = () => {setPage(location.hash === '#knowledge' ? 'knowledge' : 'home'); setNews(false);}; window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync); }, []);
  useEffect(() => {
    if (!news) return;
    close.current?.focus();
    const key = (e: KeyboardEvent) => {if(e.key === 'Escape') {setNews(false); bell.current?.focus();} if(e.key === 'Tab') {e.preventDefault(); const buttons = document.querySelectorAll<HTMLButtonElement>('.vnd-news button'); (document.activeElement === buttons[0] ? buttons[1] : buttons[0])?.focus();}};
    document.addEventListener('keydown', key); return () => document.removeEventListener('keydown', key);
  }, [news]);
  const go = (next: string) => {location.hash = next; setPage(next); setNews(false); window.scrollTo(0,0);};
  const hotspot = (label: string, rect: number[], action: () => void, ref?: React.Ref<HTMLButtonElement>) => <button ref={ref} className="vnd-hotspot" aria-label={label} title={label} style={{left:`${rect[0]/34.56}%`, top:`${rect[1]/20}%`, width:`${rect[2]/34.56}%`, height:`${rect[3]/20}%`}} onClick={action}/>;
  return <main className="vnd-entry">
    <div className="vnd-canvas">
      <img className="vnd-background" src={`${import.meta.env.BASE_URL}vnd/${page === 'home' ? 'home' : 'knowledge'}.jpg`} alt={page === 'home' ? 'Главная страница НОРМ. Демонстрационные данные.' : 'База знаний Норма AI. Демонстрационные документы.'}/>
      {page === 'home' ? <>
        {hotspot('База знаний', [48,1045,480,80], () => go('knowledge'))}
        {hotspot('Новости', [2984,96,128,128], () => setNews(true), bell)}
        {hotspot('Проверить стандарты', [2450,560,806,104], () => onOpen(true))}
        {hotspot('Открыть чат', [780,376,160,144], () => onOpen(false))}
        <form className="vnd-query" onSubmit={e => {e.preventDefault(); onOpen(false,query.trim()); setQuery('');}}>
          <input aria-label="Запрос помощнику" placeholder="Я твой ИИ помощник" onClick={() => {onOpen(false,query.trim()); setQuery('');}} value={query} onChange={e => setQuery(e.target.value)}/>
        </form>
      </> : <>
        {hotspot('Главная', [48,368,80,80], () => go('home'))}
        {hotspot('Добавить документы в Стандарты', [2118,668,74,74], () => setUpload(true))}
        {hotspot('Поехали!', [2760,296,248,80], () => onOpen(true))}
        {hotspot('Проверить ВНД', [1768,1840,488,80], () => onOpen(true))}
        {hotspot('Открыть чат Норма', [2270,1820,130,125], () => onOpen(false))}
      </>}
    </div>
    {upload && <VndUploadDialog onClose={() => setUpload(false)} onChat={() => {setUpload(false); onOpen(true);}} onSubmit={async file => {await onOpen(false, undefined, file); setUpload(false);}}/>}
    {news && <div className="vnd-news-overlay" onMouseDown={e => {if(e.target === e.currentTarget) {setNews(false); bell.current?.focus();}}}>
      <section className="vnd-news" role="dialog" aria-modal="true" aria-label="Новости">
        <img src={`${import.meta.env.BASE_URL}vnd/news.png`} alt="Новости: появилась проверка ВНД на соответствие стандартам группы"/>
        <button ref={close} className="vnd-hotspot" style={{left:'87%',top:'3.2%',width:'8%',height:'4%'}} aria-label="Закрыть новости" onClick={() => {setNews(false); bell.current?.focus();}}/>
        <button className="vnd-hotspot" style={{left:'5.3%',top:'10.4%',width:'89.4%',height:'17.6%'}} aria-label="Проверка ВНД — перейти в базу знаний" onClick={() => go('knowledge')}/>
      </section>
    </div>}
  </main>;
}
