import { ERoles, type IMessage } from '@/types';
import type { AtlasPreview, AtlasPreviewThread } from './atlasPreview';
import { explainedReply } from './scenarioExplanations';
import { vndCorrectedAnswer, vndResultAnswer, vndStandards, vndToBeStandardPrompt } from './scenarios';
import { vndSaveQuestion, type VndStage } from './VndBackground.model';

export const vndToBeSteps = ['vnd-to-be.start', 'vnd-to-be.standard', 'vnd-to-be.result', 'vnd-to-be.save', 'vnd-to-be.folder', 'vnd-to-be.deferred', 'vnd-to-be.saved'] as const;
export type VndToBeStepId = typeof vndToBeSteps[number];

export function createVndToBePreview(stepId:VndToBeStepId, baseThreads:AtlasPreviewThread[], memory:string[]):AtlasPreview {
  const messages:IMessage[] = [];
  const add = (id:string, role:ERoles, text:string, extras?:IMessage['extras']) => {
    const message = {id:'atlas-vnd-to-be-'+id, role, text, extras, timeCreated:new Date(Date.now()+messages.length).toISOString()};
    messages.push(message);
    return message;
  };
  const runs:AtlasPreviewThread['runs'] = {};
  const result = (id:string, text:string, label:string) => {
    const message = add(id, ERoles.bot, text);
    const run = explainedReply(message, [label, 'Сверка документа с выбранным групповым стандартом завершена.']);
    runs[run.runId] = run;
  };
  const index = vndToBeSteps.indexOf(stepId);
  let stage:VndStage = 'start';
  add('welcome', ERoles.bot, 'Здравствуйте! Я помогу проверить ваш ВНД на соответствие стандартам группы. Прикрепите документ — затем я предложу выбрать групповой стандарт для проверки.');
  if (index >= 1) {
    add('upload', ERoles.user, '', {fileIds:'["vnd-draft"]'});
    add('standard', ERoles.bot, vndToBeStandardPrompt, {vndAddon:'standard-picker'});
    stage = 'chooseStandard';
  }
  if (index >= 2) {
    add('choice', ERoles.user, vndStandards[1]);
    result('result', vndResultAnswer, 'Сверяю документ с требованиями');
    stage = 'reviewed';
  }
  if (index >= 3) {
    add('corrected-upload', ERoles.user, 'Загрузил исправленную версию. Проверь повторно.', {fileIds:'["vnd-corrected"]'});
    result('corrected', vndCorrectedAnswer, 'Проверяю внесённые изменения');
    add('save', ERoles.bot, vndSaveQuestion, {vndAddon:'save-confirmation'});
    stage = 'confirmSave';
  }
  if (stepId === 'vnd-to-be.deferred') {
    add('decline', ERoles.user, 'Не сейчас');
    add('deferred', ERoles.bot, 'ВНД пока не сохранён. Напишите «Вернуться к сохранению», чтобы снова открыть варианты, или укажите название папки.');
    stage = 'saveDeferred';
  }
  if (stepId === 'vnd-to-be.saved') {
    add('confirm', ERoles.user, 'Да, сохранить');
    add('saved', ERoles.bot, 'Сохранил «Регламент управления операционными рисками — исправленный.docx» в базу знаний, в папку «Операционные риски».');
    stage = 'complete';
  }
  return {
    stepId,
    activeThreadId:'vnd', scenario:'vndWelcomeToBe', agentMemory:[...memory],
    openVndFolder:stepId === 'vnd-to-be.folder',
    threads:baseThreads.map(thread => thread.id === 'vnd' ? {
      ...thread, scenario:'vndWelcomeToBe', title:'Проверка ВНД · варианты ответа', messages, runs, vndStage:stage,
      documentIds:index >= 3 ? '["vnd-corrected"]' : index >= 1 ? '["vnd-draft"]' : undefined,
      jobState:stepId === 'vnd-to-be.saved' ? 'saved' : undefined,
      folder:stepId === 'vnd-to-be.saved' ? 'Операционные риски' : undefined,
      agentState:undefined, agentUnread:false,
    } : {...thread}),
  };
}
