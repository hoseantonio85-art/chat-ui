import type { IChartData } from './types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const isStringRecord = (value: unknown): value is Record<string, string> =>
	isRecord(value) && Object.values(value).every((item) => typeof item === 'string');

const isNumberRecord = (value: unknown): value is Record<string, number> =>
	isRecord(value) && Object.values(value).every((item) => typeof item === 'number' && Number.isFinite(item));

const isChartData = (value: unknown): value is IChartData => {
	if (!isRecord(value) || !isRecord(value.metadata) || !Array.isArray(value.data)) {
		return false;
	}

	const { metadata, data } = value;
	return isStringRecord(metadata.colors) &&
		Array.isArray(metadata.categories) && metadata.categories.every((item) => typeof item === 'string') &&
		Array.isArray(metadata.series) && metadata.series.every((item) => typeof item === 'string') &&
		(metadata.view === undefined || metadata.view === 'barChart' || metadata.view === 'lineChart' || metadata.view === 'pieChart') &&
		(metadata.title === undefined || typeof metadata.title === 'string') &&
		(metadata.description === undefined || typeof metadata.description === 'string') &&
		(metadata.units === undefined || (isRecord(metadata.units) &&
			(metadata.units.x === undefined || typeof metadata.units.x === 'string') &&
			(metadata.units.y === undefined || typeof metadata.units.y === 'string'))) &&
		(metadata.axes === undefined || (isRecord(metadata.axes) &&
			(metadata.axes.x === undefined || typeof metadata.axes.x === 'string') &&
			(metadata.axes.y === undefined || typeof metadata.axes.y === 'string'))) &&
		data.every((point) => isRecord(point) && typeof point.category === 'string' && isNumberRecord(point.values));
};

/** The chat transport may carry a chart as an object or as a JSON string. */
export const parseChartData = (value: unknown): IChartData | undefined => {
	try {
		const parsed: unknown = typeof value === 'string' ? JSON.parse(value) : value;
		return isChartData(parsed) ? parsed : undefined;
	} catch {
		return undefined;
	}
};
