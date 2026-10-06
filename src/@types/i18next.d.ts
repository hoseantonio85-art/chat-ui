import type { defaultNamespace } from '@/i18n/config';

import type resources from './resources';

export type TErrorTranslatonKeys = keyof typeof resources.error;

declare module 'i18next' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface CustomTypeOptions {
		returnNull: false;
		defaultNS: typeof defaultNamespace;
		resources: typeof resources;
	}
}
