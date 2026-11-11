import cn from 'classnames';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { navigateToUrl } from 'single-spa';

import { ChatInput } from '@/components/ChatInput';
import { ChatLogoSVG } from '@/components/ChatLogoSVG';
import { ThreadDrawer } from '@/components/ThreadDrawer';
import { getHistoryIndicatorState } from '@/components/ThreadDrawer/activity';
import { useThreadUi } from '@/components/ThreadDrawer/context';
import { useChat } from '@/helpers/useChat';
import {
	attachmentsAtom,
	canLoadHistoryAtom,
	clearContextChatAction,
	isCreateIncidentAvailable,
	isLoadingAtom,
	sortMessagesAtom,
} from '@/stores';
import type { IMessage } from '@/types';
import {
	EChatState,
	type IChatState,
	baseUrl$,
	chat$,
} from '@n-orm/auth-mf-app';
import { useAction, useAtom } from '@reatom/npm-react';
import { useTracking } from '@sber-orm/components';
import { Button, EIconName, Row, Title, Tooltip } from '@sber-orm/ui-kit';

import { IChartData } from '@/components/UniversalChart/types';
import { useMobileDetect } from '@/helpers/useMobileDetect';
import { LoadHistory, Message } from './components';
import { ContextualActionsContext } from './ContextualActionsContext';
import {
	ClickCollapse,
	ClickExpand,
	ClickFullScreen,
	ClickOpenForm,
} from './metrics';
import classes from './styles.module.scss';

export interface IChatProps {
	hideCreatingForm?: boolean;
	onOpenChart?: (value: IChartData) => void;
	onClose?: () => void;
}

export const Chat = React.memo(
	({ hideCreatingForm, onClose, onOpenChart }: IChatProps) => {
		const { isPhone } = useMobileDetect();

		const [messages] = useAtom(sortMessagesAtom);
		const [isLoading] = useAtom(isLoadingAtom);
		const [canLoadHistory] = useAtom(canLoadHistoryAtom);
		const [createIncidentAvailable] = useAtom(isCreateIncidentAvailable);
		const threadUi = useThreadUi();
		const [historyOpen, setHistoryOpen] = useState(Boolean(threadUi.initialDrawerState));
		const historyIndicators = getHistoryIndicatorState(threadUi.threads);
		const historyLabel = historyIndicators.running && historyIndicators.unreadReady
			? 'История диалогов — агент работает, есть новый результат'
			: historyIndicators.running
				? 'История диалогов — агент работает'
				: historyIndicators.unreadReady
					? 'История диалогов — есть новый результат'
					: 'История диалогов';
		const activeThread = threadUi.threads.find(item => item.id === threadUi.activeThreadId);
		const canCreateIncident = threadUi.enabled
			? activeThread?.initialSkill === 'createIncident'
			: createIncidentAvailable;

		const { trackEvent } = useTracking();

		// const handleReset = useAction(resetAction);
		const clearContextChat = useAction(clearContextChatAction);
		const [, setAttachments] = useAtom(attachmentsAtom);

		const { isMessageSending, loadHistory } = useChat();

		const [chatState, setChatState] = useState(chat$.value.state);
		const [sendingMessage, setSendingMessage] = useState(true);
		const [uploadingFiles, setUploadingFiles] = useState(false);
		const resizeLabel = chatState === EChatState.fullScreen ? 'Свернуть чат' : 'Развернуть чат';

		const messageContainerRef = useRef<HTMLDivElement | null>(null);
		const contextualActions = useContext(ContextualActionsContext);
		const promptId = contextualActions && [...messages].reverse().find(contextualActions.matches)?.id;
		const [hiddenPromptId, setHiddenPromptId] = useState<string>();
		const showStickyActions = Boolean(promptId && promptId === hiddenPromptId);
		const { t } = useTranslation();

		useLayoutEffect(() => {
			const root = messageContainerRef.current;
			const prompt = root?.querySelector('[data-contextual-prompt]');
			if (!root || !prompt || !promptId) {
				setHiddenPromptId(undefined);
				return;
			}
			const observer = new IntersectionObserver(([entry]) => {
				setHiddenPromptId(entry.isIntersecting ? undefined : promptId);
			}, { root });
			observer.observe(prompt);
			return () => observer.disconnect();
		}, [promptId]);

		const handleSubmit = () => {
			setSendingMessage(true);
		};

		const handleClose = () => {
			chat$.closeChat();
			clearContextChat();
			setAttachments([]);
			onClose?.();
		};

		const handleResize = () => {
			trackEvent(
				chatState === EChatState.fullScreen ? ClickCollapse : ClickExpand,
			);
			chat$.changeChatState(
				chatState === EChatState.fullScreen
					? EChatState.small
					: EChatState.fullScreen,
			);
		};

		// eslint-disable-next-line unicorn/consistent-function-scoping
		const createIncident = () => {
			trackEvent(ClickOpenForm);
			clearContextChat();
			chat$.closeChat();
			navigateToUrl(
				`${baseUrl$.incidents ?? ''}/create?startModalUrl=${location.pathname}`,
			);
		};

		const handleLoadHistory = useCallback(() => {
			setSendingMessage(false);

			loadHistory(messages[0].id);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [messages.length, loadHistory]);

		const handleOpenChart = (data: IChartData) => {
			if (onOpenChart) {
				trackEvent(ClickFullScreen);
				onOpenChart?.(data);
			}
		};

		useEffect(() => {
			if (chat$.value.state !== EChatState.small) {
				chat$.changeChatState(EChatState.small);
			}
		}, [isPhone]);

		useEffect(() => {
			const observer = chat$.observer$.subscribe({
				next(data: IChatState) {
					setChatState(data.state);
				},
			});

			if (messageContainerRef.current) {
				messageContainerRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
					inline: 'nearest',
				});
			}

			return function cleanup() {
				observer.unsubscribe();
				// handleReset();
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		useEffect(() => {
			if (sendingMessage) {
				messageContainerRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
					inline: 'nearest',
				});
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [messages.length]);

		return (
			<div
				className={cn(classes.chat, {
					[classes.chatSmall]: chatState === EChatState.small,
				})}
			>
				<ThreadDrawer open={historyOpen} onClose={() => setHistoryOpen(false)} />
				<div className={classes.header}>
					<div className={classes.headerLeading}>
						{threadUi.enabled && (
							<>
								<span className={classes.historyTrigger}>
                  <Tooltip content="История чатов" placement="bottom-start" showOnChildFocus>
                    <Button variant="ellipse" icon={EIconName.burgerMenu} iconOnly aria-label={historyLabel} aria-expanded={historyOpen} onClick={() => setHistoryOpen(true)} />
                  </Tooltip>
                  {historyIndicators.unreadReady && <span className={classes.historyIndicators} aria-hidden="true">
                    {historyIndicators.unreadReady && <i className={classes.historySparkle}/>}
                  </span>}
                </span>
								<div className={classes.navigationDivider} aria-hidden="true" />
							</>
						)}
					<div className={classes.title}>
						<ChatLogoSVG className={classes.titleLogo} />
						<Title size="H700" className={classes.titleText}>
							{t('modalTitle')}
						</Title>
					</div>
					</div>
					<Row justify="end" gutter={16}>
						{!!canCreateIncident && !hideCreatingForm && !isPhone && (
							<>
								<Tooltip content={t('openForm')} placement="bottom" showOnChildFocus>
									<Button
										variant="ellipse"
										icon={chatState === EChatState.small ? EIconName.fill : undefined}
										iconAfter={chatState === EChatState.small ? undefined : EIconName.fill}
										iconOnly={chatState === EChatState.small}
										aria-label={t('openForm')}
										onClick={createIncident}
										disabled={uploadingFiles}
									>
										{chatState === EChatState.small ? null : t('openForm')}
									</Button>
								</Tooltip>
								<div className={classes.headerDivider} />
							</>
						)}
						{threadUi.enabled && <>
							<Tooltip content="Новый чат" placement="bottom" showOnChildFocus>
								<Button
									variant="ellipse"
									icon={EIconName.message}
									iconOnly
									aria-label="Новый чат"
									onClick={threadUi.onNew}
								/>
							</Tooltip>
							<div className={classes.headerDivider} aria-hidden="true" />
						</>}
						{!chat$.value.showResizeButton && !isPhone && (
							<Tooltip content={resizeLabel} placement="bottom" showOnChildFocus>
								<Button
									variant="ellipse"
									icon={
										chatState === EChatState.fullScreen
											? EIconName.minimumScreen
											: EIconName.fullScreen
									}
									iconOnly
									aria-label={resizeLabel}
									onClick={handleResize}
								/>
							</Tooltip>
						)}
						<Tooltip content="Закрыть чат" placement="bottom-end" showOnChildFocus>
							<Button
								variant="ellipse"
								icon={EIconName.cross}
								aria-label="Закрыть чат"
								iconOnly
								onClick={handleClose}
								disabled={uploadingFiles}
							/>
						</Tooltip>
					</Row>
				</div>
				<div className={classes.content}>
					<div className={classes.messages} ref={messageContainerRef}>
						{isLoading && !messages.some(message => message.extras?.agentPending === 'true') && <Message key="loader" loader />}
						{[...messages].reverse().map((message, index) => (
							<Message
								id={message.id}
								key={message.id}
								message={message as IMessage}
								isLastMessage={index === 0}
								sending={isMessageSending(message.id as string)}
								onOpenChart={!isPhone ? handleOpenChart : undefined}
								contextualPrompt={Boolean(promptId && message.id === promptId)}
								contextualActions={promptId && message.id === promptId && !showStickyActions
									? contextualActions?.render('inline') : undefined}
							/>
						))}
						{messages.length > 0 ? (
							<LoadHistory
								action={handleLoadHistory}
								isEndOfList={!canLoadHistory}
							/>
						) : null}
					</div>
					{showStickyActions && contextualActions?.render('sticky')}
					<ChatInput
						size="sm"
						buttonText={t('send') || ''}
						placeholder={t('modalPlaceholder')}
						onSubmit={handleSubmit}
						uploadingFiles={uploadingFiles}
						setUploadingFiles={setUploadingFiles}
					/>
				</div>
			</div>
		);
	},
);

Chat.displayName = 'Chat';
