import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import { Config } from '@/config';
import { useChat } from '@/helpers/useChat';
import {
	EChatState,
	type IChatState,
	chat$,
	tenant$,
	user$,
} from '@n-orm/auth-mf-app';
import { ClickStreamProvider, Portal } from '@sber-orm/components';

import { IChartData } from '@/components/UniversalChart/types';
import { useMobileDetect } from '@/helpers/useMobileDetect';
import { Chat } from '../Chat';
import { UniversalChart } from '../UniversalChart';
import classes from './styles.module.scss';

export const ModalContainer = React.memo(() => {
	const { isPhone } = useMobileDetect();

	const [isPortalOpen, setIsPortalOpen] = useState(chat$.value.isPortalOpen);
	const [chatState, setChatState] = useState(chat$.value.state);
	const [messageQueue, setMessageQueue] = useState(chat$.value.messageQueue);
	const [chartData, setChartData] = useState<IChartData | null>(null);
	const [isChartOpen, setIsChartOpen] = useState(false);

	const { send } = useChat();

	const handleOpenChart = (value: IChartData) => {
		setChartData(value);
		chat$.changeChatState(EChatState.small);
		setIsChartOpen(true);
	};

	const handleCloseChart = () => {
		chat$.changeChatState(EChatState.fullScreen);
		setIsChartOpen(false);
	};

	useEffect(() => {
		if (messageQueue) {
			chat$.openChat();

			send(messageQueue);

			chat$.clearMessageQueue();
		}
	}, [messageQueue]);

	useEffect(() => {
		const observer = chat$.observer$.subscribe({
			next(data: IChatState) {
				setIsPortalOpen(!!data.isPortalOpen);
				setChatState(data.state);
				setMessageQueue(data.messageQueue);
			},
			// eslint-disable-next-line perfectionist/sort-objects
			error() {
				setIsPortalOpen(false);
			},
		});

		return function cleanup() {
			observer.unsubscribe();
		};
	}, []);

	return (
		<ClickStreamProvider
			clickStreamUrl={Config.clickStreamUrl}
			clickStreamKey={Config.clickStreamKey}
			clickStreamEnabled={Config.clickStreamEnabled}
			appBlockName="SBERNORM_CHAT_web"
			tenantId={tenant$.value.tenantId as string}
			userInfo={user$.value}
		>
			<Portal id="modal-chat-container" visible={isPortalOpen}>
				<div
					className={cn(classes.wrapper, {
						[classes.wrapperChatRight]:
							chatState === EChatState.small && !isChartOpen,
						[classes.wrapperWithBackground]:
							chatState === EChatState.fullScreen || isChartOpen,
						[classes.wrapperPhone]: isPhone,
					})}
				>
					<div
						className={cn(classes.content, {
							[classes.contentChatRight]:
								chatState === EChatState.small && !isChartOpen,
						})}
					>
						{isChartOpen && chartData && (
							<UniversalChart
								data={chartData}
								fullscreen
								onClose={handleCloseChart}
							/>
						)}
						<Chat onOpenChart={handleOpenChart} />
					</div>
				</div>
			</Portal>
		</ClickStreamProvider>
	);
});
ModalContainer.displayName = 'ModalContainer';
