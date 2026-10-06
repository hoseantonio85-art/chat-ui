/* eslint-disable perfectionist/sort-objects */
import i18n, { type InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { defaultLanguage, defaultNamespace, resources } from './config';

// eslint-disable-next-line import/no-named-as-default-member
i18n
	// detect user language
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	.init({
		debug: false,
		fallbackLng: defaultLanguage,

		ns: [defaultNamespace],

		defaultNS: defaultNamespace,
		resources,

		interpolation: {
			// React already does escaping
			escapeValue: false,
			skipOnVariables: false,
		},
		detection: {
			cache: ['cookie'],
			order: ['queryString', 'cookie'],
		},
		react: { useSuspense: true },
	} as InitOptions);

// eslint-disable-next-line unicorn/prefer-export-from
export default i18n;
