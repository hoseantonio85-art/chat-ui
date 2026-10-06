/* eslint-disable perfectionist/sort-objects */
import error from './locales/error.json';
import ruRU from './locales/ru-RU.json';

export const defaultLanguage = 'ru';
export const defaultNamespace = 'ruRU';

export const resources = {
	ru: {
		ruRU,
		error,
	},
} as const;
