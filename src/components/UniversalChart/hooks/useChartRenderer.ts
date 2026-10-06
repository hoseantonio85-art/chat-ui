import * as d3 from 'd3';
import React from 'react';
import { IChartMetadata, IDataPoint } from '../types';
import { getColorByIndex } from '../utils';

export interface IUseChartRendererProps {
	data: {
		metadata: IChartMetadata;
		data: IDataPoint[];
	};
	width?: number;
	height?: number;
	small?: boolean;
	tooltipRef?: React.RefObject<HTMLDivElement>;
	containerElement?: HTMLElement | null;
}

export const useChartRenderer = ({
	data,
	width = 800,
	height = 500,
	small,
	tooltipRef,
	containerElement,
}: IUseChartRendererProps) => {
	// 🔹 1. Безопасное преобразование строки в CSS-класс
	const toSafeCssClass = (str: string): string => {
		return str
			.replace(/[^a-zA-Z0-9\u00A0-\uFFFF_-]/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-+|-+$/g, '')
			.replace(/^([0-9])/, '_$1');
	};

	// 🔹 2. Форматер с русскими SI-префиксами
	const ruSIFormatter = (value: number): string => {
		if (value === 0) {
			return '0';
		}
		const abs = Math.abs(value);
		const sign = value < 0 ? '-' : '';
		let suffix = '';
		let scaled = abs;

		if (abs >= 1e12) {
			scaled = abs / 1e12;
			suffix = ' трлн';
		} else if (abs >= 1e9) {
			scaled = abs / 1e9;
			suffix = ' млрд';
		} else if (abs >= 1e6) {
			scaled = abs / 1e6;
			suffix = ' млн';
		} else if (abs >= 1e3 && abs < 1e6) {
			scaled = abs / 1e3;
			suffix = ' тыс.';
		}

		let formattedNum: string;
		if (suffix) {
			formattedNum = scaled.toFixed(2).replace(/\.?0+$/, '');
			if (formattedNum.includes('.')) {
				formattedNum = formattedNum.replace('.', ',');
			}
		} else {
			if (Number.isInteger(value)) {
				formattedNum = Math.abs(Math.round(value))
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
				if (sign) {
					formattedNum = sign + formattedNum;
				}
			} else {
				formattedNum = value.toFixed(2).replace(/\.?0+$/, '');
				if (formattedNum.includes('.')) {
					formattedNum = formattedNum.replace('.', ',');
				}
			}
		}

		return `${sign}${formattedNum}${suffix}`;
	};

	const categories =
		data.metadata.categories && data.metadata.categories.length > 0
			? data.metadata.categories
			: data.data.map((d) => d.category);
	const categoryToIndexMap = new Map<string, number>();
	data.data.forEach((d, idx) => {
		categoryToIndexMap.set(d.category, idx);
	});

	const getAdaptiveMargins = () => {
		const manyCategories = categories.length > 8;
		const longLabels = categories.some((cat) => cat.length > 8);

		if (small) {
			return {
				top: 8,
				right: manyCategories ? 40 : 20,
				bottom: manyCategories || longLabels ? 65 : 45,
				left: 50,
			};
		}

		return {
			top: 12,
			right: manyCategories ? 80 : 50,
			bottom: manyCategories || longLabels ? 90 : 70,
			left: 90,
		};
	};

	const margin = getAdaptiveMargins();
	const chartWidth = Math.max(width - margin.left - margin.right, 280);
	const chartHeight = Math.max(height - margin.top - margin.bottom, 200);

	const showTooltip = (
		tooltipElement: HTMLDivElement | null,
		content: string,
		clientX: number,
		clientY: number,
	) => {
		if (!tooltipElement || !containerElement) {
			return;
		}

		tooltipElement.innerHTML = content;
		tooltipElement.style.display = 'block';
		tooltipElement.setAttribute('role', 'tooltip');
		tooltipElement.setAttribute('aria-live', 'polite');

		requestAnimationFrame(() => {
			const tooltipRect = tooltipElement.getBoundingClientRect();
			const containerRect = containerElement.getBoundingClientRect();

			const tooltipWidth = tooltipRect.width;
			const tooltipHeight = tooltipRect.height;

			const xRel = clientX - containerRect.left;
			const yRel = clientY - containerRect.top;

			let left = xRel - tooltipWidth / 2;
			let top = yRel - tooltipHeight - 8;

			const PADDING = 12;
			if (left < PADDING) {
				left = PADDING;
			}
			if (left + tooltipWidth > containerRect.width - PADDING) {
				left = containerRect.width - tooltipWidth - PADDING;
			}

			if (top < PADDING) {
				top = yRel + 12;
			}

			tooltipElement.style.left = `${left}px`;
			tooltipElement.style.top = `${top}px`;
		});
	};

	const hideTooltip = (tooltipElement: HTMLDivElement | null) => {
		if (tooltipElement) {
			tooltipElement.style.display = 'none';
			tooltipElement.removeAttribute('role');
			tooltipElement.removeAttribute('aria-live');
		}
	};

	const tooltipRefCurrent = tooltipRef?.current;

	const renderGridLines = (
		chartGroup: d3.Selection<SVGGElement, unknown, unknown, unknown>,
		yScale: d3.ScaleLinear<number, number>,
	) => {
		chartGroup
			.append('g')
			.attr('class', 'grid')
			.call(
				d3
					.axisLeft(yScale)
					.tickSize(-chartWidth)
					.tickFormat('' as unknown as () => string),
			)
			.selectAll('.tick line')
			.style('stroke', '#e0e0e0')
			.style('stroke-dasharray', '2,2');

		// Удаляем domain и текст у сетки
		chartGroup.select('.domain').remove();
		chartGroup.selectAll('.tick text').remove();
	};

	const truncateSvgText = (
		textNode: SVGTextElement,
		maxWidth: number,
		fullText: string,
	) => {
		if (!fullText) {
			return;
		}

		textNode.textContent = fullText;

		const bbox = textNode.getBBox?.() || { width: 0 };
		if (bbox.width <= maxWidth) {
			return;
		}

		let low = 0,
			high = fullText.length,
			bestFit = fullText;
		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
			const candidate = fullText.substring(0, mid) + '…';
			textNode.textContent = candidate;
			const w = textNode.getBBox?.().width || 0;
			if (w <= maxWidth) {
				bestFit = candidate;
				low = mid + 1;
			} else {
				high = mid - 1;
			}
		}
		textNode.textContent = bestFit;
	};

	const optimizeXAxisLabels = (
		xAxisGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
		xScale: d3.ScaleBand<string>,
	) => {
		const texts = xAxisGroup.selectAll<SVGTextElement, string>('text').nodes();

		if (texts.length === 0) {
			return;
		}

		const domain = xScale.domain();
		const stepX = xScale.step();
		const maxWidthPerLabel = stepX * 0.9;

		texts.forEach((el, i) => {
			const fullText = domain[i];
			el.setAttribute('title', fullText);
			el.style.pointerEvents = 'auto';
			truncateSvgText(el, maxWidthPerLabel, fullText);
		});

		const hasOverlap = texts.some((curr, i) => {
			if (i === 0) {
				return false;
			}
			const prev = texts[i - 1];
			const currBox = curr.getBBox?.() || { width: 0 };
			const prevBox = prev.getBBox?.() || { width: 0 };

			const currCenterX = xScale(domain[i])! + xScale.bandwidth() / 2;
			const prevCenterX = xScale(domain[i - 1])! + xScale.bandwidth() / 2;

			const prevRight = prevCenterX + prevBox.width / 2;
			const currLeft = currCenterX - currBox.width / 2;
			return currLeft < prevRight - 2;
		});

		if (!hasOverlap) {
			return;
		}

		d3.selectAll(texts)
			.style('text-anchor', 'end')
			.attr('dx', '-.8em')
			.attr('dy', '.15em')
			.attr('transform', 'rotate(-45)');

		const angleDeg = 45;
		const cosA = Math.abs(Math.cos((angleDeg * Math.PI) / 180));
		const effectiveMaxWidth = maxWidthPerLabel * cosA * 0.85;

		texts.forEach((el, i) => {
			const fullText = domain[i];
			el.setAttribute('title', fullText);
			el.style.pointerEvents = 'auto';
			truncateSvgText(el, effectiveMaxWidth, fullText);
		});
	};

	const renderLineChart = (
		chartGroup: d3.Selection<SVGGElement, unknown, unknown, unknown>,
	) => {
		if (chartWidth <= 0 || chartHeight <= 0) {
			return;
		}

		const xScale = d3
			.scaleBand<string>()
			.domain(categories)
			.range([0, chartWidth])
			.padding(0.1)
			.paddingOuter(0.2);

		const allValues = data.data
			.flatMap((d) => Object.values(d.values))
			.filter((v) => typeof v === 'number' && !isNaN(v));
		const yMin = allValues.length ? d3.min(allValues)! : 0;
		const yMax = allValues.length ? d3.max(allValues)! : 0;

		let yDomain: [number, number];

		if (yMin === yMax) {
			if (yMin === 0) {
				yDomain = [0, 1];
			} else {
				const pad = Math.abs(yMin) * 0.1 || 1;
				yDomain = [yMin - pad, yMin + pad];
			}
		} else if (yMin >= 0) {
			yDomain = [0, yMax * 1.1];
		} else if (yMax <= 0) {
			yDomain = [yMin * 1.1, 0];
		} else {
			const padding = (yMax - yMin) * 0.1;
			yDomain = [yMin - padding, yMax + padding];
		}

		const absRange = Math.abs(yMax - yMin);
		const useNice = absRange > 10;
		const yScale = d3.scaleLinear().domain(yDomain).range([chartHeight, 0]);

		if (useNice) {
			yScale.nice();
		}

		// 1. Сетка (только линии)
		renderGridLines(chartGroup, yScale);

		// 2. Нулевая линия (если нужно)
		if (yDomain[0] <= 0 && yDomain[1] >= 0) {
			chartGroup
				.append('line')
				.attr('class', 'zero-line')
				.attr('x1', 0)
				.attr('x2', chartWidth)
				.attr('y1', yScale(0))
				.attr('y2', yScale(0))
				.style('stroke', '#959DA5')
				.style('stroke-dasharray', '4,4')
				.style('stroke-width', 1);
		}

		// 3. Данные
		data.metadata.series.forEach((series, i) => {
			const line = d3
				.line<IDataPoint>()
				.x((d) => xScale(d.category)! + xScale.bandwidth() / 2)
				.y((d) => yScale(d.values[series] || 0))
				.curve(d3.curveMonotoneX);

			chartGroup
				.append('path')
				.datum(data.data)
				.attr('fill', 'none')
				.attr('stroke', getColorByIndex(i))
				.attr('stroke-width', 3)
				.attr('d', line);

			const safeSeriesClass = `dot-${toSafeCssClass(series)}`;

			chartGroup
				.selectAll(`.${safeSeriesClass}`)
				.data(data.data)
				.enter()
				.append('circle')
				.attr('class', safeSeriesClass)
				.attr('cx', (d) => xScale(d.category)! + xScale.bandwidth() / 2)
				.attr('cy', (d) => yScale(d.values[series] || 0))
				.attr('r', 4)
				.attr('fill', getColorByIndex(i))
				.attr('stroke', '#fff')
				.attr('stroke-width', 2)
				.on('mouseover', function (event, d) {
					const value = d.values[series] || 0;
					const content = `
            <div><strong>${series}</strong></div>
            <div>${d.category}</div>
            <div>${data.metadata.axes?.y || 'Значение'}: ${ruSIFormatter(value)}</div>
          `;
					showTooltip(tooltipRefCurrent, content, event.clientX, event.clientY);
				})
				.on('mousemove', function (event) {
					showTooltip(
						tooltipRefCurrent,
						tooltipRefCurrent?.innerHTML || '',
						event.clientX,
						event.clientY,
					);
				})
				.on('mouseout', () => hideTooltip(tooltipRefCurrent));
		});

		// 4. Оси поверх данных
		const desiredTickCount = small ? 4 : 6;
		const yAxis = d3
			.axisLeft(yScale)
			.ticks(desiredTickCount)
			.tickFormat(ruSIFormatter);

		// Ось Y
		const yAxisGroup = chartGroup.append('g').call(yAxis);
		yAxisGroup.select('.domain').style('stroke', '#959DA5');
		yAxisGroup.selectAll('.domain, .tick line').style('stroke', '#959DA5');
		yAxisGroup
			.selectAll('.tick text')
			.style('font-size', '10px')
			.style('fill', '#959DA5');

		// Ось X
		const xAxisGroup = chartGroup
			.append('g')
			.attr('transform', `translate(0,${chartHeight})`)
			.call(d3.axisBottom(xScale));
		xAxisGroup.select('.domain').style('stroke', '#959DA5');
		xAxisGroup.selectAll('.domain, .tick line').style('stroke', '#959DA5');
		xAxisGroup
			.selectAll('.tick text')
			.style('font-size', '10px')
			.style('fill', '#959DA5');
		optimizeXAxisLabels(xAxisGroup, xScale);

		// 5. Подписи осей (только если не small)
		if (!small && data.metadata.axes?.x) {
			chartGroup
				.append('text')
				.attr('x', chartWidth / 2)
				.attr('y', chartHeight + 55)
				.attr('text-anchor', 'middle')
				.style('font-size', '10px')
				.style('fill', '#586069')
				.text(data.metadata.axes.x);
		}

		if (!small && data.metadata.axes?.y) {
			chartGroup
				.append('text')
				.attr('transform', 'rotate(-90)')
				.attr('y', -70)
				.attr('x', -chartHeight / 2)
				.attr('text-anchor', 'middle')
				.style('font-size', '10px')
				.style('fill', '#586069')
				.text(data.metadata.axes.y);
		}
	};

	const renderBarChart = (
		chartGroup: d3.Selection<SVGGElement, unknown, unknown, unknown>,
	) => {
		if (chartWidth <= 0 || chartHeight <= 0) {
			return;
		}

		const xScale = d3
			.scaleBand<string>()
			.domain(categories)
			.range([0, chartWidth])
			.padding(0.1)
			.paddingOuter(0.2);

		const allValues = data.data
			.flatMap((d) => Object.values(d.values))
			.filter((v) => typeof v === 'number' && !isNaN(v));
		const yMin = allValues.length ? d3.min(allValues)! : 0;
		const yMax = allValues.length ? d3.max(allValues)! : 0;

		let yDomain: [number, number];

		if (yMin === yMax) {
			if (yMin === 0) {
				yDomain = [0, 1];
			} else {
				const pad = Math.abs(yMin) * 0.1 || 1;
				yDomain = [yMin - pad, yMin + pad];
			}
		} else if (yMin >= 0) {
			yDomain = [0, yMax * 1.1];
		} else if (yMax <= 0) {
			yDomain = [yMin * 1.1, 0];
		} else {
			const padding = (yMax - yMin) * 0.1;
			yDomain = [yMin - padding, yMax + padding];
		}

		const absRange = Math.abs(yMax - yMin);
		const useNice = absRange > 10;
		const yScale = d3.scaleLinear().domain(yDomain).range([chartHeight, 0]);

		if (useNice) {
			yScale.nice();
		}

		// 1. Сетка
		renderGridLines(chartGroup, yScale);

		// 2. Нулевая линия
		if (yDomain[0] <= 0 && yDomain[1] >= 0) {
			chartGroup
				.append('line')
				.attr('class', 'zero-line')
				.attr('x1', 0)
				.attr('x2', chartWidth)
				.attr('y1', yScale(0))
				.attr('y2', yScale(0))
				.style('stroke', '#959DA5')
				.style('stroke-dasharray', '4,4')
				.style('stroke-width', 1);
		}

		// 3. Данные
		const series = data.metadata.series;
		const availableBandwidth = xScale.bandwidth();
		const minBarWidth = 6;

		let seriesToRender = series;
		if (availableBandwidth < minBarWidth * series.length) {
			const seriesMax = series.map((s) => ({
				name: s,
				max: d3.max(data.data, (d) => d.values[s] || 0) || 0,
			}));
			seriesToRender = seriesMax
				.sort((a, b) => b.max - a.max)
				.slice(0, Math.max(1, Math.floor(availableBandwidth / minBarWidth)))
				.map((s) => s.name);
		}

		const subGroupScale = d3
			.scaleBand()
			.domain(seriesToRender)
			.range([0, availableBandwidth])
			.padding(0.05);

		chartGroup
			.selectAll('.category-group')
			.data(data.data)
			.enter()
			.append('g')
			.attr('class', 'category-group')
			.attr('transform', (d) => `translate(${xScale(d.category)!},0)`)
			.selectAll('rect')
			.data((d) =>
				seriesToRender.map((seriesName) => ({
					series: seriesName,
					value: d.values[seriesName] || 0,
					category: d.category,
				})),
			)
			.enter()
			.append('rect')
			.attr('x', (d) => subGroupScale(d.series)!)
			.attr('y', (d) => (d.value >= 0 ? yScale(d.value) : yScale(0)))
			.attr('width', Math.max(subGroupScale.bandwidth(), 2))
			.attr('height', (d) =>
				d.value >= 0
					? chartHeight - yScale(d.value)
					: yScale(d.value) - yScale(0),
			)
			.attr('fill', (_, i, nodes) => {
				const seriesName = (nodes[i] as unknown).__data__.series;
				return getColorByIndex(series.indexOf(seriesName));
			})
			.attr('stroke', '#fff')
			.attr('stroke-width', 1)
			.attr('rx', 2)
			.on('mouseover', function (event, d) {
				const content = `
          <div><strong>${d.series}</strong></div>
          <div>${d.category}</div>
          <div>${data.metadata.axes?.y || 'Значение'}: ${ruSIFormatter(d.value)}</div>
        `;
				showTooltip(tooltipRefCurrent, content, event.clientX, event.clientY);
			})
			.on('mousemove', function (event) {
				showTooltip(
					tooltipRefCurrent,
					tooltipRefCurrent?.innerHTML || '',
					event.clientX,
					event.clientY,
				);
			})
			.on('mouseout', () => hideTooltip(tooltipRefCurrent));

		// 4. Оси поверх данных
		const desiredTickCount = small ? 4 : 6;
		const yAxis = d3
			.axisLeft(yScale)
			.ticks(desiredTickCount)
			.tickFormat(ruSIFormatter);

		const yAxisGroup = chartGroup.append('g').call(yAxis);
		yAxisGroup.select('.domain').style('stroke', '#959DA5');
		yAxisGroup.selectAll('.domain, .tick line').style('stroke', '#959DA5');
		yAxisGroup
			.selectAll('.tick text')
			.style('font-size', '10px')
			.style('fill', '#959DA5');

		const xAxisGroup = chartGroup
			.append('g')
			.attr('transform', `translate(0,${chartHeight})`)
			.call(d3.axisBottom(xScale));
		xAxisGroup.select('.domain').style('stroke', '#959DA5');
		xAxisGroup.selectAll('.domain, .tick line').style('stroke', '#959DA5');
		xAxisGroup
			.selectAll('.tick text')
			.style('font-size', '10px')
			.style('fill', '#959DA5');
		optimizeXAxisLabels(xAxisGroup, xScale);

		// 5. Подписи осей
		if (!small && data.metadata.axes?.x) {
			chartGroup
				.append('text')
				.attr('x', chartWidth / 2)
				.attr('y', chartHeight + 55)
				.attr('text-anchor', 'middle')
				.style('font-size', '10px')
				.style('fill', '#586069')
				.text(data.metadata.axes.x);
		}

		if (!small && data.metadata.axes?.y) {
			chartGroup
				.append('text')
				.attr('transform', 'rotate(-90)')
				.attr('y', -70)
				.attr('x', -chartHeight / 2)
				.attr('text-anchor', 'middle')
				.style('font-size', '10px')
				.style('fill', '#586069')
				.text(data.metadata.axes.y);
		}
	};

	const renderPieChart = (
		svg: d3.Selection<SVGSVGElement, unknown, unknown, unknown>,
	) => {
		const pieData = data.data.map((d) => ({
			id: d.category,
			value: Object.values(d.values).reduce((sum, val) => sum + val, 0),
		}));

		const container = svg.node()?.parentElement;
		if (!container) {
			return;
		}

		const svgWidth = container.clientWidth;
		const svgHeight = container.clientHeight;
		if (svgWidth <= 0 || svgHeight <= 0) {
			return;
		}

		svg
			.attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
			.style('overflow', 'visible');

		const radius = Math.min(svgWidth, svgHeight) * 0.35;
		const centerX = svgWidth / 2;
		const centerY = svgHeight * 0.45;

		const pieLayout = d3
			.pie<{ id: string; value: number }>()
			.value((d) => d.value)
			.sort(null);

		const arcGenerator = d3
			.arc<d3.PieArcDatum<{ id: string; value: number }>>()
			.innerRadius(0)
			.outerRadius(radius);

		const pieGroup = svg
			.append('g')
			.attr('transform', `translate(${centerX},${centerY})`);

		const arcs = pieGroup
			.selectAll<SVGGElement, d3.PieArcDatum<{ id: string; value: number }>>(
				'.arc',
			)
			.data(pieLayout(pieData))
			.enter()
			.append('g')
			.attr('class', 'arc');

		const total = d3.sum(pieData, (d) => d.value);

		arcs
			.append('path')
			.attr('d', arcGenerator)
			.attr('fill', (d) => {
				const idx = categoryToIndexMap.get(d.data.id) ?? 0;
				return getColorByIndex(idx);
			})
			.attr('stroke', '#fff')
			.attr('stroke-width', 2)
			.style('opacity', 0.9)
			.on('mouseover', function (event, d) {
				const percent = ((d.data.value / total) * 100).toFixed(1);
				const content = `
						<div>
							<strong>${d.data.id}</strong>
						</div>
						<div>Значение: ${ruSIFormatter(d.data.value)}</div>
						<div>Доля: ${percent}%</div>
    		`;
				showTooltip(tooltipRefCurrent, content, event.clientX, event.clientY);
			})
			.on('mousemove', function (event) {
				showTooltip(
					tooltipRefCurrent,
					tooltipRefCurrent?.innerHTML || '',
					event.clientX,
					event.clientY,
				);
			})
			.on('mouseout', () => hideTooltip(tooltipRefCurrent));

		if (radius > 70) {
			const labelRadius = radius * 0.8;

			const labelArc = d3
				.arc<d3.PieArcDatum<{ id: string; value: number }>>()
				.innerRadius(labelRadius)
				.outerRadius(labelRadius);

			// Фильтруем только значимые сегменты
			const visibleArcs = pieLayout(pieData).filter((d) => {
				const percent = (d.data.value / total) * 100;
				return percent >= 1;
			});

			pieGroup
				.selectAll('.label')
				.data(visibleArcs)
				.enter()
				.append('text')
				.attr('class', 'label')
				.attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
				.attr('text-anchor', 'middle')
				.style('font-size', '12px')
				.style('font-weight', 'bold')
				.style('fill', '#24292e')
				.text((d) => `${((d.data.value / total) * 100).toFixed(0)}%`);
		}
	};

	return {
		margin,
		renderLineChart,
		renderBarChart,
		renderPieChart,
	};
};
