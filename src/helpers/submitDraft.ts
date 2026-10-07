/** A synchronous lock covers uploads and dispatch, including rapid keyboard submits. */
export async function submitDraft(
	lock: { current: boolean },
	upload: () => Promise<string[] | undefined>,
	isCurrent: () => boolean,
	send: (fileIds: string[]) => void,
): Promise<boolean> {
	if (lock.current) return false;
	lock.current = true;
	try {
		const fileIds = await upload();
		if (!fileIds || !isCurrent()) return false;
		send(fileIds);
		return true;
	} finally {
		lock.current = false;
	}
}
