import { TFileAttach } from '@sber-orm/components';

export enum ERoles {
	bot = 'bot',
	user = 'user',
	system = 'system',
}

export enum EReaction {
	like = 'like',
	dislike = 'dislike',
}

export interface ISkillInfo {
	id: string;
	title: string;
	type: string;
	active: boolean;
	extras?: Record<string, string | null>;
}

export interface IMessage extends Pick<ISkillInfo, 'extras'> {
	id?: string;
	requestId?: string;
	text?: string;
	userId?: string;
	timeCreated?: string;
	role?: ERoles;
	reaction?: TReaction;
	skill?: string;
}

export type TReaction = keyof typeof EReaction;

export interface IAddActionOptions {
	silent?: boolean;
	insertToTop?: boolean;
}

export interface IAttachment extends Omit<TFileAttach, 'filename'> {
	progress: number;
	errors: string[];
	fileName: string;
}
