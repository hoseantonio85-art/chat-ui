import React, { useLayoutEffect, useRef } from 'react';

import { Message } from '../Message';
import type { ILoadHistoryProps } from './types';

const subscribeIntersection = (
	element: HTMLDivElement,
	clb: (records?: IntersectionObserverEntry[]) => void,
	options: IntersectionObserverInit,
) => {
	const interObs = new IntersectionObserver((entries) => {
		clb(entries);
	}, options);

	interObs.observe(element);

	return () => {
		interObs.disconnect();
	};
};

export const LoadHistory = React.memo<ILoadHistoryProps>(
	({ action, isEndOfList }) => {
		const ref = useRef<HTMLDivElement | null>(null);

		useLayoutEffect(() => {
			if (!isEndOfList) {
				const element = ref.current;

				if (!element) {
					return;
				}

				const unsubscribe = subscribeIntersection(
					element,
					(entries) => {
						if (entries?.[0].isIntersecting) {
							action();
						}
					},
					{
						threshold: 0,
					},
				);

				return () => {
					unsubscribe();
				};
			}
		}, [ref, action, isEndOfList]);

		return <div ref={ref}>{!isEndOfList && <Message loader />}</div>;
	},
);

LoadHistory.displayName = 'LoadHistory';
