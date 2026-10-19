import { describe, expect, it } from 'vitest';

import { parseChartData } from './parseChartData';

const chart = {
	metadata: { colors: { revenue: 'seriesColor' }, categories: ['2026'], series: ['revenue'] },
	data: [{ category: '2026', values: { revenue: 12 } }],
};

describe('parseChartData', () => {
	it('accepts chart objects and serialized charts', () => {
		expect(parseChartData(chart)).toEqual(chart);
		expect(parseChartData(JSON.stringify(chart))).toEqual(chart);
	});

	it('rejects malformed and unrelated extras without throwing', () => {
		expect(parseChartData('{broken')).toBeUndefined();
		expect(parseChartData({ metadata: {}, data: [] })).toBeUndefined();
		expect(parseChartData({ metadata: chart.metadata, data: [{ category: '2026', values: { revenue: '12' } }] })).toBeUndefined();
	});
});
