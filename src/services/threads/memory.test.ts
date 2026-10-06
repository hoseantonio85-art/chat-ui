import { describe, expect, it } from 'vitest';

import { createMemoryThreadRepository } from './memory';

describe('memory thread repository', () => {
	it('implements the production repository contract for development', async () => {
		const repository = createMemoryThreadRepository();
		const created = await repository.create({
			title: 'Новый диалог',
			initialSkill: 'createIncident',
		});

		expect((await repository.list())[0]).toMatchObject({
			id: created.thread.id,
			initialSkill: 'createIncident',
		});

		const renamed = await repository.rename(created.thread.id, 'Событие');
		expect(renamed.title).toBe('Событие');

		const pinned = await repository.setPinned(created.thread.id, true);
		expect(pinned.pinned).toBe(true);

		await repository.delete(created.thread.id);
		expect(await repository.list()).toEqual([]);
	});

	it('returns copies instead of mutable repository state', async () => {
		const repository = createMemoryThreadRepository();
		const created = await repository.create({ title: 'Диалог' });
		created.thread.title = 'Изменено снаружи';

		expect((await repository.load(created.thread.id)).thread.title).toBe('Диалог');
	});
});
