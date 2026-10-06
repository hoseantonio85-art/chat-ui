import { IUniversalChartProps } from '../../types';

export interface IGraphsProps extends IUniversalChartProps {
	onContainerReady?: (container: HTMLDivElement | null) => void;
}
