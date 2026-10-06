import { useTracking } from '@sber-orm/components';
import { Button, EIconName, Row } from '@sber-orm/ui-kit';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ClickDownloadTable } from './metrics';
import classes from './styles.module.scss';
import { exportTableToExcel } from './utils';

export const Table = ({ children }: { children: React.ReactNode }) => {
	const { t } = useTranslation();

	const { trackEvent } = useTracking();

	const [downloading, setDownloading] = useState<boolean>(false);

	const tableRef = useRef<HTMLTableElement | null>(null);
	const tableRef1 = useRef<HTMLDivElement | null>(null);

	const handleClick = useCallback(async () => {
		if (!tableRef.current) {
			return;
		}

		trackEvent(ClickDownloadTable);

		setDownloading(true);

		await exportTableToExcel(tableRef.current);

		setDownloading(false);
	}, [trackEvent]);

	return (
		<Row
			ref={tableRef1}
			className={classes.wrapper}
			direction="column"
			align="top"
			justify="start"
			noFlex
		>
			<Row justify="end" gutter={8} noFlex className={classes.buttonContainer}>
				<Button
					onClick={handleClick}
					disabled={downloading}
					size="XXS"
					variant="ellipse"
					icon={EIconName.downloadArrow}
					className={classes.download}
				>
					{t('download')}
				</Button>
			</Row>
			<table ref={tableRef}>{children}</table>
		</Row>
	);
};
