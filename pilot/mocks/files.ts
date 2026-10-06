const files = new Map<string, {fileName: string; size: number; extension: string; source?: File}>([
  ['demo-report', {fileName: 'Обзор рисков — демо.txt', size: 1240, extension: '.txt'}],
  ['demo-input', {fileName: 'Данные компании.xlsx', size: 24380, extension: '.xlsx'}],
]);
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
