import { appendEvent, createRun, type AgentRun } from '../src/components/AgentActivity/model';
import { ERoles, type IMessage } from '../src/types';
import type { FeedbackDraft } from './Feedback.model';
import type { ScenarioId } from './scenarios';

type FeedbackScenario = Extract<ScenarioId, `csi${string}` | `feedback${string}`>;
type Explanation = readonly [label: string, text: string];

const firstSteps: Record<FeedbackScenario, Explanation> = {
  csiProactive: ['Предлагаю оценить проверку', 'ВНД уже сохранён. Сейчас можно предложить короткую оценку, пока результат проверки ещё перед глазами.'],
  csiDirect: ['Запрашиваю оценку', 'Пользователь назвал сервис проверки ВНД. Можно сразу предложить оценку по шкале от одного до пяти.'],
  csiDirectUnknown: ['Уточняю сервис', 'Пользователь хочет поставить оценку, но не назвал сервис. Сначала уточню, к чему относится оценка.'],
  csiError: ['Предлагаю оценить проверку', 'Проверка ВНД завершена. Предложу оценку сервиса и оставлю возможность добавить комментарий.'],
  feedbackComplaint: ['Фиксирую жалобу', 'Пользователь сообщает, что результат проверки трудно найти. В отзыве важно сохранить, на каком шаге возникла проблема.'],
  feedbackComplaintClarify: ['Уточняю, где возникла проблема', 'Пользователь описал сброс после возврата. Уточню сервис, чтобы жалоба попала в нужный контекст.'],
  feedbackHelp: ['Подсказываю, где найти результат', 'Пользователь просит помочь найти результат проверки. Подскажу путь через историю диалогов.'],
  feedbackIdea: ['Фиксирую предложение', 'Пользователь предлагает фильтр по статусу. Зафиксирую, какой фильтр нужен и к какой проверке он относится.'],
  feedbackIdeaClarify: ['Уточняю, где нужен фильтр', 'Идея с быстрым фильтром понятна. Уточню, в каком сервисе пользователь хочет его видеть.'],
  feedbackPraise: ['Фиксирую благодарность', 'Пользователь положительно оценил удобство проверки. Сохраню это как отзыв о сервисе.'],
  feedbackError: ['Проверяю результат сохранения', 'Пользователь сообщил о сбросе фильтра. Демо-сохранение завершилось ошибкой, поэтому сообщу, что отзыв не записан.'],
};

export const csiComment: Explanation = ['Предлагаю добавить комментарий', 'Оценка выбрана. Предложу уточнить, что повлияло на неё, и оставлю возможность пропустить комментарий.'];
export const csiServiceResolved: Explanation = ['Запрашиваю оценку', 'Пользователь уточнил, что речь о проверке ВНД. Привяжу оценку к этому сервису.'];
export const vndBackgroundExplanation = 'Пользователь выбрал стандарт и приложил ВНД. Сопоставлю требования с документом в фоне и покажу результат в этом диалоге.';

export function feedbackSaveExplanation(draft: FeedbackDraft): Explanation {
  const item = draft.kind === 'csi' ? 'оценку' : 'отзыв';
  return draft.status === 'submitted'
    ? ['Подтверждаю сохранение в демо', `Сохранил ${item} в демо. Отдельно укажу, что данные пока не отправлены команде.`]
    : ['Сообщаю об ошибке сохранения', `Попытка сохранить ${item} завершилась ошибкой. Сообщу, что запись не создана.`];
}

export function appendExplanation(run: AgentRun, stepId: string, text: string, at: number): AgentRun {
  return appendEvent(run, {id:`${stepId}-explanation`, runId:run.runId, at, kind:'thinking', progressDelta:{stepId, text}});
}

export function explainedReply(message: IMessage, [label, text]: Explanation): AgentRun {
  const id = String(message.id);
  const at = Date.parse(message.timeCreated ?? '') || Date.now();
  let run = createRun(id, message.requestId ?? id, at);
  const stepId = `${id}-step`;
  run = appendExplanation(run, stepId, text, at);
  run = appendEvent(run, {id:stepId, runId:id, at, kind:'message', label});
  return appendEvent(run, {id:`${id}-finish`, runId:id, at, kind:'finish'});
}

export function feedbackRuns(scenario: FeedbackScenario, messages: IMessage[], draft?: FeedbackDraft): Record<string, AgentRun> {
  const replies = messages.filter(message => message.role === ERoles.bot);
  const first = scenario === 'csiProactive' || scenario === 'csiError'
    ? replies.find(message => message.extras?.feedbackAddon === 'csi-rating') : replies[0];
  const runs: Record<string, AgentRun> = {};
  for (const message of replies) {
    const explanation = message === first ? firstSteps[scenario]
      : scenario === 'csiDirectUnknown' && message.extras?.feedbackAddon === 'csi-rating' ? csiServiceResolved
      : message.extras?.feedbackAddon === 'csi-comment-actions' ? csiComment
      : draft && (draft.status === 'submitted' || draft.status === 'error') && /result|submitted/.test(String(message.id))
        ? feedbackSaveExplanation(draft) : undefined;
    if (explanation) runs[String(message.id)] = explainedReply(message, explanation);
  }
  return runs;
}
