import { IAttachment } from '@/types';

export interface IFileListProps {
	size: 'sm' | 'md' | 'lg';
	canDelete?: boolean;
}

export interface IFileProps {
	file: IAttachment;
	canDelete?: boolean;
}
