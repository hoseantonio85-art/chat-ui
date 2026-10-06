import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const exportTableToExcel = async (
	tableElement: HTMLTableElement | null,
	fileName = 'chart-table',
) => {
	try {
		if (!tableElement) {
			return;
		}

		// Создаем новую книгу и лист
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Sheet1');

		// Настраиваем ширину колонок (по умолчанию)
		worksheet.columns = [
			{ width: 20 },
			{ width: 20 },
			{ width: 20 },
			{ width: 20 },
			{ width: 20 },
		];

		// Парсим таблицу
		const rows = Array.from(tableElement.querySelectorAll('tr'));

		rows.forEach((tableRow, rowIndex) => {
			const cells = Array.from(tableRow.querySelectorAll('th, td'));
			const excelRow = worksheet.getRow(rowIndex + 1);

			cells.forEach((cell, colIndex) => {
				// Берем только текстовое содержимое (без иконок и вложенных тегов)
				const cellValue = cell.textContent?.trim() || '';
				const excelCell = excelRow.getCell(colIndex + 1);
				excelCell.value = cellValue;

				// Определяем, является ли строка заголовком
				const isHeader = tableRow.tagName === 'THEAD' || rowIndex === 0;

				// Применяем стили
				excelCell.font = { bold: isHeader, size: isHeader ? 12 : 11 };
				excelCell.alignment = {
					vertical: 'middle',
					horizontal: 'left',
					wrapText: true,
				};

				// Границы для всех ячеек
				excelCell.border = {
					top: { style: 'thin' },
					left: { style: 'thin' },
					bottom: { style: 'thin' },
					right: { style: 'thin' },
				};

				// Фон для заголовков
				if (isHeader) {
					excelCell.fill = {
						type: 'pattern',
						pattern: 'solid',
						fgColor: { argb: 'FFE0E0E0' }, // Светло-серый
					};
				}
			});
		});

		// Генерируем буфер файла
		const buffer = await workbook.xlsx.writeBuffer();
		const blob = new Blob([buffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		});

		const timestamp = new Date().toISOString().slice(0, 10);
		const finalFileName = `${fileName}_${timestamp}.xlsx`;

		// Скачиваем файл
		saveAs(blob, finalFileName);
	} catch (error) {
		console.error('❌ Export failed:', error);
		throw error;
	}
};
