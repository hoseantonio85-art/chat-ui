import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, EIconName, Icon, Popover, Row, Text, Title, Tooltip } from '@sber-orm/ui-kit';
import { useThreadUi } from './context';
import { groupThreadsForHistory } from './history';
import { getDeletionCopy, type SettingsDeletionTarget } from './settings';
import classes from './styles.module.scss';

type DrawerView = 'history' | 'settings';
type FocusTarget = 'settings' | 'memory-heading' | HTMLElement;
type ActiveDeletion = { target: SettingsDeletionTarget; anchor: HTMLButtonElement };

export function ThreadDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
	const ui = useThreadUi();
	const menuRef = useRef<HTMLDivElement>(null);
	const settingsBackRef = useRef<HTMLButtonElement>(null);
	const settingsEntryRef = useRef<HTMLButtonElement>(null);
	const memoryHeadingRef = useRef<HTMLHeadingElement>(null);
	const popoverRef = useRef<HTMLDivElement>(null);
	const popoverCancelRef = useRef<HTMLButtonElement>(null);
	const pendingFocusRef = useRef<FocusTarget>();
	const [view, setView] = useState<DrawerView>('history');
	const [deletion, setDeletion] = useState<ActiveDeletion>();
	const [renaming, setRenaming] = useState<string>();
	const [draft, setDraft] = useState('');
	const [menu, setMenu] = useState<{ threadId: string; anchor: HTMLElement }>();
	const threads = useMemo(
		() => [...ui.threads].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt),
		[ui.threads],
	);
	const returnToHistory = () => {
		pendingFocusRef.current = 'settings';
		setDeletion(undefined);
		setView('history');
	};
	const closeDeletion = () => {
		if (deletion?.anchor.isConnected) pendingFocusRef.current = deletion.anchor;
		setDeletion(undefined);
	};

	useEffect(() => {
		if (!open) {
			setMenu(undefined);
			setRenaming(undefined);
			setDeletion(undefined);
			setView('history');
		}
	}, [open]);
	useEffect(() => {
		if (!open || menu) return;
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			event.preventDefault();
			if (deletion) return;
			if (view === 'settings') returnToHistory();
			else onClose();
		};
		document.addEventListener('keydown', closeOnEscape);
		return () => document.removeEventListener('keydown', closeOnEscape);
	}, [deletion, open, menu, onClose, view]);
	useEffect(() => {
		if (open && view === 'settings') settingsBackRef.current?.focus();
	}, [open, view]);
	useEffect(() => {
		const target = pendingFocusRef.current;
		if (!target) return;
		const element = typeof target === 'string'
			? target === 'settings' ? settingsEntryRef.current : memoryHeadingRef.current
			: target;
		(element?.isConnected ? element : memoryHeadingRef.current)?.focus();
		pendingFocusRef.current = undefined;
	}, [deletion, ui.agentMemory.length, ui.threads.length, view]);
	useEffect(() => {
		if (!deletion) return;
		const outside = (event: PointerEvent) => {
			const target = event.target as Node;
			if (!popoverRef.current?.contains(target) && !deletion.anchor.contains(target)) closeDeletion();
		};
		const escape = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			event.preventDefault();
			event.stopPropagation();
			closeDeletion();
		};
		document.addEventListener('pointerdown', outside);
		document.addEventListener('keydown', escape);
		requestAnimationFrame(() => popoverCancelRef.current?.focus());
		return () => {
			document.removeEventListener('pointerdown', outside);
			document.removeEventListener('keydown', escape);
		};
	}, [deletion]);
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

	const confirmDeletion = () => {
		if (!deletion) return;
		if (deletion.target.kind === 'memory-fact') {
			pendingFocusRef.current = 'memory-heading';
			ui.onForgetMemory(deletion.target.fact);
			setDeletion(undefined);
			return;
		}
		if (deletion.target.kind === 'memory-all') {
			pendingFocusRef.current = 'memory-heading';
			ui.onClearMemory();
			setDeletion(undefined);
			return;
		}
		ui.onClearAll();
		returnToHistory();
	};
	const deletionCopy = deletion ? getDeletionCopy(deletion.target, ui.threads.length) : undefined;

	return <div className={classes.layer}>
		<button className={classes.scrim} type="button" aria-label="Закрыть панель" onClick={onClose}/>
		<aside className={`${classes.drawer} ${view === 'settings' ? classes.drawerSecond : ''}`} aria-label={view === 'settings' ? 'Настройки агента' : 'История диалогов'}>
			{view === 'history' ? <HistoryView ui={ui} threads={threads} menu={menu} menuRef={menuRef} renaming={renaming} draft={draft} onClose={onClose} setDraft={setDraft} setMenu={setMenu} setRenaming={setRenaming} settingsEntryRef={settingsEntryRef} onOpenSettings={() => setView('settings')}/> : <>
				<header className={classes.settingsHeader}>
					<Tooltip content="Вернуться к истории" placement="bottom-start" showOnChildFocus>
						<Button ref={settingsBackRef} variant="ellipse" size="S" icon={EIconName.previousLarge} iconOnly aria-label="Вернуться к истории" onClick={returnToHistory}/>
					</Tooltip>
					<div><strong>Настройки</strong></div>
				</header>
				<div className={classes.settingsContent}>
					<section className={classes.settingsSection} aria-labelledby="chat-history-title">
						<div className={classes.sectionHeading}><div><h2 id="chat-history-title">История чатов</h2><span>{ui.threads.length} в истории</span></div></div>
						<p className={classes.sectionNote}>Удалятся все диалоги и результаты работы агента. Память агента останется без изменений.</p>
						<Button variant="danger" size="S" fullWidth onClick={event => setDeletion({ target: { kind: 'chats-all' }, anchor: event.currentTarget })}>Удалить все чаты</Button>
					</section>
					<section className={classes.settingsSection} aria-labelledby="agent-memory-title">
						<div className={classes.sectionHeading}><div><h2 ref={memoryHeadingRef} tabIndex={-1} id="agent-memory-title">Память агента</h2><span>{ui.agentMemory.length ? `Сохранено: ${ui.agentMemory.length}` : 'Память пуста'}</span></div></div>
						<p className={classes.sectionNote}>Факты о вас и предпочтениях, которые агент использует во всех чатах.</p>
						{ui.agentMemory.length ? <ul className={classes.memoryList}>{ui.agentMemory.map((fact, index) => <li key={`${index}-${fact}`}><span>{fact}</span><Tooltip content="Удалить из памяти" placement="left" showOnChildFocus><Button variant="ellipse" size="XS" icon={EIconName.trash} iconOnly aria-label={`Удалить из памяти: ${fact}`} onClick={event => setDeletion({ target: { kind: 'memory-fact', fact }, anchor: event.currentTarget })}/></Tooltip></li>)}</ul> : <div className={classes.emptyMemory}>Пока ничего. Агент запомнит только то, что вы сообщите о себе и предпочитаемом формате работы.</div>}
						<Button variant="danger" size="S" fullWidth disabled={!ui.agentMemory.length} onClick={event => setDeletion({ target: { kind: 'memory-all' }, anchor: event.currentTarget })}>Очистить память</Button>
					</section>
				</div>
			</>}
		</aside>
		{deletion && deletionCopy && <Popover
			ref={popoverRef}
			className={classes.deletePopover}
			open
			anchor={deletion.anchor}
			placement="top-end"
			fallbackPlacements={['bottom-end']}
			offset={8}
			withArrow
			role="dialog"
			aria-label={deletionCopy.title}
		>
			<div className={classes.deletePopoverContent}>
				<Title size="H600">{deletionCopy.title}</Title>
				<Text>{deletionCopy.text}</Text>
				<Row className={classes.deletePopoverButtons} gutter={8} noFlex>
					<Button ref={popoverCancelRef} autoFocus variant="secondary" size="XS" fullWidth onClick={closeDeletion}>Отмена</Button>
					<Button variant="danger" size="XS" fullWidth onClick={confirmDeletion}>{deletionCopy.confirmLabel}</Button>
				</Row>
			</div>
		</Popover>}
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
	const groups = groupThreadsForHistory(threads);
	return <>
		<header><div><strong>Диалоги</strong></div></header>
		<Button className={classes.newButton} icon={EIconName.message} variant="secondary" onClick={() => { ui.onNew(); onClose(); }}>Новый чат</Button>
		<div className={classes.groups}>{groups.map(group => <section key={group.title} aria-label={group.title}>
			<h3 className={classes.groupTitle}>{group.title}</h3>
			<ul className={classes.list}>{group.items.map(thread => <li key={thread.id} data-active={thread.id === ui.activeThreadId} data-menu-open={menu?.threadId === thread.id}>
				{renaming === thread.id ? <form onSubmit={event => { event.preventDefault(); if (draft.trim()) ui.onRename(thread.id, draft.trim()); setRenaming(undefined); }}><input autoFocus value={draft} onChange={event => setDraft(event.target.value)} aria-label="Название диалога"/><Tooltip content="Сохранить название" placement="top" showOnChildFocus><Button size="S" icon={EIconName.check} iconOnly aria-label="Сохранить"/></Tooltip></form> : <button className={classes.thread} type="button" onClick={() => { ui.onSelect(thread.id); onClose(); }}><span className={classes.threadLabel}><span className={`${classes.threadTitle} ${thread.agentState === 'running' ? classes.threadRunning : ''}`}>{thread.title}</span>{thread.agentUnread && thread.agentState === 'ready' && <i className={classes.readySparkle} aria-label="Новый результат работы агента"/>}</span></button>}
				{renaming !== thread.id && <Tooltip content="Действия с чатом" placement="left" showOnChildFocus><button className={classes.more} type="button" aria-label={`Действия: ${thread.title}`} aria-haspopup="menu" aria-expanded={menu?.threadId === thread.id} onClick={event => { event.stopPropagation(); const anchor = event.currentTarget; setMenu(current => current?.threadId === thread.id ? undefined : {threadId:thread.id, anchor}); }}><Icon name={EIconName.kebabMenu} width={18} height={18}/></button></Tooltip>}
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
