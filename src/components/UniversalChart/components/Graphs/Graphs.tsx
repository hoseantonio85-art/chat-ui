import { Button, EIconName, Row, ScrollBar, Title } from '@sber-orm/ui-kit';
import cn from 'classnames';
import * as d3 from 'd3';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useChartRenderer } from '../../hooks';
import classes from '../../styles.module.scss';
import { IChartData, TChartType } from '../../types';
import { getColorByIndex } from '../../utils';

import BarChart from '@/assets/BarChart.svg';
import LineChart from '@/assets/LineChart.svg';
import PieChart from '@/assets/PieChart.svg';
import { IGraphsProps } from './types';

const MIN_WIDTH = 520;

export const Graphs = ({
	data,
	height = 500,
	width = 800,
	fullscreen,
	onFullScreen,
	onContainerReady,
}: IGraphsProps) => {
	const [chartData, setChartData] = useState<IChartData>(data);
	const [chartType, setChartType] = useState<TChartType>(
		data.metadata?.view || 'lineChart',
	);
	const [dimensions, setDimensions] = useState({
		width: !fullscreen ? 600 : width,
		height: !fullscreen ? 234 : height,
	});

	const containerRef = useRef<HTMLDivElement | null>(null);
	const svgRef = useRef<SVGSVGElement | null>(null);
	const tooltipRef = useRef<HTMLDivElement | null>(null);
	const chartContainerRef = useRef<HTMLDivElement | null>(null);

	const updateDimensions = useCallback(() => {
		if (!containerRef.current) {
			return;
		}

		const containerWidth = containerRef.current.getBoundingClientRect().width;
		const effectiveWidth = !fullscreen
			? containerWidth
			: Math.max(containerWidth, MIN_WIDTH);

		const height = !fullscreen
			? 234
			: Math.min(Math.max(effectiveWidth * 0.6, 450), 600);

		setDimensions({ width: effectiveWidth, height });
	}, [fullscreen]);

	useEffect(() => {
		updateDimensions();
		const handleResize = () => updateDimensions();
		window.addEventListener('resize', handleResize);
		const resizeObserver = new ResizeObserver(handleResize);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}
		return () => {
			window.removeEventListener('resize', handleResize);
			resizeObserver.disconnect();
		};
	}, [updateDimensions]);

	useEffect(() => {
		setChartData(data);
		setChartType(data.metadata?.view || 'lineChart');
	}, [data]);

	const { margin, renderLineChart, renderBarChart, renderPieChart } =
		useChartRenderer({
			data: chartData,
			width: dimensions.width,
			height: dimensions.height,
			small: !fullscreen,
			tooltipRef,
			containerElement: containerRef.current,
		});

	useEffect(() => {
		if (!svgRef.current || !containerRef.current) {
			return;
		}

		d3.select(svgRef.current).selectAll('*').remove();

		const svg = d3.select(svgRef.current);
		const chartGroup = svg
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		switch (chartType) {
			case 'lineChart':
			case 'barChart': {
				if (chartType === 'lineChart') {
					renderLineChart(chartGroup, svg);
				} else {
					renderBarChart(chartGroup, svg);
				}
				break;
			}

			case 'pieChart': {
				renderPieChart(svg);
				break;
			}
		}
	}, [
		chartType,
		chartData,
		dimensions,
		renderLineChart,
		renderBarChart,
		renderPieChart,
		margin,
	]);

	useEffect(() => {
		if (onContainerReady && chartContainerRef.current) {
			onContainerReady(chartContainerRef.current);
		}
	}, [onContainerReady, chartContainerRef.current]);

	const chartTypes: { type: TChartType; label: string; image: string }[] = [
		{ type: 'lineChart', label: 'Линейный', image: LineChart },
		{ type: 'barChart', label: 'Столбчатый', image: BarChart },
		{ type: 'pieChart', label: 'Круговой', image: PieChart },
	];

	return (
		<Row
			className={cn(classes.content, {
				[classes.contentSmall]: !fullscreen,
			})}
			direction="column"
			align="stretch"
			justify="center"
			gutter={24}
		>
			{!fullscreen && (
				<Row
					className={cn(classes.header, {
						[classes.headerInMessage]: !fullscreen,
					})}
					justify="between"
					align="top"
					gutter={16}
					noFlex
				>
					<Title
						className={classes.noWrapTitle}
						title={data.metadata?.title}
						size="H700"
						nowrap
					>
						{data.metadata?.title}
					</Title>
					{onFullScreen && (
						<Button
							variant="ellipse"
							icon={EIconName.fullScreen}
							iconOnly
							onClick={onFullScreen}
						/>
					)}
				</Row>
			)}
			<ScrollBar>
				<div ref={chartContainerRef} className={classes.chartContainer}>
					{fullscreen && chartData && (
						<div className={classes.legendWrapper}>
							{chartType === 'pieChart'
								? chartData.data.map((d, i) => (
										<div key={d.category} className={classes.legendItem}>
											<span
												className={classes.legendColor}
												style={{ backgroundColor: getColorByIndex(i) }}
											/>
											<span className={classes.legendText}>{d.category}</span>
										</div>
									))
								: chartData.metadata.series.map((s, i) => (
										<div key={s} className={classes.legendItem}>
											<span
												className={classes.legendColor}
												style={{ backgroundColor: getColorByIndex(i) }}
											/>
											<span className={classes.legendText}>{s}</span>
										</div>
									))}
						</div>
					)}

					<Row
						ref={containerRef}
						className={classes.chartWrapper}
						justify="center"
						style={{ minWidth: `${onFullScreen ? '290px' : MIN_WIDTH}px` }}
					>
						<div
							ref={tooltipRef}
							className={classes.tooltip}
							style={{ display: 'none' }}
						/>
						<svg
							ref={svgRef}
							className={classes.svg}
							viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
							preserveAspectRatio="xMidYMid meet"
						/>
					</Row>
				</div>
			</ScrollBar>

			{/* Управление типом */}
			{/*<Row gutter={8} className={classes.preview} justify="center">*/}
			{/*	{chartTypes.map((chart) => (*/}
			{/*		<button*/}
			{/*			key={chart.type}*/}
			{/*			className={cn(classes.previewButton, {*/}
			{/*				[classes.previewButtonActive]: chartType === chart.type,*/}
			{/*			})}*/}
			{/*			onClick={() => setChartType(chart.type)}*/}
			{/*		>*/}
			{/*			<img*/}
			{/*				src={chart.image}*/}
			{/*				className={classes.previewImage}*/}
			{/*				alt={chart.label}*/}
			{/*			/>*/}
			{/*		</button>*/}
			{/*	))}*/}
			{/*</Row>*/}
		</Row>
	);
};
