export function forgetMemoryFact(facts: string[], fact: string): string[] {
	return facts.filter(item => item !== fact);
}

export function clearMemoryFacts(): string[] {
	return [];
}

export function resetThreads<T>(freshThread: T): T[] {
	return [freshThread];
}

export type SettingsDeletionTarget =
	| { kind: 'memory-fact'; fact: string }
	| { kind: 'memory-all' }
	| { kind: 'chats-all' };

export interface DeletionCopy {
	title: string;
	text: string;
	confirmLabel: string;
}

export function getDeletionCopy(target: SettingsDeletionTarget, chatCount: number): DeletionCopy {
	if (target.kind === 'memory-fact') {
		return {
			title: 'Удалить запись из памяти?',
			text: `«${target.fact}» больше не будет использоваться агентом.`,
			confirmLabel: 'Удалить',
		};
	}
	if (target.kind === 'memory-all') {
		return {
			title: 'Очистить память агента?',
			text: 'Все сохранённые факты будут удалены. Это действие нельзя отменить.',
			confirmLabel: 'Очистить',
		};
	}
	return {
		title: 'Удалить все чаты?',
		text: `Будут удалены все диалоги (${chatCount}) и остановлены фоновые задачи. Действие нельзя отменить.`,
		confirmLabel: 'Удалить все',
	};
}
