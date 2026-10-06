import { useAtom } from '@reatom/npm-react';

import { attachmentsAtom } from '@/stores';
import { Row, ScrollBar } from '@sber-orm/ui-kit';

import { File } from './components';
import classes from './styles.module.scss';
import { IFileListProps } from './types';

export const FileList = ({ canDelete, size }: IFileListProps) => {
	const [attachments] = useAtom(attachmentsAtom);

	if (attachments.length === 0 || size === 'lg') {
		return null;
	}

	return (
		<ScrollBar className={classes.scrollBar}>
			<Row className={classes.fileList} justify="start" gutter={8} wrap>
				{attachments.map((file) => (
					<File key={file.fileId} file={file} canDelete={canDelete} />
				))}
			</Row>
		</ScrollBar>
	);
};
