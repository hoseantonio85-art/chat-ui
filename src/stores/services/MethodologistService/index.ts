import {
	AttachmentS3UploadResponse,
	BaseResponse,
	ListMethodologistDocumentsResponse,
} from '@/openapi';
import {
	FetchResourceService,
	onProgressEvent,
	sanitizeFileName,
} from '@sber-orm/components';
import endpoints from '../endpoints';

export class MethodologistService extends FetchResourceService {
	constructor() {
		super(endpoints.baseUrl);
	}

	async uploadDocument(
		fileId: string,
		file: File,
		onProgress?: (_: number) => void,
	) {
		const formData = new FormData();

		formData.append('file', file, sanitizeFileName(file.name));

		return await this.rest.post<AttachmentS3UploadResponse>({
			resource: 'v1/settings/document/create',
			params: { fileId, usage: 'methodologist' },
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			// HTTP-ошибки (423 — антивирусная блокировка, 413 — слишком большой файл)
			// не уходят в глобальный ErrorBoundary.
			// Ошибка обрабатывается на уровне FileItem через file.addError().
			bypassGlobalError: true,
			onUploadProgress: onProgressEvent(onProgress),
		});
	}

	async downloadDocument(fileId: string, onProgress?: (_: number) => void) {
		return this.rest.getFile<BlobPart>({
			resource: 'v1/companies/settings/document',
			params: { fileId },
			headers: {
				Accept: 'application/*',
			},
			onDownloadProgress: onProgressEvent(onProgress),
			responseType: 'blob',
		});
	}

	async removeDocument(fileId: string) {
		return await this.rest.delete<BaseResponse>({
			resource: 'v1/companies/settings/document',
			params: { fileId },
		});
	}

	async getAttachmentList(fileIds: string) {
		return await this.rest.post<ListMethodologistDocumentsResponse>({
			resource: 'v1/companies/settings/document/search',
			data: { fileIds },
		});
	}
}

export const methodologistService = new MethodologistService();
