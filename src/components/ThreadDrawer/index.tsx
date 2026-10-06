import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, EIconName, Icon } from '@sber-orm/ui-kit';
import { useThreadUi } from './context';
import classes from './styles.module.scss';

export function ThreadDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
	const ui = useThreadUi();
	const menuRef = useRef<HTMLDivElement>(null);
	const [renaming, setRenaming] = useState<string>();
	const [draft, setDraft] = useState('');
	const [menu, setMenu] = useState<{ threadId: string; anchor: HTMLElement }>();
	const threads = useMemo(
		() => [...ui.threads].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt),
		[ui.threads],
	);
	useEffect(() => { if (!open) { setMenu(undefined); setRenaming(undefined); } }, [open]);
	useEffect(() => {
		if (!open || menu) return;
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') { event.preventDefault(); onClose(); }
		};
		document.addEventListener('keydown', closeOnEscape);
		return () => document.removeEventListener('keydown', closeOnEscape);
	}, [open, menu, onClose]);

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
	return <div className={classes.layer}>
		<button className={classes.scrim} type="button" aria-label="Закрыть историю" onClick={onClose}/>
		<aside className={classes.drawer} aria-label="История диалогов">
			<header><div><strong>Диалоги</strong><span>История сохраняет ход работы агента</span></div></header>
			<Button className={classes.newButton} icon={EIconName.message} variant="secondary" onClick={() => { ui.onNew(); onClose(); }}>Новый чат</Button>
			<div className={classes.groups}>{[
				{ title: 'Закреплённые', items: threads.filter(thread => thread.pinned) },
				{ title: 'Недавние', items: threads.filter(thread => !thread.pinned) },
			].filter(group => group.items.length > 0).map(group => <section key={group.title} aria-label={group.title}>
				<h3 className={classes.groupTitle}>{group.title}</h3>
			<ul className={classes.list}>{group.items.map(thread => <li key={thread.id} data-active={thread.id === ui.activeThreadId} data-menu-open={menu?.threadId === thread.id}>
				{renaming === thread.id ? <form onSubmit={event => { event.preventDefault(); if (draft.trim()) ui.onRename(thread.id, draft.trim()); setRenaming(undefined); }}><input autoFocus value={draft} onChange={event => setDraft(event.target.value)} aria-label="Название диалога"/><Button size="S" icon={EIconName.check} iconOnly aria-label="Сохранить"/></form> : <button className={classes.thread} type="button" onClick={() => { ui.onSelect(thread.id); onClose(); }}><span>{thread.title}</span></button>}
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

		</aside>
	</div>;
}

