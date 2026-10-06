import { Button, EIconName, Row, Title } from '@sber-orm/ui-kit';
import { useTranslation } from 'react-i18next';

import { useTracking } from '@sber-orm/components';
import { useCallback, useState } from 'react';
import { Graphs } from './components';
import { exportChartToPNG } from './components/Graphs/utils';
import { ClickDownloadChart } from './metrics';
import classes from './styles.module.scss';
import { IUniversalChartProps } from './types';

export const UniversalChart = (props: IUniversalChartProps) => {
	const { data, onClose } = props;

	const { t } = useTranslation();

	const { trackEvent } = useTracking();

	const [chartContainer, setChartContainer] = useState<HTMLDivElement | null>(
		null,
	);
	const [downloading, setDownloading] = useState<boolean>(false);

	/**
	 * Обработчик готовности контейнера графика
	 */
	const handleContainerReady = useCallback(
		(container: HTMLDivElement | null) => {
			setChartContainer(container);
		},
		[],
	);

	/**
	 * Обработчик скачивания графика в XLSX
	 */
	const handleDownloadChart = useCallback(async () => {
		if (downloading || !chartContainer) {
			return;
		}

		trackEvent(ClickDownloadChart);
		setDownloading(true);

		try {
			const fileName = data.metadata?.title
				? data.metadata.title.replace(/[^a-z0-9а-яё]/gi, '_').toLowerCase()
				: 'chart_export';

			await exportChartToPNG(chartContainer, fileName);
		} catch (error) {
			console.error('Ошибка при скачивании графика:', error);
		} finally {
			setDownloading(false);
		}
	}, [chartContainer, data]);

	return (
		<Row className={classes.root} direction="column">
			<Row
				className={classes.header}
				justify="between"
				align="top"
				mb={32}
				noFlex
			>
				<Title size="H700">{data.metadata?.title}</Title>
				<Row justify="end" gutter={12} noFlex>
					<Button
						variant="ellipse"
						icon={EIconName.downloadArrow}
						onClick={handleDownloadChart}
						disabled={!chartContainer || downloading}
					>
						{t('download')}
					</Button>
					<div className={classes.divider} />
					<Button
						variant="ellipse"
						icon={EIconName.cross}
						iconOnly
						onClick={onClose}
						disabled={downloading}
					/>
				</Row>
			</Row>

			<Graphs {...props} onContainerReady={handleContainerReady} />
		</Row>
	);
};
