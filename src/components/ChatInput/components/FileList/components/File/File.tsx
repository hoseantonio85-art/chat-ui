import { useAction } from '@reatom/npm-react';
import { useState } from 'react';

import { getFileError } from '@/helpers/errors';
import { removeAttachment as removeAttachmentAction } from '@/stores';
import { methodologistService } from '@/stores/services/MethodologistService';
import { FileItem, IFileProps as IFileItemProps } from '@sber-orm/ui-kit';

import classes from '../../styles.module.scss';
import { IFileProps } from '../../types';

export const File = ({ canDelete, file }: IFileProps) => {
	const [deleting, setDeleting] = useState(false);

	const removeAttachment = useAction(removeAttachmentAction);

	const handleRemove = async (id: string) => {
		try {
			setDeleting(true);

			const result = await methodologistService.removeDocument(id);

			if (result.success) {
				removeAttachment(id);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setDeleting(false);
		}
	};

	return (
		<FileItem
			className={classes.file}
			file={file as IFileItemProps}
			progress={file.progress}
			error={getFileError(file.errors)}
			onCancel={
				!deleting && !!canDelete ? () => handleRemove(file.fileId) : undefined
			}
			chat
		>
			{file.fileName}
		</FileItem>
	);
};
