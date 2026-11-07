import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, EIconName, Icon } from '@sber-orm/ui-kit';
import { useThreadUi } from './context';
import classes from './styles.module.scss';

type DrawerView = 'history' | 'settings';
type Confirmation = 'memory' | 'chats';
type FocusTarget = 'settings' | 'memory-heading' | 'memory-clear' | 'chats-clear';

export function ThreadDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
	const ui = useThreadUi();
	const menuRef = useRef<HTMLDivElement>(null);
	const settingsBackRef = useRef<HTMLButtonElement>(null);
	const settingsEntryRef = useRef<HTMLButtonElement>(null);
	const memoryHeadingRef = useRef<HTMLHeadingElement>(null);
	const memoryClearRef = useRef<HTMLButtonElement>(null);
	const chatsClearRef = useRef<HTMLButtonElement>(null);
	const pendingFocusRef = useRef<FocusTarget>();
	const [view, setView] = useState<DrawerView>('history');
	const [confirmation, setConfirmation] = useState<Confirmation>();
	const [renaming, setRenaming] = useState<string>();
	const [draft, setDraft] = useState('');
	const [menu, setMenu] = useState<{ threadId: string; anchor: HTMLElement }>();
	const threads = useMemo(
		() => [...ui.threads].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt),
		[ui.threads],
	);
	const returnToHistory = () => {
		pendingFocusRef.current = 'settings';
		setConfirmation(undefined);
		setView('history');
	};
	const dismissConfirmation = () => {
		pendingFocusRef.current = confirmation === 'memory' ? 'memory-clear' : 'chats-clear';
		setConfirmation(undefined);
	};

	useEffect(() => {
		if (!open) {
			setMenu(undefined);
			setRenaming(undefined);
			setConfirmation(undefined);
			setView('history');
		}
	}, [open]);
	useEffect(() => {
		if (!open || menu) return;
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			event.preventDefault();
			if (confirmation) dismissConfirmation();
			else if (view === 'settings') returnToHistory();
			else onClose();
		};
		document.addEventListener('keydown', closeOnEscape);
		return () => document.removeEventListener('keydown', closeOnEscape);
	}, [confirmation, open, menu, onClose, view]);
	useEffect(() => {
		if (open && view === 'settings') settingsBackRef.current?.focus();
	}, [open, view]);
	useEffect(() => {
		const target = pendingFocusRef.current;
		if (!target) return;
		const elements: Record<FocusTarget, HTMLElement | null> = {
			settings: settingsEntryRef.current,
			'memory-heading': memoryHeadingRef.current,
			'memory-clear': memoryClearRef.current,
			'chats-clear': chatsClearRef.current,
		};
		elements[target]?.focus();
		pendingFocusRef.current = undefined;
	}, [confirmation, ui.agentMemory.length, ui.threads.length, view]);
	useEffect(() => {
		if (!menu) return;
		const outside = (event: PointerEvent) => { if (!menuRef.current?.contains(event.target as Node) && !menu.anchor.contains(event.target as Node)) setMenu(undefined); };
		const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.stopPropagation(); menu.anchor.focus(); setMenu(undefined); } };
		document.addEventListener('pointerdown', outside);
		document.addEventListener('keydown', escape);
		menuRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
		return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
	}, [menu]);
	if (!open) return null;

	const confirmAction = () => {
		if (confirmation === 'memory') {
			pendingFocusRef.current = 'memory-heading';
			ui.onClearMemory();
			setConfirmation(undefined);
			return;
		}
		if (confirmation === 'chats') {
			ui.onClearAll();
			returnToHistory();
		}
	};

	return <div className={classes.layer}>
		<button className={classes.scrim} type="button" aria-label="Закрыть панель" onClick={onClose}/>
		<aside className={`${classes.drawer} ${view === 'settings' ? classes.drawerSecond : ''}`} aria-label={view === 'settings' ? 'Настройки агента' : 'История диалогов'}>
			{view === 'history' ? <HistoryView ui={ui} threads={threads} menu={menu} menuRef={menuRef} renaming={renaming} draft={draft} onClose={onClose} setDraft={setDraft} setMenu={setMenu} setRenaming={setRenaming} settingsEntryRef={settingsEntryRef} onOpenSettings={() => setView('settings')}/> : <>
				<header className={classes.settingsHeader}>
					<button ref={settingsBackRef} className={classes.backButton} type="button" aria-label="Вернуться к истории" onClick={returnToHistory}><Icon name={EIconName.arrowLeft} width={20} height={20}/></button>
					<div><strong>Настройки</strong><span>Память агента и история чатов</span></div>
				</header>
				<div className={classes.settingsContent}>
					<section className={classes.settingsSection} aria-labelledby="agent-memory-title">
						<div className={classes.sectionHeading}><div><h2 ref={memoryHeadingRef} tabIndex={-1} id="agent-memory-title">Память агента</h2><span>{ui.agentMemory.length ? `Сохранено: ${ui.agentMemory.length}` : 'Память пуста'}</span></div></div>
						<p className={classes.sectionNote}>Факты о вас и предпочтениях, которые агент использует во всех чатах.</p>
						{ui.agentMemory.length ? <ul className={classes.memoryList}>{ui.agentMemory.map((fact, index) => <li key={`${index}-${fact}`}><span>{fact}</span><button type="button" aria-label={`Забыть: ${fact}`} onClick={() => { pendingFocusRef.current = 'memory-heading'; ui.onForgetMemory(fact); }}><Icon name={EIconName.trash} width={17} height={17}/></button></li>)}</ul> : <div className={classes.emptyMemory}>Пока ничего. Агент запомнит только то, что вы сообщите о себе и предпочитаемом формате работы.</div>}
						{confirmation === 'memory' ? <ConfirmationBox title="Очистить память агента?" text="Все сохранённые факты будут удалены. Это действие нельзя отменить." confirmLabel="Очистить память" onCancel={dismissConfirmation} onConfirm={confirmAction}/> : <button ref={memoryClearRef} className={classes.dangerButton} type="button" disabled={!ui.agentMemory.length} onClick={() => setConfirmation('memory')}>Очистить память</button>}
					</section>
					<section className={classes.settingsSection} aria-labelledby="chat-history-title">
						<div className={classes.sectionHeading}><div><h2 id="chat-history-title">История чатов</h2><span>{ui.threads.length} в истории</span></div></div>
						<p className={classes.sectionNote}>Удалятся все диалоги и результаты работы агента. Память агента останется без изменений.</p>
						{confirmation === 'chats' ? <ConfirmationBox title="Удалить все чаты?" text={`Будут удалены все диалоги (${ui.threads.length}) и остановлены фоновые задачи. Действие нельзя отменить.`} confirmLabel="Удалить все" onCancel={dismissConfirmation} onConfirm={confirmAction}/> : <button ref={chatsClearRef} className={classes.dangerButton} type="button" onClick={() => setConfirmation('chats')}>Удалить все чаты</button>}
					</section>
				</div>
			</>}
		</aside>
	</div>;
}

type HistoryViewProps = {
	ui: ReturnType<typeof useThreadUi>;
	threads: ReturnType<typeof useThreadUi>['threads'];
	menu?: { threadId: string; anchor: HTMLElement };
	menuRef: React.RefObject<HTMLDivElement>;
	renaming?: string;
	draft: string;
	onClose: () => void;
	setDraft: React.Dispatch<React.SetStateAction<string>>;
	setMenu: React.Dispatch<React.SetStateAction<{ threadId: string; anchor: HTMLElement } | undefined>>;
	setRenaming: React.Dispatch<React.SetStateAction<string | undefined>>;
	settingsEntryRef: React.RefObject<HTMLButtonElement>;
	onOpenSettings: () => void;
};

function HistoryView({ ui, threads, menu, menuRef, renaming, draft, onClose, setDraft, setMenu, setRenaming, settingsEntryRef, onOpenSettings }: HistoryViewProps) {
	return <>
		<header><div><strong>Диалоги</strong><span>История сохраняет ход работы агента</span></div></header>
		<Button className={classes.newButton} icon={EIconName.message} variant="secondary" onClick={() => { ui.onNew(); onClose(); }}>Новый чат</Button>
		<div className={classes.groups}>{[
			{ title: 'Закреплённые', items: threads.filter(thread => thread.pinned) },
			{ title: 'Недавние', items: threads.filter(thread => !thread.pinned) },
		].filter(group => group.items.length > 0).map(group => <section key={group.title} aria-label={group.title}>
			<h3 className={classes.groupTitle}>{group.title}</h3>
			<ul className={classes.list}>{group.items.map(thread => <li key={thread.id} data-active={thread.id === ui.activeThreadId} data-menu-open={menu?.threadId === thread.id}>
				{renaming === thread.id ? <form onSubmit={event => { event.preventDefault(); if (draft.trim()) ui.onRename(thread.id, draft.trim()); setRenaming(undefined); }}><input autoFocus value={draft} onChange={event => setDraft(event.target.value)} aria-label="Название диалога"/><Button size="S" icon={EIconName.check} iconOnly aria-label="Сохранить"/></form> : <button className={classes.thread} type="button" onClick={() => { ui.onSelect(thread.id); onClose(); }}><span className={classes.threadLabel}><span className={`${classes.threadTitle} ${thread.agentState === 'running' ? classes.threadRunning : ''}`}>{thread.title}</span>{thread.agentUnread && thread.agentState === 'ready' && <i className={classes.readySparkle} aria-label="Новый результат работы агента"/>}</span></button>}
				{renaming !== thread.id && <button className={classes.more} type="button" aria-label={`Действия: ${thread.title}`} aria-haspopup="menu" aria-expanded={menu?.threadId === thread.id} onClick={event => { event.stopPropagation(); const anchor = event.currentTarget; setMenu(current => current?.threadId === thread.id ? undefined : {threadId:thread.id, anchor}); }}><Icon name={EIconName.kebabMenu} width={18} height={18}/></button>}
				{menu?.threadId === thread.id && <div ref={menuRef} className={classes.menu} role="menu" aria-label="Действия с диалогом" onKeyDown={event => {
					const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
					const index = items.indexOf(document.activeElement as HTMLButtonElement);
					if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus(); }
				}}>
					<button type="button" role="menuitem" onClick={() => { ui.onTogglePin(menu.threadId); setMenu(undefined); }}><Icon name={ui.threads.find(item => item.id === menu.threadId)?.pinned ? EIconName.pinOff : EIconName.pin} width={18} height={18}/><span>{ui.threads.find(item => item.id === menu.threadId)?.pinned ? 'Открепить' : 'Закрепить'}</span></button>
					<button type="button" role="menuitem" onClick={() => { const thread = ui.threads.find(item => item.id === menu.threadId); if (thread) { setDraft(thread.title); setRenaming(thread.id); } setMenu(undefined); }}><Icon name={EIconName.edit} width={18} height={18}/><span>Переименовать</span></button>
					<button className={classes.danger} type="button" role="menuitem" onClick={() => { ui.onDelete(menu.threadId); setMenu(undefined); }}><Icon name={EIconName.trash} width={18} height={18}/><span>Удалить</span></button>
				</div>}
			</li>)}</ul>
		</section>)}</div>
		<footer className={classes.drawerFooter}>
			<button ref={settingsEntryRef} className={classes.settingsEntry} type="button" onClick={onOpenSettings}>
				<span className={classes.settingsIcon}><Icon name={EIconName.settings} width={20} height={20}/></span>
				<span><strong>Настройки</strong><small>Память агента и история чатов</small></span>
				<Icon name={EIconName.arrowRightSmall} width={18} height={18}/>
			</button>
		</footer>
	</>;
}

function ConfirmationBox({ title, text, confirmLabel, onCancel, onConfirm }: { title: string; text: string; confirmLabel: string; onCancel: () => void; onConfirm: () => void }) {
	const cancelRef = useRef<HTMLButtonElement>(null);
	useEffect(() => { cancelRef.current?.focus(); }, []);
	return <div className={classes.confirmation} role="alert">
		<strong>{title}</strong>
		<p>{text}</p>
		<div><button ref={cancelRef} type="button" onClick={onCancel}>Отмена</button><button className={classes.confirmDanger} type="button" onClick={onConfirm}>{confirmLabel}</button></div>
	</div>;
}