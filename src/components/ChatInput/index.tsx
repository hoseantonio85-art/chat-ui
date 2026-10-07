import { submitDraft } from '@/helpers/submitDraft';
import { useAction, useAtom } from '@reatom/npm-react';
import cn from 'classnames';
import React, {
	useDeferredValue,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { Config } from '@/config';
import { useChat } from '@/helpers/useChat';
import { AttachmentS3UploadResponse } from '@/openapi';
import {
	addAttachment as addAttachmentAction,
	attachmentsAtom,
	changeAttachmentProgress as changeAttachmentProgressAction,
	sortMessagesAtom,
	textAtom,
	validateAttachments as validateAttachmentsAction,
} from '@/stores';
import { methodologistService } from '@/stores/services/MethodologistService';
import {
	Button,
	ButtonUploader,
	EIconName,
	Row,
	Text,
	Tooltip,
	notification,
} from '@sber-orm/ui-kit';

import { IAttachment } from '@/types';
import { AssistantSkills } from '@/components/AssistantSkills';
import { useAssistantSkills } from '@/components/AssistantSkills/context';
import { ctx } from '@/stores/ctx';
import { threadsScopeVersionAtom } from '@/stores/threads';
import { activeThreadIdAtom, threadsStatusAtom } from '@/stores/threads';
import { ERoles } from '../Chat/types';
import { FileList } from './components';
import classes from './styles.module.scss';

export interface IChatInputProps
	extends Omit<
		React.HTMLAttributes<HTMLTextAreaElement>,
		'onChange' | 'placeholder' | 'size' | 'onSubmit'
	> {
	onChange?: (value: string) => void;
	placeholder?: string;
	size?: 'sm' | 'md' | 'lg';
	onSubmit?: () => void;
	buttonText: string;
	uploadingFiles?: boolean;
	setUploadingFiles?: (value: boolean) => void;
}

const TEXTAREA_MAX_LENGTH = 4000;

export const ChatInput = React.forwardRef<HTMLDivElement, IChatInputProps>(
	(props, ref) => {
		const {
			buttonText,
			onChange,
			onSubmit,
			placeholder,
			size = 'md',
			uploadingFiles,
			setUploadingFiles,
			...rest
		} = props;

		const { t } = useTranslation();

		const [messages] = useAtom(sortMessagesAtom);
		const [userText, setUserTextAtom] = useAtom(textAtom);
		const [attachments, setAttachments] = useAtom(attachmentsAtom);
		const { selectedSkill } = useAssistantSkills();
		const [activeThreadId] = useAtom(activeThreadIdAtom);
		const [threadsStatus] = useAtom(threadsStatusAtom);
		const threadReady = !Config.threadsEnabled || (!!activeThreadId && threadsStatus !== 'loading');

		const addAttachment = useAction(addAttachmentAction);
		const changeAttachmentProgress = useAction(changeAttachmentProgressAction);
		const validateAttachments = useAction(validateAttachmentsAction);

		const [text, setText] = useState('');
		const submittingRef = useRef(false);
		const [submitting, setSubmitting] = useState(false);
		const [clearingContext, setClearingContext] = useState(false);

		const textDefer = useDeferredValue(text);

		const textareaRef = useRef<HTMLTextAreaElement | null>(null);

		const canClearContext =
			messages.length > 0 &&
			messages[messages.length - 1].extras?.contextCleared !== 'true';

		const { clearContext, send } = useChat();

		const recalcTextareaHeight = () => {
			if (textareaRef.current) {
				const lineHeight = 22;
				const rowsCount =
					(textareaRef.current.value.match(new RegExp(/\n/, 'g'))?.length ||
						0) + 1;

				textareaRef.current.style.height = `${lineHeight * rowsCount}px`;
			}
		};

		const handleSubmit = async () => {
            if (!threadReady || submittingRef.current || !text.trim()) return;

            setSubmitting(true);
            const scope = ctx.get(threadsScopeVersionAtom);
            const threadId = ctx.get(activeThreadIdAtom);
            const isCurrent = () => scope === ctx.get(threadsScopeVersionAtom) && threadId === ctx.get(activeThreadIdAtom);
            try {
                const sent = await submitDraft(submittingRef, () => handleUploadFiles(isCurrent),
                    () => isCurrent() && ctx.get(threadsStatusAtom) !== 'loading',
                    (fileIds) => send({ body: text, extras: {
                    ...(fileIds.length ? { fileIds: JSON.stringify(fileIds) } : {}),
                    ...(selectedSkill ? { skill: selectedSkill.id, skillTitle: selectedSkill.title } : {}),
                } }));
                if (!sent) return;
                setText(''); setAttachments([]); onSubmit?.(); onChange?.('');
            } catch {
                notification(t('sendError'), { type: 'error' });
            } finally {
                submittingRef.current = false;
                setSubmitting(false);
                setUploadingFiles?.(false);
            }
        };

		const handleButtonClick = (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		) => {
			event.stopPropagation();

			if (size === 'lg') {
				rest?.onClick?.({} as React.MouseEvent<HTMLTextAreaElement>);
			}

			void handleSubmit();
		};

		const handleKeyDown = async (event: React.KeyboardEvent) => {
			if (
				event.key === 'Enter' && !event.nativeEvent.isComposing &&
				!(event.key === 'Enter' && event.shiftKey) &&
				text?.trim()
			) {
				event.preventDefault();

				rest?.onKeyDown?.({} as React.KeyboardEvent<HTMLTextAreaElement>);

				void handleSubmit();
			}
		};

		const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
			const target = event.target as HTMLTextAreaElement;

			setText(target.value);
			onChange?.(target.value);
		};

		const handleClearContext = () => {
			setClearingContext(true);
			clearContext();
		};

		const handleUploadFiles = async (isCurrent: () => boolean): Promise<string[] | undefined> => {
			setUploadingFiles?.(true);
			const fileIds: string[] = [];

			for (const file of attachments) {
                if (!isCurrent()) return undefined;
                if (file.errors.length || !file.source) return undefined;
				if (!file.errors.length && file.source) {
					try {
						const response = (await methodologistService.uploadDocument(
							file.fileId,
							file.source,
							(value: number) =>
								isCurrent() && changeAttachmentProgress(file.fileId, value < 100 ? value : 0),
						)) as AttachmentS3UploadResponse;

						if (
							!response.success ||
							!!response?.messages?.length ||
							!!response.body?.notifications?.length
						) {
                            notification(t('fileUploadError'), { type: 'error' });
                            return undefined;
						} else {
							fileIds.push(file.fileId);
						}
					} catch {
                        notification(t('fileUploadError'), { type: 'error' });
                        return undefined;
					}
				}
			}

			setUploadingFiles?.(false);

			return fileIds;
		};

		const handleClickUpload = async (items: { file: File }[]) => {
            if (submittingRef.current) return;
			const files = [] as IAttachment[];

			for (const f of items) {
				const attachment = {
					fileId: uuidv4(),
					fileName: f.file.name,
					size: f.file.size,
					extension: `.${f.file.name.substring(f.file.name?.lastIndexOf('.') + 1)}`,
					source: f.file,
					progress: 0,
					errors: [],
				};

				addAttachment(attachment);
				files.push(attachment);
			}

			if (size === 'lg') {
				setUserTextAtom(textDefer);

				setText('');
				onSubmit?.();
				onChange?.('');
			}

			validateAttachments();
		};

		useEffect(() => {
			setTimeout(() => {
				recalcTextareaHeight();
				textareaRef.current?.focus();
			});

			return function cleanup() {
				setText('');
			};
		}, []);

		useLayoutEffect(() => {
			setTimeout(recalcTextareaHeight);
		}, [text, attachments]);

		useEffect(() => {
			if (messages[messages.length - 1]?.role !== ERoles.user) {
				setClearingContext(false);
			}
		}, [messages]);

		useEffect(() => {
			if (userText && size !== 'lg') {
				setText(userText);
				setUserTextAtom('');
			}
		}, [userText]);

		return (
			<div
				ref={ref}
				className={cn(classes.wrapper, {
					[classes.wrapperShadowed]: size === 'lg',
				})}
			>
				<FileList size={size} canDelete={!uploadingFiles && !submitting} />
				<Row className={classes.fullWidth}>
					{Config.filesUploadEnabled && (
						<ButtonUploader
							className={classes.fileButton}
							variant="ghost"
							size={size === 'lg' ? 'XL' : 'L'}
							icon={EIconName.fileAdd}
							onUpload={handleClickUpload}
						/>
					)}
					<AssistantSkills />
					<textarea
						ref={textareaRef}
                        readOnly={submitting}
                        aria-label={placeholder || t('defaultPlaceholder')}
						className={cn(classes.textarea, classes[`size-${size}`])}
						placeholder={placeholder as string}
						value={text}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						onFocus={rest?.onFocus}
						maxLength={TEXTAREA_MAX_LENGTH}
					/>
					<Row gutter={4} noFlex>
						{canClearContext && size !== 'lg' && (
							<Tooltip
								content={
									<Text className={classes.white} size="sm" bold>
										{t('clearContextHint')}
									</Text>
								}
							>
								<Button
									onClick={handleClearContext}
                                    disabled={submitting}
                                    aria-label={t('clearContextHint')}
									loading={clearingContext}
									icon="refresh"
									variant="ghost"
									size="L"
									iconOnly
								/>
							</Tooltip>
						)}
						<Button
								className={classes.buttonAlign}
								size={size === 'lg' ? 'XL' : 'L'}
								loading={clearingContext || !!uploadingFiles || submitting}
								variant="primary"
								onClick={handleButtonClick}
								disabled={!threadReady || !text.trim() || !!uploadingFiles || submitting}
								icon={EIconName.arrowUp}
								iconOnly
								aria-label={buttonText}
							/>
					</Row>
				</Row>
			</div>
		);
	},
);

ChatInput.displayName = 'ChatInput';
