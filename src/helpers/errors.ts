import { TErrorTranslatonKeys } from '@/@types/i18next';
import { MAX_FILE_NAME_LENGTH, MAX_FILE_SIZE } from '@/config';
import i18next from '@/i18n';
import { TField } from '@/stores/models/Fields';

export interface IErrorType {
	fieldConfig?: TField;
	fallbackFieldConfig?: TField;
}

export function getFileError(errors: string[] = []): string | undefined {
	return errors
		.map((message) =>
			i18next.t(message as TErrorTranslatonKeys, {
				fileNameLength: MAX_FILE_NAME_LENGTH,
				fileSize: Math.round((MAX_FILE_SIZE + 1) / (1024 * 1024)),
				ns: 'error',
			}),
		)
		.join(', ');
}
