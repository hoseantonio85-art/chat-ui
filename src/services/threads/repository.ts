import type { ThreadRepository } from './types';

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

let repository: ThreadRepository = unavailableRepository;

export const configureThreadRepository = (nextRepository: ThreadRepository) => {
	repository = nextRepository;
};

export const getThreadRepository = () => repository;
