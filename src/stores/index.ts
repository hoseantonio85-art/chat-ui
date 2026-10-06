import { type Action, action, atom, random } from '@reatom/framework';
import { navigateToUrl } from 'single-spa';

import {
	ALLOWED_EXTENSIONS,
	MAX_FILE_NAME_LENGTH,
	MAX_FILE_SIZE,
} from '@/config';
import {
	ERoles,
	type IAddActionOptions,
	type IAttachment,
	type IMessage,
	type ISkillInfo,
} from '@/types';
import { baseUrl$, chat$ } from '@n-orm/auth-mf-app';
import { validatorsSchema } from '@sber-orm/components';

import { sortMessagesByTime } from './utils';

const validatorCondition = {
	fileMaxSize: MAX_FILE_SIZE + 1,
	fileNameMaxLength: MAX_FILE_NAME_LENGTH + 1,
	fileAcceptExtensions: ALLOWED_EXTENSIONS,
};
const validatorProperty = {
	fileAcceptExtensions: 'fileName',
	fileMaxSize: 'size',
	fileNameMaxLength: 'fileName',
};

export type TMessageStore = IMessage & {
	remove: Action;
};

/**
 * Atoms
 */
// Атом для отслеживания состояния загрузки.
export const isLoadingAtom = atom(false, 'isLoadingAtom');
// Атом для отслеживания возможности загрузки истории сообщений.
export const canLoadHistoryAtom = atom(true, 'canLoadHistoryAtom');
// Атом для хранения списка сообщений.
export const messagesAtom = atom<TMessageStore[]>([], 'messagesAtom');
// Атом для хранения введенного пользователем в чат текста.
export const textAtom = atom<string>('', 'textAtom');
// Атом для хранения вложений добавленных пользователем.
export const attachmentsAtom = atom<IAttachment[]>([], 'attachmentsAtom');
// Атом для хранения контекста чата.
export const contextChatAtom = atom(
	null as null | Record<string, string | null>,
	'contextChatAtom',
);
// Атом для хранения списка навыков.
export const skillsAtom = atom<ISkillInfo[]>([], 'skillsAtom');

/**
 * Computed atoms
 */
// Вычисляемый атом для сортировки списка сообщений.
export const sortMessagesAtom = atom(
	(context) => context.spy(messagesAtom).sort(sortMessagesByTime),
	'sortMessagesAtom',
);

// Вычисляемый атом для проверки доступности создания инцидента.
export const isCreateIncidentAvailable = atom(
	(context) => context.spy(contextChatAtom)?.intent === 'createIncident',
	'isCreateIncidentAvailable',
);

/**
 * Создает расширенное сообщение с методом удаления.
 * @param message - Сообщение для создания.
 * @returns Расширенное сообщение с методом удаления.
 */
const createMessageStore = (message: IMessage): TMessageStore => {
	const name = `message#${random(1, 1e10)}`;

	return {
		...message,
		remove: action(
			(context) =>
				messagesAtom(context, (list) =>
					list.filter((element) => element !== message),
				),
			`${name}.remove`,
		),
	} as TMessageStore;
};

/**
 * Добавляет новое сообщение в список сообщений.
 * @param context - Контекст Reatom.
 * @param message - Сообщение для добавления.
 * @param options - Опции для добавления сообщения.
 * @param options.silent - Если true, системные сообщения будут пропущены..
 * @param options.insertToTop - Если true, сообщение будет вставлено в начало списка.
 */
export const addMessageAction = action(
	(context, message: IMessage, options?: IAddActionOptions) => {
		if (message.role === ERoles.system && !options?.silent) {
			return;
		}

		const newMessage = createMessageStore(message);

		messagesAtom(context, (list) => {
			const existingMessageIndex = list.findLastIndex(
				(m) => m.id === newMessage.id,
			);
			const lastUserMessageIndex = list.findLastIndex(
				(m) => m.id === newMessage.requestId,
			);

			if (existingMessageIndex === -1) {
				if (options?.insertToTop) {
					list.unshift(newMessage);
				} else {
					list.push(newMessage);
				}

				lastUserMessageIndex !== -1 && isLoadingAtom(context, false);

				if (
					newMessage.extras?.action === 'createIncident' &&
					!options?.silent
				) {
					chat$.closeChat();
					navigateToUrl(
						`${baseUrl$.incidents ?? ''}/create?requestId=${newMessage.requestId}&startModalUrl=${location.pathname}`,
					);

					contextChatAtom(context, () => null);
				}
			} else {
				list[existingMessageIndex] = newMessage;
			}

			return [...list];
		});
	},
	'addMessageAction',
);

/**
 * Добавляет вложение в атом вложений.
 * @param context - Контекст Reatom.
 * @param item - Новое вложение.
 */
export const addAttachment = action((context, item: IAttachment) => {
	attachmentsAtom(context, (list) => [...list, item]);
}, 'addAttachment');

/**
 * Удаляет вложение из атома вложений.
 * @param context - Контекст Reatom.
 * @param id - Идентификатор вложения для удаления.
 */
export const removeAttachment = action((context, id: string) => {
	attachmentsAtom(context, (list) => [
		...list.filter((file) => file.fileId !== id),
	]);
}, 'removeAttachment');

/**
 * Добавляет ошибку к вложению.
 * @param context - Контекст Reatom.
 * @param error - Текст ошибки.
 * @param id - Идентификатор вложения для удаления.
 */
export const addAttachmentError = action(
	(context, id: string, error: string) => {
		attachmentsAtom(context, (list) => [
			...list.map((file) => {
				if (file.fileId === id) {
					return {
						...file,
						errors: [...file.errors, error],
					};
				}

				return file;
			}),
		]);
	},
	'addAttachmentError',
);

/**
 * Добавляет ошибку к вложению.
 * @param context - Контекст Reatom.
 * @param id - Идентификатор вложения для удаления.
 * @param progress - Прогресс загрузки.
 */
export const changeAttachmentProgress = action(
	(context, id: string, progress: number) => {
		attachmentsAtom(context, (list) => [
			...list.map((file) => {
				if (file.fileId === id) {
					return {
						...file,
						progress,
					};
				}

				return file;
			}),
		]);
	},
	'changeAttachmentProgress',
);

/**
 * Добавляет ошибку к вложению.
 * @param context - Контекст Reatom.
 */
export const validateAttachments = action((context) => {
	attachmentsAtom(context, (list) => [
		...list.map((file) => {
			const errors: string[] = [];

			for (const validateType of [
				'fileAcceptExtensions',
				'fileMaxSize',
				'fileNameMaxLength',
			]) {
				// @ts-expect-error
				const validateAction = validatorsSchema[validateType];

				const validation = validateAction?.(
					// @ts-expect-error
					file[validatorProperty[validateType]] ?? file,
					// @ts-expect-error
					validatorCondition?.[validateType],
				);

				if (validation && !validation.valid) {
					errors.push(validation.message);
				}
			}

			if (errors.length) {
				return {
					...file,
					errors,
				};
			}

			return file;
		}),
	]);
}, 'addAttachmentError');

/**
 * Добавляет список навыков в атом навыков.
 * @param context - Контекст Reatom.
 * @param items - Список навыков для добавления.
 */
export const addSkillsAction = action((context, items: ISkillInfo[]) => {
	skillsAtom(context, [...items]);
}, 'addSkillsAction');

/**
 * Сбрасывает список сообщений.
 * @param context - Контекст Reatom.
 */
export const resetAction = action((context) => {
	messagesAtom(context, () => new Array<TMessageStore>());
}, 'resetAction');

/**
 * Очищает контекст чата.
 * @param context - Контекст Reatom.
 */
export const clearContextChatAction = action((context) => {
	contextChatAtom(context, () => null);
}, 'clearContextChat');
