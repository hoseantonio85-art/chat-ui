import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { reatomContext } from '@reatom/npm-react';
import { Button } from '@sber-orm/ui-kit';
import { ModalContainer } from '@/components/ModalContainer';
import { ctx } from '@/stores/ctx';
import { addMessageAction, attachmentsAtom, canLoadHistoryAtom, contextChatAtom, isLoadingAtom, messagesAtom, resetAction, textAtom } from '@/stores';
import { ERoles, type IMessage } from '@/types';
import { AgentRunsContext } from '../src/components/AgentActivity/context';
import { appendEvent, createRun, type AgentRun } from '../src/components/AgentActivity/model';
import { AssistantSkillsContext, type AssistantSkill } from '../src/components/AssistantSkills/context';
import { ThreadUiContext, type ChatThread } from '../src/components/ThreadDrawer/context';
import { completeThreadActivity, markThreadActivityRead, startThreadActivity } from '../src/components/ThreadDrawer/activity';
import { clearMemoryFacts, forgetMemoryFact, resetThreads } from '../src/components/ThreadDrawer/settings';
import { chat$, EChatState } from './mocks/auth';
import { resetPending, setDemoOnline, setDemoSender } from './mocks/useChat';
import { chart, fixture, scenarios, type ScenarioId, vndCorrectedAnswer, vndResultAnswer, vndStandardPrompt } from './scenarios';
import modalClasses from '@/components/ModalContainer/styles.module.scss';
import chatClasses from '@/components/Chat/styles.module.scss';
import '@/i18n';
import './vendor/ui-kit/dist/index.css';
import './styles.css';
import {useVndBackground} from './VndBackground';
import {canResolveVndAttachmentLookup} from './VndBackground.model';
import {methodologistService} from './mocks/files';
import {createAtlasPreview, type AtlasPreviewThread} from './atlasPreview';
import { MessageAddonContext } from '../src/components/Chat/MessageAddonContext';
import { FeedbackCard, type FeedbackAddon } from './FeedbackCard';
import {
  addCsiComment,
  addFeedbackClarification,
  addUnresolvedFeedbackClarification,
  cancelCsi,
  classifyFeedbackExample,
  createCsiDraft,
  createQualitativeFeedback,
  getCsiCommentPrompt,
  isVndServiceMention as isVndServiceReply,
  parseCsiRatingInput,
  resolveFeedbackExampleScenario,
  saveFeedbackMock,
  selectCsiRating,
  setFeedbackService,
  skipCsiComment,
  type CsiDraft,
  type FeedbackDraft,
  type QualitativeFeedbackDraft,
} from './Feedback.model';

type VndStage = 'start' | 'chooseStandard' | 'reviewed' | 'complete';
type DemoThread = AtlasPreviewThread;
const assistantSkills: AssistantSkill[] = [
  {id: 'methodologist', title: 'Методолог'}, {id: 'risk-review', title: 'Проверка рисков'}, {id: 'createIncident', title: 'Регистрация события'},
];
const demoFlags = { assistantSkills: false } as const;
const initialAgentMemory = [
  'Предпочитает краткие ответы с выводом в начале',
  'Работает с внутренними нормативными документами и операционными рисками',
  'Для итоговых материалов использует деловой стиль',
];
const feedbackExtras = (addon: FeedbackAddon): IMessage['extras'] => ({ type: 'system', feedbackAddon: addon });

function historicalThread(id: string, title: string, scenario: ScenarioId, minutesAgo: number, pinned = false, initialSkill?: string): DemoThread {
  const startedAt = Date.now() - minutesAgo * 60_000;
  const requestId = `${id}-question`; const responseId = `${id}-answer`;
  const {events, answer} = fixture(scenario, responseId, startedAt);
  let run = createRun(responseId, requestId, startedAt);
  events.forEach(event => { run = appendEvent(run, event); });
  if (events.length) run = appendEvent(run, {id: `${responseId}-finish`, runId: responseId, at: events.at(-1)!.at, kind: 'finish'});
  return {id, title, scenario, pinned, initialSkill, updatedAt: startedAt, runs: events.length ? {[responseId]: run} : {}, messages: [
    {id: requestId, role: ERoles.user, text: scenarios.find(item => item.id === scenario)!.question, timeCreated: new Date(startedAt).toISOString()},
    {id: responseId, requestId, role: ERoles.bot, text: answer, timeCreated: new Date(startedAt + 1).toISOString(), extras: scenario === 'rich' ? {fileIds:'["demo-report"]', chart} as IMessage['extras'] : undefined},
  ]};
}
const initialThreads = () => [
  {
    id: 'vnd',
    title: 'Проверка ВНД',
    scenario: 'vnd',
    pinned: true,
    updatedAt: Date.now(),
    runs: {},
    vndStage: 'start',
    messages: [],
  } satisfies DemoThread,
  historicalThread('risk', 'Анализ рисков компании', 'normal', 8, true),
  historicalThread('registration', 'Регистрация события', 'registration', 22, false, 'createIncident'),
  historicalThread('expert', 'Проверка поставщика', 'subagent', 65, true),
  historicalThread('registry', 'Риски нового направления', 'empty', 45 * 24 * 60),
  historicalThread('finance', 'Финансовые показатели', 'rich', 90 * 24 * 60),
];

function createInitialAppState() {
  const params = new URLSearchParams(window.location.search);
  const baseThreads = initialThreads();
  const preview = createAtlasPreview(params.get('atlas'), baseThreads, initialAgentMemory);
  return {
    threads: preview?.threads ?? baseThreads,
    agentMemory: preview?.agentMemory ?? initialAgentMemory,
    activeThreadId: preview?.activeThreadId ?? 'vnd',
    scenario: preview?.scenario ?? 'vnd',
    drawer: preview?.drawer,
    drawerFocus: preview?.drawerFocus,
    previewStepId: preview?.stepId,
    embedded: params.get('embed') === '1',
  };
}

function App() {
  const [initialState] = useState(createInitialAppState);
  const [threads, setThreads] = useState<DemoThread[]>(initialState.threads); const threadsRef = useRef(threads);
  const [agentMemory, setAgentMemory] = useState(initialState.agentMemory);
  const [activeThreadId, setActiveThreadId] = useState(initialState.activeThreadId); const activeIdRef = useRef(activeThreadId);
  const [scenario, setScenario] = useState<ScenarioId>(initialState.scenario);
  const initialThread = initialState.threads.find(thread => thread.id === initialState.activeThreadId) ?? initialState.threads[0];
  const [runs, setRunsState] = useState<Record<string, AgentRun>>(initialThread.runs); const runsRef = useRef(runs);
  const vndStageRef = useRef<VndStage>(initialThread.vndStage || 'start');
  const [selectedSkillId, setSelectedSkillId] = useState<string>();
  const [playing, setPlaying] = useState(false); const [online, setOnline] = useState(true); const [actionUrl, setActionUrl] = useState('');
  const generations = useRef(new Map<string, number>()); const timeouts = useRef(new Map<string, Set<ReturnType<typeof setTimeout>>>());
  const attachmentLookups = useRef(new Map<string, string>());
  const setRuns = (value: Record<string, AgentRun>) => { runsRef.current = value; setRunsState(value); };
  const clearThreadTimers = (id: string) => {
    generations.current.set(id, (generations.current.get(id) || 0) + 1);
    timeouts.current.get(id)?.forEach(clearTimeout);
    timeouts.current.delete(id);
  };
  const clearAllTimers = () => { timeouts.current.forEach(items => items.forEach(clearTimeout)); timeouts.current.clear(); generations.current.clear(); };
  const later = (id: string, callback: () => void, delay: number) => {
    const generation = generations.current.get(id) || 0;
    const timer = setTimeout(() => {
      timeouts.current.get(id)?.delete(timer);
      if (generation === (generations.current.get(id) || 0)) callback();
    }, delay);
    const items = timeouts.current.get(id) || new Set<ReturnType<typeof setTimeout>>();
    items.add(timer); timeouts.current.set(id, items);
  };
  const updateThreads = (change: (items: DemoThread[]) => DemoThread[]) => { const next = change(threadsRef.current); threadsRef.current = next; setThreads(next); };
  const startActivity = (id: string) => updateThreads(items => startThreadActivity(items, id, Date.now()));
  const completeActivity = (id: string) => updateThreads(items => completeThreadActivity(items, id, {
    viewed: activeIdRef.current === id && chat$.value.isPortalOpen && document.visibilityState === 'visible',
    at: Date.now(),
  }));
  const publishRun = (id: string, run: AgentRun) => {
    if (activeIdRef.current === id) setRuns({...runsRef.current, [run.runId]: run});
    updateThreads(items => items.map(item => item.id === id ? {...item, runs:{...item.runs, [run.runId]:run}} : item));
  };
  const storeCurrent = () => {
    const next = threadsRef.current.map(thread => thread.id === activeIdRef.current ? {...thread, messages: ctx.get(messagesAtom).map(({remove: _remove, ...message}) => message), runs: runsRef.current, vndStage: thread.scenario.startsWith('vnd') ? vndStageRef.current : thread.vndStage, updatedAt: Date.now()} : thread);
    threadsRef.current = next; setThreads(next); return next;
  };
  const appendToThread = (id: string, message: IMessage) => {
    if (activeIdRef.current === id) {
      addMessageAction(ctx, message);
      queueMicrotask(storeCurrent);
      return;
    }
    updateThreads(items => items.map(thread => {
      if (thread.id !== id) return thread;
      const index = thread.messages.findIndex(item => item.id === message.id);
      const messages = index < 0
        ? [...thread.messages, message]
        : thread.messages.map((item, messageIndex) => messageIndex === index ? message : item);
      return {...thread, messages, updatedAt:Date.now()};
    }));
  };
  const loadThread = (thread: DemoThread) => {
    resetPending(); resetAction(ctx); attachmentsAtom(ctx, []); textAtom(ctx, ''); thread.messages.forEach(message => addMessageAction(ctx, message));
    canLoadHistoryAtom(ctx, false); isLoadingAtom(ctx, false); contextChatAtom(ctx, thread.initialSkill === 'createIncident' ? {intent:'createIncident', company_id:'demo-company'} : {company_id:'demo-company'});
    activeIdRef.current = thread.id; setActiveThreadId(thread.id); setScenario(thread.scenario); setRuns(thread.runs); setPlaying(thread.agentState === 'running'); setSelectedSkillId(thread.initialSkill === 'createIncident' ? 'createIncident' : undefined); vndStageRef.current = thread.vndStage || 'start';
  };
  const selectThread = (id: string) => { const saved = storeCurrent(); const thread = saved.find(item => item.id === id); if (thread) { loadThread(thread); updateThreads(items => markThreadActivityRead(items, id)); background.markRead(id); } };
  const newThread = () => { const saved = storeCurrent(); const id = `thread-${crypto.randomUUID()}`; const thread: DemoThread = {id, title:'Новый диалог', pinned:false, updatedAt:Date.now(), scenario:'ordinary', messages:[], runs:{}}; const next = [...saved, thread]; threadsRef.current = next; setThreads(next); loadThread(thread); };
  const deleteThread = (id: string) => { attachmentLookups.current.delete(id); clearThreadTimers(id); background.cancel(id); const remaining = threadsRef.current.filter(item => item.id !== id); if (!remaining.length) { newThread(); return; } updateThreads(() => remaining); if (id === activeIdRef.current) loadThread(remaining[0]); };
  const clearAllThreads = () => {
    threadsRef.current.forEach(thread => { attachmentLookups.current.delete(thread.id); background.cancel(thread.id); });
    clearAllTimers();
    attachmentLookups.current.clear();
    const thread: DemoThread = {id:`thread-${crypto.randomUUID()}`, title:'Новый диалог', pinned:false, updatedAt:Date.now(), scenario:'ordinary', messages:[], runs:{}};
    const next = resetThreads(thread);
    threadsRef.current = next;
    setThreads(next);
    loadThread(thread);
    chat$.openChat();
  };

  const setVndStage = (stage: VndStage, id = activeIdRef.current) => {
    if (activeIdRef.current === id) vndStageRef.current = stage;
    updateThreads(items => items.map(thread => thread.id === id ? {...thread, vndStage:stage, updatedAt:Date.now()} : thread));
  };

  const background = useVndBackground<DemoThread>({
    activeId:activeIdRef,getThreads:()=>threadsRef.current,update:updateThreads,snapshot:storeCurrent,
    append:message=>addMessageAction(ctx,message),
    publishRun,
  });

  const getActiveFeedback = () => threadsRef.current.find(thread => thread.id === activeIdRef.current)?.feedbackDraft;
  const getActiveCsi = (): CsiDraft | undefined => {
    const draft = getActiveFeedback();
    return draft?.kind === 'csi' ? draft : undefined;
  };
  const updateFeedbackDraft = (draft: FeedbackDraft) => updateThreads(items => items.map(thread =>
    thread.id === activeIdRef.current ? {...thread, feedbackDraft:draft, updatedAt:Date.now()} : thread,
  ));
  const appendMockResult = (draft: FeedbackDraft) => {
    const success = draft.status === 'submitted';
    const text = success
      ? draft.kind === 'csi'
        ? 'Спасибо, записал оценку в демо. **Команде она пока не отправлена.**'
        : 'Спасибо, записал отзыв в демо. **Команде он пока не отправлен.**'
      : draft.kind === 'csi'
        ? 'Не удалось сохранить оценку даже в демо. Не буду говорить, что она передана.'
        : 'Не удалось сохранить отзыв даже в демо. Не буду говорить, что он передан.';
    appendToThread(activeIdRef.current, {
      id:`feedback-result-${crypto.randomUUID()}`,
      role:ERoles.bot,
      text,
      timeCreated:new Date().toISOString(),
    });
  };
  const completeCsi = (ready: CsiDraft) => {
    const saved = saveFeedbackMock(ready);
    updateFeedbackDraft(saved);
    appendMockResult(saved);
  };
  const selectCsiValue = (value: number) => {
    const current = getActiveCsi();
    if (!current || current.stage !== 'rating') return;
    const messageId = `csi-rating-${crypto.randomUUID()}`;
    const now = new Date().toISOString();
    const next = selectCsiRating(current, value, messageId, now);
    updateFeedbackDraft(next);
    appendToThread(activeIdRef.current, {id:messageId, role:ERoles.user, text:`${value} из 5`, timeCreated:now});
    appendToThread(activeIdRef.current, {
      id:`csi-comment-prompt-${crypto.randomUUID()}`,
      role:ERoles.bot,
      text:getCsiCommentPrompt(value),
      extras:feedbackExtras('csi-comment-actions'),
      timeCreated:new Date().toISOString(),
    });
  };
  const skipCsiText = () => {
    const current = getActiveCsi();
    if (!current || current.stage !== 'comment') return;
    completeCsi(skipCsiComment(current));
  };
  const declineCsi = () => {
    const current = getActiveCsi();
    if (!current || current.status !== 'draft') return;
    updateFeedbackDraft(cancelCsi(current));
    appendToThread(activeIdRef.current, {
      id:`csi-cancelled-${crypto.randomUUID()}`,
      role:ERoles.bot,
      text:'Хорошо, вернёмся к работе.',
      timeCreated:new Date().toISOString(),
    });
  };

  function playCsiFlow(entry: Extract<ScenarioId, 'csiProactive' | 'csiDirect' | 'csiDirectUnknown' | 'csiError'>, instant = false, directRequest?: string, preserveCurrent = false) {
    const threadId = activeIdRef.current;
    clearThreadTimers(threadId); resetPending();
    if (!preserveCurrent) { resetAction(ctx); attachmentsAtom(ctx, []); textAtom(ctx, ''); canLoadHistoryAtom(ctx, false); isLoadingAtom(ctx, false); }
    const startedAt = new Date().toISOString();
    const direct = entry === 'csiDirect' || entry === 'csiDirectUnknown';
    let draft = createCsiDraft(direct ? 'user_initiated' : 'proactive', startedAt, {
      serviceKnown: entry !== 'csiDirectUnknown',
      mockOutcome: entry === 'csiError' ? 'error' : 'success',
    });
    const messages: IMessage[] = !direct
      ? [
          {id:'csi-context-save', role:ERoles.bot, text:'Сохранил «Регламент управления операционными рисками.docx» в базу знаний, в папку «Операционные риски».', timeCreated:startedAt},
          {id:'csi-prompt', role:ERoles.bot, text:'Готово, документ сохранён. Можно ещё один короткий вопрос?', extras:feedbackExtras('csi-rating'), timeCreated:startedAt},
        ]
      : entry === 'csiDirectUnknown' ? [
          {id:'csi-direct-request', role:ERoles.user, text:directRequest ?? 'Хочу оценить сервис.', timeCreated:startedAt},
          {id:'csi-service-prompt', role:ERoles.bot, text:'Конечно. Какой сервис оценим?', timeCreated:startedAt},
        ] : [
          {id:'csi-direct-request', role:ERoles.user, text:directRequest ?? 'Хочу оценить сервис проверки ВНД.', timeCreated:startedAt},
          {id:'csi-prompt', role:ERoles.bot, text:'Конечно. Один короткий вопрос.', extras:feedbackExtras('csi-rating'), timeCreated:startedAt},
        ];
    if (instant) {
      if (draft.stage === 'service') {
        messages.push(
          {id:'csi-service-demo', role:ERoles.user, text:'Проверка ВНД', timeCreated:startedAt},
          {id:'csi-prompt-demo', role:ERoles.bot, text:'Спасибо, понял. Тогда один короткий вопрос.', extras:feedbackExtras('csi-rating'), timeCreated:startedAt},
        );
        draft = setFeedbackService(draft, 'vnd-check', 'Проверка ВНД');
      }
      draft = selectCsiRating(draft, 4, 'csi-rating-demo', startedAt);
      messages.push(
        {id:'csi-rating-demo', role:ERoles.user, text:'4 из 5', timeCreated:startedAt},
        {id:'csi-comment-prompt-demo', role:ERoles.bot, text:getCsiCommentPrompt(4), extras:feedbackExtras('csi-comment-actions'), timeCreated:startedAt},
        {id:'csi-comment-demo', role:ERoles.user, text:'Не сразу понял, где смотреть результат проверки.', timeCreated:startedAt},
      );
      draft = addCsiComment(draft, 'Не сразу понял, где смотреть результат проверки.', 'csi-comment-demo', startedAt);
      draft = saveFeedbackMock(draft);
      messages.push({
        id:'csi-submitted-demo', role:ERoles.bot,
        text:draft.status === 'submitted'
          ? 'Спасибо, записал оценку в демо. **Команде она пока не отправлена.**'
          : 'Не удалось сохранить оценку даже в демо. Не буду говорить, что она передана.',
        timeCreated:startedAt,
      });
    }
    messages.forEach(message => preserveCurrent ? appendToThread(threadId, message) : addMessageAction(ctx, message));
    updateThreads(items => items.map(thread => thread.id === threadId ? {
      ...thread,
      title:'Оценка проверки ВНД',
      scenario:entry,
      feedbackDraft:draft,
      ...(preserveCurrent ? {} : {messages:messages.map(message => ({...message}))}),
      runs:{},
      updatedAt:Date.now(),
      pinned:false,
    } : thread));
    setRuns({}); setPlaying(false); setActionUrl(''); setScenario(entry); chat$.openChat();
  }

  function sendCsi(request: {body: string}) {
    const current = getActiveCsi();
    if (!current) return;
    const body = request.body.trim();
    if (current.stage === 'service') {
      const messageId = `csi-service-${crypto.randomUUID()}`;
      const now = new Date().toISOString();
      appendToThread(activeIdRef.current, {id:messageId, role:ERoles.user, text:body, timeCreated:now});
      if (/^(не сейчас|отмена|отменить)$/i.test(body)) { declineCsi(); return; }
      if (!isVndServiceReply(body)) {
        updateFeedbackDraft(cancelCsi(current));
        appendToThread(activeIdRef.current, {
          id:`csi-service-unsupported-${crypto.randomUUID()}`,
          role:ERoles.bot,
          text:'Не смог определить сервис. В демо поддержана только «Проверка ВНД», поэтому оценку не записал.',
          timeCreated:new Date().toISOString(),
        });
        return;
      }
      const resolved = setFeedbackService(current, 'vnd-check', 'Проверка ВНД');
      updateFeedbackDraft(resolved);
      appendToThread(activeIdRef.current, {
        id:`csi-prompt-${crypto.randomUUID()}`,
        role:ERoles.bot,
        text:'Спасибо, понял. В прототипе покажу путь для сервиса «Проверка ВНД».',
        extras:feedbackExtras('csi-rating'),
        timeCreated:new Date().toISOString(),
      });
      return;
    }
    if (current.stage === 'rating') {
      const value = parseCsiRatingInput(body);
      if (value !== undefined) selectCsiValue(value);
      else appendToThread(activeIdRef.current, {id:crypto.randomUUID(), role:ERoles.bot, text:'Выберите оценку от 1 до 5 звёзд или отправьте число от 1 до 5.', timeCreated:new Date().toISOString()});
      return;
    }
    if (current.stage === 'comment') {
      if (/^(пропустить|без комментария|нет)$/i.test(body)) { skipCsiText(); return; }
      const messageId = `csi-comment-${crypto.randomUUID()}`;
      const now = new Date().toISOString();
      appendToThread(activeIdRef.current, {id:messageId, role:ERoles.user, text:body, timeCreated:now});
      completeCsi(addCsiComment(current, body, messageId, now));
      return;
    }
    appendToThread(activeIdRef.current, {id:crypto.randomUUID(), role:ERoles.bot, text:current.stage === 'submitted' ? 'Эта оценка уже записана в демо — второй записи не будет.' : current.stage === 'error' ? 'Сохранение в демо завершилось ошибкой. Успешная запись не создана.' : 'Оценка отменена. Если захотите, начните сценарий заново.', timeCreated:new Date().toISOString()});
  }

  function playFeedbackFlow(entry: Extract<ScenarioId, 'feedbackComplaint' | 'feedbackComplaintClarify' | 'feedbackHelp' | 'feedbackIdea' | 'feedbackIdeaClarify' | 'feedbackPraise' | 'feedbackError'>, sourceOverride?: string, preserveCurrent = false, instant = false) {
    const threadId = activeIdRef.current;
    clearThreadTimers(threadId); resetPending();
    if (!preserveCurrent) { resetAction(ctx); attachmentsAtom(ctx, []); textAtom(ctx, ''); canLoadHistoryAtom(ctx, false); isLoadingAtom(ctx, false); }
    const now = new Date().toISOString();
    const source = sourceOverride ?? scenarios.find(item => item.id === entry)!.question;
    const sourceMessage: IMessage = {id:`feedback-source-${entry}`, role:ERoles.user, text:source, timeCreated:now};
    const messages: IMessage[] = [sourceMessage];
    let draft: QualitativeFeedbackDraft | undefined;
    if (entry === 'feedbackHelp') {
      messages.push({
        id:'feedback-help-result', role:ERoles.bot,
        text:'Результат проверки можно открыть через историю чатов: выберите диалог «Проверка ВНД» и откройте последнее сообщение. **Я не записывал это как жалобу.**',
        timeCreated:now,
      });
    } else {
      const kind: QualitativeFeedbackDraft['kind'] = entry === 'feedbackIdea' || entry === 'feedbackIdeaClarify' ? 'idea' : entry === 'feedbackPraise' ? 'praise' : 'complaint';
      draft = createQualitativeFeedback(kind, source, sourceMessage.id, now, {
        serviceKnown: entry !== 'feedbackComplaintClarify' && entry !== 'feedbackIdeaClarify',
        mockOutcome: entry === 'feedbackError' ? 'error' : 'success',
      });
      if (entry === 'feedbackComplaintClarify' || entry === 'feedbackIdeaClarify') {
        messages.push({
          id:'feedback-clarify-prompt', role:ERoles.bot,
          text:entry === 'feedbackIdeaClarify'
            ? 'Хорошая мысль. Подскажете, для какого сервиса нужен фильтр? Достаточно одного уточнения.'
            : 'Понял, что было неудобно. Подскажете, в каком сервисе? Достаточно одного уточнения.',
          timeCreated:now,
        });
        if (instant) {
          const clarification = 'В сервисе проверки ВНД.';
          messages.push({id:'feedback-clarification-demo', role:ERoles.user, text:clarification, timeCreated:now});
          draft = saveFeedbackMock(addFeedbackClarification(draft, clarification, 'feedback-clarification-demo', now, 'vnd-check', 'Проверка ВНД'));
          messages.push({id:'feedback-result-demo', role:ERoles.bot, text:'Спасибо, что уточнили. Отзыв записан в демо, но **команде пока не отправлен.**', timeCreated:now});
        }
      } else {
        draft = saveFeedbackMock(draft);
        const text = draft.status === 'error'
          ? 'Не удалось сохранить отзыв даже в демо. Не буду говорить, что он передан.'
          : entry === 'feedbackIdea'
            ? 'Хорошая мысль. Записал предложение про фильтр в демо. **Команде пока не отправлено.**'
            : entry === 'feedbackPraise'
              ? 'Рад, что проверка пригодилась. Спасибо! Отзыв записан в демо, но **команде пока не отправлен.**'
              : 'Понял: результат проверки было непросто найти. Спасибо, что рассказали. Отзыв записан в демо, но **команде пока не отправлен.**';
        messages.push({id:'feedback-result', role:ERoles.bot, text, timeCreated:now});
      }
    }
    messages.forEach(message => preserveCurrent ? appendToThread(threadId, message) : addMessageAction(ctx, message));
    updateThreads(items => items.map(thread => thread.id === threadId ? {
      ...thread,
      title: entry === 'feedbackHelp' ? 'Помощь с результатом' : 'Обратная связь о проверке',
      scenario:entry,
      feedbackDraft:draft,
      ...(preserveCurrent ? {} : {messages:messages.map(message => ({...message}))}),
      runs:{},
      updatedAt:Date.now(),
      pinned:false,
    } : thread));
    setRuns({}); setPlaying(false); setActionUrl(''); setScenario(entry); chat$.openChat();
  }

  function sendFeedbackClarification(request: {body: string}) {
    const current = getActiveFeedback();
    if (!current || current.kind === 'csi') return;
    const body = request.body.trim();
    if (current.stage !== 'clarification') {
      appendToThread(activeIdRef.current, {id:crypto.randomUUID(), role:ERoles.bot, text:'Этот отзыв уже обработан в демо — второй записи не будет.', timeCreated:new Date().toISOString()});
      return;
    }
    const messageId = `feedback-clarification-${crypto.randomUUID()}`;
    const now = new Date().toISOString();
    appendToThread(activeIdRef.current, {id:messageId, role:ERoles.user, text:body, timeCreated:now});
    const resolvedService = isVndServiceReply(body);
    const ready = resolvedService
      ? addFeedbackClarification(current, body, messageId, now, 'vnd-check', 'Проверка ВНД')
      : addUnresolvedFeedbackClarification(current, body, messageId, now);
    const saved = saveFeedbackMock(ready);
    updateFeedbackDraft(saved);
    appendToThread(activeIdRef.current, {
      id:`feedback-clarified-${crypto.randomUUID()}`,
      role:ERoles.bot,
      text:saved.status === 'error'
        ? 'Не удалось сохранить отзыв даже в демо. Не буду говорить, что он передан.'
        : resolvedService
          ? 'Понял, речь о проверке ВНД. Спасибо, что уточнили. Отзыв записан в демо, но **команде пока не отправлен.**'
          : 'Не смог определить сервис. Сохранил исходное сообщение в общей демо-очереди, но **команде ничего не отправлено.**',
      timeCreated:new Date().toISOString(),
    });
  }

  function sendGeneral(request: {body: string; extras?: Record<string, string>}) {
    const intent = classifyFeedbackExample(request.body);
    const existing = getActiveFeedback();
    if (existing && (existing.status === 'submitted' || existing.status === 'error') && intent !== 'unknown' && intent !== 'help_request') {
      appendToThread(activeIdRef.current, {
        id:`feedback-duplicate-${crypto.randomUUID()}`,
        role:ERoles.bot,
        text:existing.status === 'submitted'
          ? 'Этот отзыв уже записан в демо — второй записи не будет.'
          : 'Предыдущая попытка завершилась ошибкой. Успешная запись не создана.',
        timeCreated:new Date().toISOString(),
      });
      return;
    }
    if (intent === 'csi_request') {
      playCsiFlow(isVndServiceReply(request.body) ? 'csiDirect' : 'csiDirectUnknown', false, request.body, true);
      return;
    }
    const feedbackScenario = resolveFeedbackExampleScenario(intent, request.body);
    if (feedbackScenario) {
      playFeedbackFlow(feedbackScenario, request.body, true);
      return;
    }
    play(selectedSkillId === 'methodologist' ? 'subagent' : scenario, false, request.body, request.extras);
  }

  function runVndReview(corrected: boolean, instant = false) {
    const threadId = activeIdRef.current;
    clearThreadTimers(threadId);
    startActivity(threadId);
    const startedAt = Date.now();
    const requestId = `vnd-request-${crypto.randomUUID()}`;
    const responseId = `vnd-answer-${crypto.randomUUID()}`;
    const base: IMessage = {id:responseId, requestId, role:ERoles.bot, timeCreated:new Date(startedAt).toISOString()};
    const plan = corrected
      ? [{content:'Проверить исправления',status:'in_progress' as const},{content:'Подтвердить соответствие',status:'pending' as const}]
      : [{content:'Изучить ВНД',status:'in_progress' as const},{content:'Сверить с групповым стандартом',status:'pending' as const},{content:'Подготовить отчёт',status:'pending' as const}];
    let run = createRun(responseId, requestId, startedAt);
    run = appendEvent(run, {id:`${responseId}-plan`, runId:responseId, at:startedAt, kind:'plan', tool:'write_todos', todos:plan});
    const updateRun = () => publishRun(threadId, run);
    const finish = () => {
      const completedTodos = plan.map(item => ({...item,status:'completed' as const}));
      run = appendEvent(run, {id:`${responseId}-complete`, runId:responseId, at:Date.now(), kind:'plan', tool:'write_todos', todos:completedTodos});
      run = appendEvent(run, {id:`${responseId}-finish`, runId:responseId, at:Date.now() + 1, kind:'finish'});
      updateRun();
      appendToThread(threadId, {...base, text:corrected ? vndCorrectedAnswer : vndResultAnswer});
      setVndStage(corrected ? 'complete' : 'reviewed', threadId);
      if (activeIdRef.current === threadId) setPlaying(false);
      completeActivity(threadId);
    };
    const compareStep = `${responseId}-compare`;
    const accept = () => {
      run = appendEvent(run, {id:`${responseId}-accepted`, runId:responseId, at:Date.now(), kind:'message', label:'Документ принят в работу'});
      run = appendEvent(run, {id:`${responseId}-compare-note`, runId:responseId, at:Date.now(), kind:'thinking',
        progressDelta:{stepId:compareStep, text:corrected ? 'Проверяю пункты, отмеченные в предыдущем отчёте.' : 'Проверяю, какие требования выбранного стандарта применимы к документу.'}});
      updateRun();
    };
    const compare = () => {
      run = appendEvent(run, {id:compareStep, runId:responseId, at:Date.now(), kind:'message', label:corrected ? 'Проверяю внесённые изменения' : 'Сверяю документ с требованиями'});
      updateRun();
    };
    updateRun();
    if (instant) { accept(); compare(); finish(); return; }
    if (activeIdRef.current === threadId) setPlaying(true);
    appendToThread(threadId, {...base, text:'', extras:{agentPending:'true'}});
    later(threadId, accept, 650);
    later(threadId, compare, 1_350);
    later(threadId, finish, 2_400);
  }

  function playVndFlow(instant = false, entry: ScenarioId = scenario) {
    attachmentLookups.current.delete(activeIdRef.current);
    background.cancel(activeIdRef.current);
    clearThreadTimers(activeIdRef.current); resetPending(); resetAction(ctx); attachmentsAtom(ctx, []); textAtom(ctx, ''); canLoadHistoryAtom(ctx, false); isLoadingAtom(ctx, false);
    setActionUrl(''); setScenario(entry); setPlaying(false); setRuns({});
    updateThreads(items => items.map(thread => thread.id === activeIdRef.current ? {...thread, title:'Проверка ВНД', scenario:entry, vndStage:'start', agentState:undefined, agentUnread:false, jobState:undefined, unread:false, pinned:false, updatedAt:Date.now()} : thread));
    vndStageRef.current = 'start';
    if (!instant) {
      if (entry === 'vndWelcome' || entry === 'vndBackground') addMessageAction(ctx, {id:crypto.randomUUID(), role:ERoles.bot, text:'Здравствуйте! Я помогу проверить ваш ВНД на соответствие стандартам группы. Прикрепите документ — затем я предложу выбрать групповой стандарт для проверки.', timeCreated:new Date().toISOString()});
      storeCurrent();
      chat$.openChat();
      return;
    }
    const startedAt = Date.now();
    addMessageAction(ctx, {id:`vnd-start-${crypto.randomUUID()}`, role:ERoles.user, text:'Проверь ВНД на соответствие стандартам группы.', timeCreated:new Date(startedAt).toISOString(), extras:{fileIds:'["vnd-draft"]'}});
    const addPrompt = () => {
      addMessageAction(ctx, {id:`vnd-prompt-${crypto.randomUUID()}`, role:ERoles.bot, text:vndStandardPrompt, timeCreated:new Date().toISOString()});
      setVndStage('chooseStandard');
    };
    const addChoice = () => {
      addMessageAction(ctx, {id:`vnd-choice-${crypto.randomUUID()}`, role:ERoles.user, text:'2', timeCreated:new Date().toISOString()});
      if (entry === 'vndBackground') background.start(activeIdRef.current,'["vnd-draft"]','Регламент управления операционными рисками.docx');
      else runVndReview(false, instant);
    };
    if (instant) {
      addPrompt(); addChoice();
      if (entry === 'vndBackground') return;
      addMessageAction(ctx, {id:`vnd-corrected-${crypto.randomUUID()}`, role:ERoles.user, text:'Загрузил исправленную версию. Проверь повторно.', timeCreated:new Date().toISOString(), extras:{fileIds:'["vnd-corrected"]'}});
      addMessageAction(ctx, {id:`vnd-corrected-note-${crypto.randomUUID()}`, role:ERoles.bot, text:'Исправленная версия получена. Повторяю проверку по ранее выбранному стандарту.', timeCreated:new Date().toISOString()});
      runVndReview(true, true);
      return;
    }
  }

  function sendVnd(request: {body: string; extras?: Record<string, string>}) {
    const sentAt = Date.now();
    addMessageAction(ctx, {id:`vnd-user-${crypto.randomUUID()}`, role:ERoles.user, text:request.body, timeCreated:new Date(sentAt).toISOString(), extras:request.extras});
    const hasFile = Boolean(request.extras?.fileIds);
    const jobState=threadsRef.current.find(item=>item.id===activeIdRef.current)?.jobState;
    if (jobState === 'running') {
      addMessageAction(ctx, {id:crypto.randomUUID(), role:ERoles.bot, text:'Проверка уже выполняется в фоне. Я сообщу о результате в этом диалоге.', timeCreated:new Date(sentAt + 1).toISOString()});
      queueMicrotask(storeCurrent);
      return;
    }
    if (jobState === 'ready') {
      if (background.saveFromChat(activeIdRef.current,request.body)) return;
      addMessageAction(ctx,{id:crypto.randomUUID(),role:ERoles.bot,text:'Отклонений не найдено. Сохранить актуальный ВНД в папку «Операционные риски»? Напишите «Да» или назовите другую папку: «Внутренние нормативные документы» либо «Методология».',timeCreated:new Date().toISOString()});
      return;
    }
    if (jobState === 'saved') {
      addMessageAction(ctx,{id:crypto.randomUUID(),role:ERoles.bot,text:'Актуальный ВНД уже сохранён в базе знаний.',timeCreated:new Date().toISOString()});
      return;
    }
    if (vndStageRef.current === 'start') {
      addMessageAction(ctx, {id:`vnd-reply-${crypto.randomUUID()}`, role:ERoles.bot, text:hasFile ? vndStandardPrompt : 'Я помогу проверить ВНД на соответствие стандартам группы. Загрузите документ, который хотите проверить.', timeCreated:new Date(sentAt + 1).toISOString()});
      if (hasFile) setVndStage('chooseStandard');
      return;
    }
    if (vndStageRef.current === 'chooseStandard') {
      const number = request.body.trim().match(/^[1-4]$/)?.[0];
      if (!number) {
        addMessageAction(ctx, {id:`vnd-error-${crypto.randomUUID()}`, role:ERoles.bot, text:'Не удалось определить выбранный документ. Отправьте номер от 1 до 4.', timeCreated:new Date(sentAt + 1).toISOString()});
        return;
      }
      if (scenario === 'vndBackground') {
        const id=activeIdRef.current;
        const userFiles=ctx.get(messagesAtom).filter(item=>item.role===ERoles.user && item.extras?.fileIds);
        const fileIds=userFiles[userFiles.length-1]?.extras?.fileIds as string || '[]';
        let attachmentIds: string[];
        try {
          const parsed = JSON.parse(fileIds);
          if (!Array.isArray(parsed) || parsed.some(item => typeof item !== 'string')) throw new Error('Invalid attachment ids');
          attachmentIds = parsed;
        } catch {
          appendToThread(id, {id:crypto.randomUUID(), role:ERoles.bot, text:'Не удалось прочитать данные вложения. Прикрепите ВНД ещё раз.', timeCreated:new Date().toISOString()});
          return;
        }
        const lookupToken = crypto.randomUUID();
        attachmentLookups.current.set(id, lookupToken);
        const canResolveLookup = () => canResolveVndAttachmentLookup(
          attachmentLookups.current.get(id),
          lookupToken,
          threadsRef.current.find(item => item.id === id),
        );
        methodologistService.getAttachmentList(attachmentIds.join(',')).then(result=>{
          if (!canResolveLookup()) return;
          attachmentLookups.current.delete(id);
          const name=result.body.userDocuments[0]?.fields.fileName.value || 'ВНД.docx';
          background.start(id,fileIds,name);
        }).catch(() => {
          if (!canResolveLookup()) return;
          attachmentLookups.current.delete(id);
          appendToThread(id, {id:crypto.randomUUID(), role:ERoles.bot, text:'Не удалось получить сведения о вложении. Попробуйте начать проверку ещё раз.', timeCreated:new Date().toISOString()});
        });
      } else runVndReview(false);
      return;
    }
    if (vndStageRef.current === 'reviewed') {
      if (!hasFile) {
        addMessageAction(ctx, {id:`vnd-upload-${crypto.randomUUID()}`, role:ERoles.bot, text:'Прикрепите исправленную версию ВНД, и я повторю проверку по ранее выбранному стандарту.', timeCreated:new Date(sentAt + 1).toISOString()});
        return;
      }
      addMessageAction(ctx, {id:`vnd-corrected-note-${crypto.randomUUID()}`, role:ERoles.bot, text:'Исправленная версия получена. Повторяю проверку по ранее выбранному стандарту.', timeCreated:new Date(sentAt + 1).toISOString()});
      runVndReview(true);
      return;
    }
    addMessageAction(ctx, {id:`vnd-complete-${crypto.randomUUID()}`, role:ERoles.bot, text:'Документ уже прошёл повторную проверку и соответствует выбранному стандарту.', timeCreated:new Date(sentAt + 1).toISOString()});
  }

  const runScenario = (id: ScenarioId, instant = false) => {
    attachmentLookups.current.delete(activeIdRef.current);
    if (id === 'csiProactive' || id === 'csiDirect' || id === 'csiDirectUnknown' || id === 'csiError') return playCsiFlow(id, instant);
    if (id.startsWith('feedback')) return playFeedbackFlow(id as Extract<ScenarioId, 'feedbackComplaint' | 'feedbackComplaintClarify' | 'feedbackHelp' | 'feedbackIdea' | 'feedbackIdeaClarify' | 'feedbackPraise' | 'feedbackError'>, undefined, false, instant);
    return id.startsWith('vnd') ? playVndFlow(instant, id) : play(id, instant);
  };

  function play(id: ScenarioId, instant = false, body?: string, extras?: Record<string,string>) {
    const threadId = activeIdRef.current;
    clearThreadTimers(threadId); resetPending(); resetAction(ctx); attachmentsAtom(ctx, []); textAtom(ctx, ''); canLoadHistoryAtom(ctx, false); isLoadingAtom(ctx, false);
    const registration = id === 'registration' || selectedSkillId === 'createIncident';
    contextChatAtom(ctx, registration ? {intent:'createIncident', company_id:'demo-company'} : {company_id:'demo-company'});
    updateThreads(items => items.map(thread => thread.id === threadId ? {...thread, scenario:id, feedbackDraft:undefined, initialSkill: registration ? 'createIncident' : undefined, updatedAt:Date.now()} : thread));
    startActivity(threadId);
    setActionUrl(''); setScenario(id); setPlaying(!instant);
    const startedAt = Date.now(); const requestId = `question-${crypto.randomUUID()}`; const responseId = `answer-${requestId}`; const {events, backendSteps, answer} = fixture(id, responseId, startedAt);
    let run = createRun(responseId, requestId, startedAt); const updateRun = () => publishRun(threadId, run);
    const requestExtras = {...(extras || {}), ...(selectedSkillId ? {skill:selectedSkillId, skillTitle:assistantSkills.find(item => item.id === selectedSkillId)?.title || ''} : {})};
    appendToThread(threadId, {id:requestId, role:ERoles.user, text:body || scenarios.find(item => item.id === id)!.question, timeCreated:new Date(startedAt).toISOString(), extras:Object.keys(requestExtras).length ? requestExtras : (id === 'rich' ? {fileIds:'["demo-input"]'} : {})});
    const base: IMessage = {id:responseId, requestId, role:ERoles.bot, timeCreated:new Date(startedAt + 1).toISOString()}; const resultExtras = id === 'rich' ? {fileIds:'["demo-report"]', chart} : undefined;
    if (!instant) appendToThread(threadId, {...base, text:'', extras:{agentPending:'true'}});
    const finish = () => {
      const completedAt = Math.max(Date.now(), run.events.at(-1)?.at ?? startedAt);
      // The current backend sends service texts only after /ainvoke completes.
      // Put those exact texts into the activity trace in one update, not chat bubbles.
      backendSteps.forEach((serviceText, index) => {
        const [label, ...lines] = serviceText.split('\n');
        run = appendEvent(run, {id:`${responseId}-backend-${index}`, runId:responseId, at:completedAt + index, kind:'message', label, text:lines.join('\n') || undefined});
      });
      if (events.length || backendSteps.length) {
        run = appendEvent(run, {id:`${responseId}-finish`, runId:responseId, at:completedAt + backendSteps.length, kind:'finish'});
        updateRun();
      }
      if (activeIdRef.current === threadId) isLoadingAtom(ctx, false);
      appendToThread(threadId, {
        ...base, text:answer, extras:resultExtras as IMessage['extras'],
      });
      if (activeIdRef.current === threadId) setPlaying(false);
      completeActivity(threadId);
    };
    if (instant) { events.forEach(event => { run = appendEvent(run,event); }); finish(); }
    else if (!events.length) { later(threadId, finish, 2200); }
    else {
      for (const event of events) {
        later(threadId, () => {
          run = appendEvent(run, {...event, at:Date.now()});
          updateRun();
        }, event.at - startedAt);
      }
      const answerDelay = events.at(-1)!.at - startedAt;
      const chunks = answer.match(/.{1,36}(?:\s|$)|.{1,36}/gs) || [answer];
      let text = '';
      chunks.forEach((chunk, index) => later(threadId, () => {
        text += chunk;
        appendToThread(threadId, {...base,text,extras:{agentPending:'true'}});
      }, answerDelay + (index + 1) * 65));
      later(threadId, finish, answerDelay + (chunks.length + 1) * 65);
    }
    chat$.openChat();
  }
  useEffect(() => { const listener = (event: Event) => setActionUrl((event as CustomEvent<string>).detail); window.addEventListener('pilot:navigate',listener); const bootstrap = setTimeout(() => {const thread=threadsRef.current.find(item=>item.id===initialState.activeThreadId) || threadsRef.current[0]; loadThread(thread); if (initialState.embedded || window.innerWidth >= 600) chat$.changeChatState(EChatState.fullScreen); chat$.openChat();}, 50); return () => {clearTimeout(bootstrap); clearAllTimers(); window.removeEventListener('pilot:navigate',listener);}; }, []);
  useEffect(() => {
    if (!initialState.embedded || window.parent === window) return;
    const forwardEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) window.parent.postMessage({ type: 'atlas:close-live-preview' }, window.location.origin);
    };
    window.addEventListener('keydown', forwardEscape);
    return () => window.removeEventListener('keydown', forwardEscape);
  }, [initialState.embedded]);
  useEffect(() => {
    if (!initialState.embedded) return;
    let cancelled = false;
    let attempts = 0;
    let readyTimer = 0;
    const announceReady = () => {
      if (cancelled) return;
      const focusTarget = initialState.drawerFocus === 'memory-heading'
        ? document.getElementById('agent-memory-title')
        : undefined;
      if (initialState.drawerFocus && !focusTarget && attempts < 20) {
        attempts += 1;
        readyTimer = window.setTimeout(announceReady, 50);
        return;
      }
      focusTarget?.focus();
      const previewTargetId = initialState.previewStepId === 'csi.prompt' ? 'atlas-csi-prompt'
        : initialState.previewStepId?.startsWith('csi.') ? (initialState.previewStepId === 'csi.saved' || initialState.previewStepId === 'csi.skipped' || initialState.previewStepId === 'csi.error' ? 'atlas-csi-result' : 'atlas-csi-comment-prompt')
          : initialState.previewStepId === 'csi-direct.service' ? 'atlas-csi-direct-service'
            : initialState.previewStepId?.startsWith('csi-direct.') ? (initialState.previewStepId === 'csi-direct.saved' ? 'atlas-csi-direct-result' : 'atlas-csi-direct-rating')
              : initialState.previewStepId?.startsWith('feedback.') ? (initialState.previewStepId.includes('clarif') ? 'atlas-feedback-clarify' : initialState.previewStepId === 'feedback.help' ? 'atlas-feedback-help' : 'atlas-feedback-result')
                : undefined;
      if (previewTargetId) document.getElementById(previewTargetId)?.scrollIntoView({ block:'start' });
      if (window.parent !== window) window.parent.postMessage({ type: 'atlas:live-preview-ready' }, window.location.origin);
    };
    readyTimer = window.setTimeout(announceReady, 150);
    return () => { cancelled = true; window.clearTimeout(readyTimer); };
  }, [initialState.drawerFocus, initialState.embedded, initialState.previewStepId]);
  useEffect(() => {
    setDemoSender(request => scenario.startsWith('vnd')
      ? sendVnd(request)
      : scenario.startsWith('csi')
        ? sendCsi(request)
        : scenario === 'feedbackComplaintClarify' || scenario === 'feedbackIdeaClarify'
          ? sendFeedbackClarification(request)
        : sendGeneral(request));
  }, [scenario, selectedSkillId]);
  const threadUi = {
    enabled:true,
    threads,
    agentMemory,
    activeThreadId,
    initialDrawerState:initialState.drawer,
    initialDrawerFocus:initialState.drawerFocus,
    onSelect:selectThread,
    onNew:newThread,
    onRename:(id:string,title:string) => updateThreads(items => items.map(item => item.id === id ? {...item,title,updatedAt:Date.now()} : item)),
    onTogglePin:(id:string) => updateThreads(items => items.map(item => item.id === id ? {...item,pinned:!item.pinned,updatedAt:Date.now()} : item)),
    onDelete:deleteThread,
    onForgetMemory:(fact:string) => setAgentMemory(items => forgetMemoryFact(items, fact)),
    onClearMemory:() => setAgentMemory(clearMemoryFacts()),
    onClearAll:clearAllThreads,
  };
  const selectedSkill = demoFlags.assistantSkills ? assistantSkills.find(item => item.id === selectedSkillId) : undefined;
  const renderMessageAddon = (message: IMessage) => {
    const addon = message.extras?.feedbackAddon as FeedbackAddon | undefined;
    const draft = threads.find(thread => thread.id === activeThreadId)?.feedbackDraft;
    if (!addon || draft?.kind !== 'csi') return null;
    return <FeedbackCard
      addon={addon}
      draft={draft}
      onRate={selectCsiValue}
      onSkipComment={skipCsiText}
      onCancel={declineCsi}
    />;
  };
  return <reatomContext.Provider value={ctx}><ThreadUiContext.Provider value={threadUi}><AssistantSkillsContext.Provider value={{skills:demoFlags.assistantSkills ? assistantSkills : [], selectedSkill, onSelect:setSelectedSkillId}}><MessageAddonContext.Provider value={renderMessageAddon}><AgentRunsContext.Provider value={runs}>
    <style>{initialState.embedded ? `.${modalClasses.wrapper}{top:0;height:100dvh}` : `.${modalClasses.wrapper}{top:64px;height:calc(100dvh - 64px)} @media(max-width:599px){.${modalClasses.wrapper}{top:112px;height:calc(100dvh - 112px);padding:0;width:100%}.${modalClasses.content},.${modalClasses.contentChatRight}{margin:8px;width:calc(100% - 16px);max-width:calc(100% - 16px);height:calc(100% - 16px)}.${chatClasses.chat}{min-width:0;width:100%;padding:20px 16px 16px}.${chatClasses.content}{margin-right:-16px;padding-right:16px}.${chatClasses.messages}{margin-right:-16px;padding-right:8px}.${chatClasses.titleLogo}{margin-right:0;width:32px;height:32px}.${chatClasses.titleText}{font-size:20px}.${chatClasses.title}{min-width:150px}.${chatClasses.header}>:last-child{gap:6px}.${chatClasses.header}>:last-child button:not(:first-child):not(:last-child){display:none}}`}</style>
    {!initialState.embedded && <div className="demo-toolbar"><div className="demo-label"><strong>UI-пилот</strong><span>{scenario.startsWith('vnd') ? 'Проверка ВНД · диалог в продуктовом чате' : scenario.startsWith('csi') ? 'CSI · разговорный демо-сценарий' : scenario.startsWith('feedback') ? 'Обратная связь · разговорный демо-сценарий' : scenario === 'backendCallback' ? 'Шаги из кода · план из теста · пакет после ответа' : 'Демонстрационные данные'}</span></div><label className="scenario-picker"><span className="sr-only">Сценарий</span><select aria-label="Сценарий" value={scenario} onChange={event => runScenario(event.target.value as ScenarioId)}>{scenarios.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label><Button size="S" variant="secondary" onClick={() => runScenario(scenario)}>{scenario.startsWith('vnd') || scenario.startsWith('csi') || scenario.startsWith('feedback') ? 'Начать заново' : 'Воспроизвести'}</Button><Button size="S" variant="secondary" onClick={() => runScenario(scenario, true)}>{scenario === 'vndBackground' ? 'Демо проверки' : scenario.startsWith('csi') ? 'Показать результат' : scenario.startsWith('feedback') ? 'Показать ветку' : 'Сразу результат'}</Button><label className="offline-toggle"><input type="checkbox" checked={!online} onChange={event => {const value = !event.target.checked; setOnline(value); setDemoOnline(value);}}/>Офлайн</label>{scenario === 'rich' && !playing && <label className="scenario-picker"><select aria-label="Вид графика" defaultValue="barChart" onChange={event => {const message = ctx.get(messagesAtom).find(item => item.role===ERoles.bot && item.extras?.chart); if (message) addMessageAction(ctx, {...message, extras:{...message.extras,chart:{...chart,metadata:{...chart.metadata,view:event.target.value}}} as IMessage['extras']});}}><option value="barChart">Столбчатый</option><option value="lineChart">Линейный</option><option value="pieChart">Круговой</option></select></label>}<span className="demo-state" role="status">{!online ? 'Отправка в очереди' : threads.some(item=>item.agentState === 'running') ? 'Агент работает' : 'Готово'}</span></div>}
    {!initialState.embedded && <main className="product-backdrop"><aside><div className="norm-mark">Н</div></aside><section><p className="product-eyebrow">НОРМ / Компания</p><h1>Обзор компании</h1><p>Работа с рисками и событиями</p><div className="backdrop-cards"><div><small>Риски</small><strong>12</strong></div><div><small>Мероприятия</small><strong>8</strong></div><div><small>Источники</small><strong>4</strong></div></div><Button onClick={() => chat$.openChat()}>Открыть чат</Button></section></main>}<ModalContainer/>{background.ui}
    {actionUrl && <div className="demo-action" role="dialog" aria-modal="true" aria-label="Переход в НОРМ"><h2>Переход в форму НОРМ</h2><p>Продуктовый чат передал команду открытия формы. В демо она перехвачена локально.</p><code>{actionUrl}</code><Button onClick={() => {setActionUrl('');chat$.openChat();}}>Вернуться в чат</Button></div>}
  </AgentRunsContext.Provider></MessageAddonContext.Provider></AssistantSkillsContext.Provider></ThreadUiContext.Provider></reatomContext.Provider>;
}
createRoot(document.getElementById('root')!).render(<App/>);
