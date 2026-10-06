import { TMessageStore } from './';

/**
 * Сравнивает сообщения по времени создания.
 * @param messageA
 * @param messageB
 * @returns Разница времени создания между первым и вторым сообщением.
 */
export const sortMessagesByTime = (
	messageA: TMessageStore,
	messageB: TMessageStore,
) =>
	(new Date(messageA.timeCreated).getTime() || 0) -
	(new Date(messageB.timeCreated).getTime() || 0);
