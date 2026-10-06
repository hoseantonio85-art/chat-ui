import type { TMessageStore } from '@/stores';
import type { ERoles, IAddActionOptions, IMessage } from '@/types';

export interface IChatStore {
	addMessage: (value: IMessage, options?: IAddActionOptions) => void;
	clearContext: () => void;
	context: Record<string, string | null> | null;
	getCanLoadHistory: () => boolean;
	isLoading: boolean;
	createIncidentAvailable: boolean;
	setCanLoadHistory: (value: boolean) => void;
	setIsLoading: (value: boolean) => void;
	messages: TMessageStore[];
}

export interface IChatClass {
	store?: IChatStore;
	userId: string;
	tenantId: string;
	brokerURL: string;
	host: string;
	loadLimit: number;
}

export interface ISendActionProps extends Partial<Pick<IMessage, 'extras'>> {
	body?: string;
	headers?: Record<string, string>;
	role?: ERoles;
}
