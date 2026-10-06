import { IChartData } from '@/components/UniversalChart/types';
import type { IMessage } from '@/types';

export interface IMessageProps {
	id?: string;
	message?: IMessage;
	loader?: boolean;
	isLastMessage?: boolean;
	sending?: boolean;
	onOpenChart?: (value: IChartData) => void;
}
