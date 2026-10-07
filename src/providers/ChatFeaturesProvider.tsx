import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AgentRunsContext } from '@/components/AgentActivity/context';
import {
	AssistantSkillsContext,
	type AssistantSkill,
} from '@/components/AssistantSkills/context';
import { ThreadUiContext } from '@/components/ThreadDrawer/context';
import { Config } from '@/config';
import { getThreadRepository } from '@/services/threads/repository';
import type { ThreadSnapshot } from '@/services/threads/types';
import {
	agentRunsAtom,
	hydrateAgentRunsAction,
} from '@/stores/agentRuns';
import {
	selectedAssistantSkillIdAtom,
	selectAssistantSkillAction,
} from '@/stores/assistantSkills';
import {
	addMessageAction,
	canLoadHistoryAtom,
	resetAction,
	skillsAtom,
} from '@/stores';
import {
	activeThreadIdAtom,
	removeThreadAction,
	setActiveThreadAction,
	setThreadsAction,
	setThreadsStatusAction,
	threadsAtom,
	threadsStatusAtom,
	threadsScopeVersionAtom,
	upsertThreadAction,
} from '@/stores/threads';
import { ctx } from '@/stores/ctx';
import { useAction, useAtom } from '@reatom/npm-react';
import { notification } from '@sber-orm/ui-kit';

export function ChatFeaturesProvider({ children }: React.PropsWithChildren) {
	const { t } = useTranslation();
	const [agentRuns] = useAtom(agentRunsAtom);
	const [skills] = useAtom(skillsAtom);
	const [selectedSkillId] = useAtom(selectedAssistantSkillIdAtom);
	const [threads] = useAtom(threadsAtom);
	const [activeThreadId] = useAtom(activeThreadIdAtom);
	const [threadsStatus] = useAtom(threadsStatusAtom);

	const hydrateRuns = useAction(hydrateAgentRunsAction);
	const selectSkill = useAction(selectAssistantSkillAction);
	const setThreads = useAction(setThreadsAction);
	const setActiveThread = useAction(setActiveThreadAction);
	const setThreadsStatus = useAction(setThreadsStatusAction);
	const upsertThread = useAction(upsertThreadAction);
	const removeThread = useAction(removeThreadAction);
	const resetMessages = useAction(resetAction);
	const addMessage = useAction(addMessageAction);
	const [, setCanLoadHistory] = useAtom(canLoadHistoryAtom);

	const assistantSkills = useMemo<AssistantSkill[]>(
		() =>
			Config.assistantSkillsEnabled
				? skills
						.filter((skill) => skill.active)
						.map(({ id, title }) => ({ id, title }))
				: [],
		[skills],
	);
	const selectedSkill = assistantSkills.find((skill) => skill.id === selectedSkillId);

	const applySnapshot = useCallback(
		(snapshot: ThreadSnapshot) => {
			resetMessages();
			for (const message of snapshot.messages) {
				addMessage(message, { silent: true });
			}
			hydrateRuns(snapshot.agentRuns);
			setCanLoadHistory(snapshot.canLoadHistory);
			upsertThread(snapshot.thread);
			setActiveThread(snapshot.thread.id);
			selectSkill(snapshot.thread.initialSkill);
		},
		[
			addMessage,
			hydrateRuns,
			resetMessages,
			selectSkill,
			setActiveThread,
			setCanLoadHistory,
			upsertThread,
		],
	);

	const runThreadOperation = useCallback(async (operation: (isCurrent: () => boolean) => Promise<void>) => {
		if (ctx.get(threadsStatusAtom) === 'loading') {
			return;
		}
		setThreadsStatus('loading');
		const scopeVersion = ctx.get(threadsScopeVersionAtom);
		const isCurrent = () => ctx.get(threadsScopeVersionAtom) === scopeVersion;
		try {
			await operation(isCurrent);
			if (isCurrent()) setThreadsStatus('ready');
		} catch {
			if (!isCurrent()) return;
			setThreadsStatus('error');
			notification(t('threads.operationError'), { type: 'error' });
		}
	}, [setThreadsStatus, t]);

	useEffect(() => {
		if (!Config.threadsEnabled || ctx.get(threadsStatusAtom) !== 'idle') {
			return;
		}

		void runThreadOperation(async (isCurrent) => {
			const loadedThreads = await getThreadRepository().list();
			if (!isCurrent()) return;
			setThreads(loadedThreads);
			if (ctx.get(activeThreadIdAtom)) {
				return;
			}
			const latest = [...loadedThreads].sort((a, b) => b.updatedAt - a.updatedAt)[0];
			const snapshot = latest
				? await getThreadRepository().load(latest.id)
				: await getThreadRepository().create({ title: t('threads.defaultTitle') });
			if (isCurrent()) applySnapshot(snapshot);
		});
	}, [applySnapshot, runThreadOperation, setThreads, t, threadsStatus]);

	const threadUi = useMemo(
		() => ({
			enabled: Config.threadsEnabled,
			busy: threadsStatus === 'loading',
			threads,
			activeThreadId,
			onSelect: (threadId: string) => {
				void runThreadOperation(async (isCurrent) => {
					const snapshot = await getThreadRepository().load(threadId);
					if (isCurrent()) applySnapshot(snapshot);
				});
			},
			onNew: () => {
				void runThreadOperation(async (isCurrent) => {
					const snapshot = await getThreadRepository().create({
						title: t('threads.defaultTitle'),
						initialSkill: selectedSkillId,
					});
					if (isCurrent()) applySnapshot(snapshot);
				});
			},
			onRename: (threadId: string, title: string) => {
				void runThreadOperation(async (isCurrent) => {
					const thread = await getThreadRepository().rename(threadId, title);
					if (isCurrent()) upsertThread(thread);
				});
			},
			onTogglePin: (threadId: string) => {
				const thread = threads.find((item) => item.id === threadId);
				if (!thread) {
					return;
				}
				void runThreadOperation(async (isCurrent) => {
					const updatedThread = await getThreadRepository().setPinned(threadId, !thread.pinned);
					if (isCurrent()) upsertThread(updatedThread);
				});
			},
			onDelete: (threadId: string) => {
				void runThreadOperation(async (isCurrent) => {
					await getThreadRepository().delete(threadId);
					if (!isCurrent()) return;
					removeThread(threadId);
					if (activeThreadId === threadId) {
						resetMessages();
						hydrateRuns({});
						setActiveThread(undefined);
						selectSkill(undefined);
						setCanLoadHistory(false);
					}
				});
			},
		}),
		[
			activeThreadId,
			applySnapshot,
			hydrateRuns,
			removeThread,
			resetMessages,
			runThreadOperation,
			selectedSkillId,
			selectSkill,
			setCanLoadHistory,
			setActiveThread,
			t,
			threads,
			threadsStatus,
			upsertThread,
		],
	);

	const assistantSkillsValue = useMemo(
		() => ({
			skills: assistantSkills,
			selectedSkill,
			onSelect: selectSkill,
		}),
		[assistantSkills, selectedSkill, selectSkill],
	);

	return (
		<ThreadUiContext.Provider value={threadUi}>
			<AssistantSkillsContext.Provider value={assistantSkillsValue}>
				<AgentRunsContext.Provider value={Config.universalAgentEnabled ? agentRuns : {}}>
					{children}
				</AgentRunsContext.Provider>
			</AssistantSkillsContext.Provider>
		</ThreadUiContext.Provider>
	);
}
