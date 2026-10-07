import { describe, expect, it, vi } from 'vitest';
import { submitDraft } from './submitDraft';

describe('submitDraft', () => {
	it('blocks double submit while files upload', async () => {
		let resolve!: (ids: string[]) => void;
		const upload = () => new Promise<string[]>(done => { resolve = done; });
		const lock = { current: false }, send = vi.fn();
		const pending = submitDraft(lock, upload, () => true, send);
		expect(await submitDraft(lock, upload, () => true, send)).toBe(false);
		resolve(['file']);
		expect(await pending).toBe(true);
		expect(send).toHaveBeenCalledExactlyOnceWith(['file']);
		expect(lock.current).toBe(false);
	});
	it('allows retry after a failed upload without sending a partial draft', async () => {
		const lock = { current: false }, send = vi.fn();
		expect(await submitDraft(lock, async () => undefined, () => true, send)).toBe(false);
		expect(send).not.toHaveBeenCalled();
		expect(await submitDraft(lock, async () => ['file'], () => true, send)).toBe(true);
	});
	it('does not send into a different conversation', async () => {
		const send = vi.fn();
		expect(await submitDraft({ current: false }, async () => [], () => false, send)).toBe(false);
		expect(send).not.toHaveBeenCalled();
	});
	it('releases the lock after a transport error', async () => {
		const lock = { current: false };
		await expect(submitDraft(lock, async () => [], () => true, () => { throw new Error('offline'); })).rejects.toThrow();
		expect(lock.current).toBe(false);
	});
});
