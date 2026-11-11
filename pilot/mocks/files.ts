import type { VndFolder } from '../VndBackground.model';

const files = new Map<string, {fileName: string; size: number; extension: string; source?: File}>([
  ['demo-report', {fileName: 'Обзор рисков.txt', size: 1240, extension: '.txt'}],
  ['demo-input', {fileName: 'Данные компании.xlsx', size: 24380, extension: '.xlsx'}],
  ['vnd-draft', {fileName: 'Регламент управления операционными рисками.docx', size: 248320, extension: '.docx'}],
  ['vnd-corrected', {fileName: 'Регламент управления операционными рисками — исправленный.docx', size: 251904, extension: '.docx'}],
]);
const knowledge = new Map<string, { id: string; name: string; folder: VndFolder }>();

export function saveVndToKnowledge(fileIds: string | undefined, folder: VndFolder) {
  if (!fileIds) return;
  let ids: unknown;
  try {
    ids = JSON.parse(fileIds);
  } catch {
    return;
  }
  const id = Array.isArray(ids) && typeof ids[0] === 'string' ? ids[0] : undefined;
  const file = id ? files.get(id) : undefined;
  if (!id || !file) return;
  const record = { id, name: file.fileName, folder };
  knowledge.set(id, record);
  return record;
}

export const methodologistService = {
  async uploadDocument(id: string, file: File, progress: (value: number) => void) {
    files.set(id, {fileName: file.name, size: file.size, extension: `.${file.name.split('.').pop()}`, source: file});
    for (const value of [25, 60, 100]) { await new Promise(resolve => setTimeout(resolve, 160)); progress(value); }
    return {success: true, body: {}};
  },
  async removeDocument(id: string) { files.delete(id); return {success: true}; },
  async getAttachmentList(ids: string) {
    return {success: true, body: {userDocuments: ids.split(',').filter(id => files.has(id)).map(id => {
      const file = files.get(id)!;
      return {fields: {fileId: {value: id}, fileName: {value: file.fileName}, size: {value: file.size}, extension: {value: file.extension}}};
    })}};
  },
};
