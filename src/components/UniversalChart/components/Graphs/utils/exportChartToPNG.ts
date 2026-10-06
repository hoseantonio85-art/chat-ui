import { notification } from '@sber-orm/ui-kit';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import i18next from 'i18next';

const CAPTURE_CONFIG = {
	backgroundColor: '#ffffff',
	useCORS: true,
	allowTaint: true,
	logging: false,
	letterRendering: true,
	imageTimeout: 0,
	removeContainer: true,
};

// Минимальные отступы для подписей
const PADDING = {
	top: 20,
	right: 0,
	bottom: 0,
	left: 160,
};

/**
 * Скачивает содержимое контейнера графика как PNG изображение
 */
export const exportChartToPNG = async (
	chartContainerRef: HTMLDivElement | null,
	fileName = 'chart_export',
): Promise<void> => {
	if (!chartContainerRef) {
		notification(i18next.t('chartNotFound'), { type: 'error' });
		return;
	}

	try {
		// Создаем канвас без изменения размеров контейнера
		const canvas = await html2canvas(chartContainerRef, {
			...CAPTURE_CONFIG,
			scale: 1, // Фиксируем scale = 1
			x: -PADDING.left,
			y: -PADDING.top,
			width: chartContainerRef.scrollWidth,
			height: chartContainerRef.scrollHeight + PADDING.top + PADDING.bottom,
			windowWidth: chartContainerRef.scrollWidth + PADDING.left + PADDING.right,
			windowHeight:
				chartContainerRef.scrollHeight + PADDING.top + PADDING.bottom,
		});

		// Конвертируем и скачиваем
		const blob = await new Promise<Blob>((resolve, reject) => {
			canvas.toBlob(
				(blob) =>
					blob
						? resolve(blob)
						: reject(new Error('Не удалось создать изображение')),
				'image/png',
				1.0,
			);
		});

		saveAs(blob, `${fileName}.png`);
	} catch (error) {
		console.error('Ошибка при скачивании графика:', error);
		notification(i18next.t('failDownload'), { type: 'error' });
	}
};
