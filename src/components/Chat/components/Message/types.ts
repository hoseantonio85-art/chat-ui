import { IChartData } from '@/components/UniversalChart/types';
import type { IMessage } from '@/types';
import type { ReactNode } from 'react';

export interface IMessageProps {
	id?: string;
	message?: IMessage;
	loader?: boolean;
	isLastMessage?: boolean;
	sending?: boolean;
	contextualPrompt?: boolean;
	contextualActions?: ReactNode;
	hideContextualActions?: boolean;
	onOpenChart?: (value: IChartData) => void;
}
