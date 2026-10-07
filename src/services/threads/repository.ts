import type { ThreadRepository } from './types';
import { createHttpThreadRepository } from './http';
import { getCookie } from '@/helpers/cookie';
import { tenant$ } from '@n-orm/auth-mf-app';

const unavailableRepository: ThreadRepository = {
	list: async () => [],
	load: async () => {
		throw new Error('Thread repository is not configured');
	},
	create: async () => {
		throw new Error('Thread repository is not configured');
	},
	rename: async () => {
		throw new Error('Thread repository is not configured');
	},
	setPinned: async () => {
		throw new Error('Thread repository is not configured');
	},
	delete: async () => {
		throw new Error('Thread repository is not configured');
	},
};

let repository: ThreadRepository | undefined;

export const configureThreadRepository = (nextRepository: ThreadRepository) => {
	repository = nextRepository;
};

export const getThreadRepository = (): ThreadRepository => {
	if (!repository && window.SBERORM_CHAT_THREADS_API_URL) {
		repository = createHttpThreadRepository({
			baseUrl: window.SBERORM_CHAT_THREADS_API_URL,
			headers: () => {
				const session = getCookie('X-Sber-Auth-Session');
				const tenantId = tenant$.value.tenantId;
				return {
					...(session ? { 'X-Sber-Auth-Session': session } : {}),
					...(tenantId ? { tenantId } : {}),
				};
			},
		});
	}
	return repository ?? unavailableRepository;
};
