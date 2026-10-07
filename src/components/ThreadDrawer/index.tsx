import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, EIconName, Icon } from '@sber-orm/ui-kit';
import { useTranslation } from 'react-i18next';
import { useThreadUi } from './context';
import classes from './styles.module.scss';

export function ThreadDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { t } = useTranslation();
	const ui = useThreadUi();
	const drawerRef = useRef<HTMLElement>(null);
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
	useEffect(() => {
        if (!open) return;
        const previous = document.activeElement;
        const drawer = drawerRef.current;
        drawer?.focus();
        const trap = (event: KeyboardEvent) => {
            if (event.key !== 'Tab' || !drawer) return;
            const items = Array.from(drawer.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), [tabindex="0"]'));
            const first = items[0], last = items.at(-1);
            if (!first) { event.preventDefault(); drawer.focus(); return; }
            if (event.shiftKey && (document.activeElement === first || document.activeElement === drawer)) { event.preventDefault(); last?.focus(); }
            else if (!event.shiftKey && (document.activeElement === last || document.activeElement === drawer)) { event.preventDefault(); first.focus(); }
        };
        document.addEventListener('keydown', trap);
        return () => { document.removeEventListener('keydown', trap); if (previous instanceof HTMLElement && previous.isConnected) previous.focus(); };
    }, [open]);
    if (!open) return null;
	return <div className={classes.layer}>
		<button className={classes.scrim} type="button" aria-label={t('threads.close')} onClick={onClose}/>
		<aside ref={drawerRef} tabIndex={-1} role="dialog" aria-modal="true" className={classes.drawer} aria-label={t('threads.ariaLabel')}>
			{ui.busy && <p role="status">{t('threads.loading')}</p>}
            {ui.error && <div role="alert"><p>{t('threads.operationError')}</p>{ui.onRetry && <Button variant="secondary" onClick={ui.onRetry}>{t('threads.retry')}</Button>}</div>}
            <header><div><strong>{t('threads.title')}</strong><span>{t('threads.subtitle')}</span></div></header>
			<Button className={classes.newButton} icon={EIconName.message} variant="secondary" disabled={ui.busy} onClick={() => { ui.onNew(); }}>{t('threads.newChat')}</Button>
			<div className={classes.groups}>{[
				{ id: 'pinned', title: t('threads.pinned'), items: threads.filter(thread => thread.pinned) },
				{ id: 'recent', title: t('threads.recent'), items: threads.filter(thread => !thread.pinned) },
			].filter(group => group.items.length > 0).map(group => <section key={group.id} aria-label={group.title}>
				<h3 className={classes.groupTitle}>{group.title}</h3>
			<ul className={classes.list}>{group.items.map(thread => <li key={thread.id} data-active={thread.id === ui.activeThreadId} data-menu-open={menu?.threadId === thread.id}>
				{renaming === thread.id ? <form onSubmit={event => { event.preventDefault(); if (draft.trim() && !ui.busy) ui.onRename(thread.id, draft.trim()); setRenaming(undefined); }}><input autoFocus value={draft} onChange={event => setDraft(event.target.value)} aria-label={t('threads.threadName')}/><Button size="S" icon={EIconName.check} iconOnly disabled={ui.busy} aria-label={t('threads.save')}/></form> : <button className={classes.thread} type="button" disabled={ui.busy} onClick={() => { ui.onSelect(thread.id); }}><span>{thread.title}</span></button>}
				{renaming !== thread.id && <button className={classes.more} type="button" disabled={ui.busy} aria-label={t('threads.actionsFor', { title: thread.title })} aria-haspopup="menu" aria-expanded={menu?.threadId === thread.id} onClick={event => { event.stopPropagation(); const anchor = event.currentTarget; setMenu(current => current?.threadId === thread.id ? undefined : {threadId:thread.id, anchor}); }}><Icon name={EIconName.kebabMenu} width={18} height={18}/></button>}
			{menu?.threadId === thread.id && <div ref={menuRef} className={classes.menu} role="menu" aria-label={t('threads.actions')} onKeyDown={event => {
                  const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
                  const index = items.indexOf(document.activeElement as HTMLButtonElement);
                  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus(); }
                }}>
				<button type="button" role="menuitem" onClick={() => { ui.onTogglePin(menu.threadId); setMenu(undefined); }}><Icon name={ui.threads.find(item => item.id === menu.threadId)?.pinned ? EIconName.pinOff : EIconName.pin} width={18} height={18}/><span>{ui.threads.find(item => item.id === menu.threadId)?.pinned ? t('threads.unpin') : t('threads.pin')}</span></button>
				<button type="button" role="menuitem" onClick={() => { const thread = ui.threads.find(item => item.id === menu.threadId); if (thread) { setDraft(thread.title); setRenaming(thread.id); } setMenu(undefined); }}><Icon name={EIconName.edit} width={18} height={18}/><span>{t('threads.rename')}</span></button>
				<button className={classes.danger} type="button" role="menuitem" onClick={() => { ui.onDelete(menu.threadId); setMenu(undefined); }}><Icon name={EIconName.trash} width={18} height={18}/><span>{t('threads.delete')}</span></button>
			</div>}
			</li>)}</ul>
			</section>)}</div>

		</aside>
	</div>;
}

