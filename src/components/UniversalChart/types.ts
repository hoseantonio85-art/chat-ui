// Типы графиков
export type TChartType = 'barChart' | 'lineChart' | 'pieChart';

// Типы для наших данных
export interface IDataPoint {
	category: string;
	values: { [series: string]: number };
}

export interface IChartMetadata {
	colors: { [series: string]: string };
	view?: TChartType;
	title?: string;
	description?: string;
	categories: string[];
	series: string[];
	units?: {
		x?: string;
		y?: string;
	};
	axes?: {
		x?: string;
		y?: string;
	};
}

export interface IChartData {
	metadata: IChartMetadata;
	data: IDataPoint[];
}

export interface IUniversalChartProps {
	data: IChartData;
	width?: number;
	height?: number;
	fullscreen?: boolean;
	onClose?: () => void;
	onFullScreen?: () => void;
}
