import { ERoles, type IMessage } from '@/types';
import type { AtlasPreview, AtlasPreviewThread } from './atlasPreview';
import { explainedReply } from './scenarioExplanations';
import { vndCleanAnswer, vndCorrectedAnswer, vndResultAnswer, vndStandards, vndToBeStandardPrompt } from './scenarios';
import { vndSaveQuestion, type VndStage } from './VndBackground.model';

export const vndToBeSteps = ['vnd-to-be.start', 'vnd-to-be.standard', 'vnd-to-be.result', 'vnd-to-be.save', 'vnd-to-be.folder', 'vnd-to-be.deferred', 'vnd-to-be.saved','vnd-to-be.clean','vnd-to-be.clean-folder','vnd-to-be.clean-deferred','vnd-to-be.clean-saved'] as const;
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
  const clean = stepId.startsWith('vnd-to-be.clean');
  const saved = stepId === 'vnd-to-be.saved' || stepId === 'vnd-to-be.clean-saved';
  const scenario = clean ? 'vndCleanToBe' as const : 'vndWelcomeToBe' as const;
  let stage:VndStage = 'start';
  add('welcome', ERoles.bot, 'Здравствуйте! Я помогу проверить ваш ВНД на соответствие стандартам группы. Прикрепите документ — затем я предложу выбрать групповой стандарт для проверки.');
  if (index >= 1) {
    add('upload', ERoles.user, '', {fileIds:'["vnd-draft"]'});
    add('standard', ERoles.bot, vndToBeStandardPrompt, {vndAddon:'standard-picker'});
    stage = 'chooseStandard';
  }
  if (index >= 2) {
    add('choice', ERoles.user, vndStandards[1]);
    result('result', clean ? vndCleanAnswer : vndResultAnswer, 'Сверяю документ с требованиями');
    stage = 'reviewed';
  }
  if (index >= 3 && !clean) {
    add('corrected-upload', ERoles.user, 'Загрузил исправленную версию. Проверь повторно.', {fileIds:'["vnd-corrected"]'});
    result('corrected', vndCorrectedAnswer, 'Проверяю внесённые изменения');
    add('save', ERoles.bot, vndSaveQuestion, {vndAddon:'save-confirmation'});
    stage = 'confirmSave';
  }
  if (clean) { add('save', ERoles.bot, vndSaveQuestion, {vndAddon:'save-confirmation'}); stage = 'confirmSave'; }
  if (stepId === 'vnd-to-be.deferred' || stepId === 'vnd-to-be.clean-deferred') {
    add('decline', ERoles.user, 'Не сейчас');
    add('deferred', ERoles.bot, 'ВНД пока не сохранён. Напишите «Вернуться к сохранению», чтобы снова открыть варианты, или укажите название папки.');
    stage = 'saveDeferred';
  }
  if (saved) {
    add('confirm', ERoles.user, 'Да, сохранить');
    add('saved', ERoles.bot, clean ? 'Сохранил «Регламент управления операционными рисками.docx» в базу знаний, в папку «Стандарты».' : 'Сохранил «Регламент управления операционными рисками — исправленный.docx» в базу знаний, в папку «Стандарты».');
    stage = 'complete';
  }
  return {
    stepId,
    activeThreadId:'vnd', scenario, agentMemory:[...memory],
    openVndFolder:stepId === 'vnd-to-be.folder' || stepId === 'vnd-to-be.clean-folder',
    threads:baseThreads.map(thread => thread.id === 'vnd' ? {
      ...thread, scenario, title:'Проверка ВНД · варианты ответа', messages, runs, vndStage:stage,
      documentIds:!clean && index >= 3 ? '["vnd-corrected"]' : index >= 1 ? '["vnd-draft"]' : undefined,
      jobState:saved ? 'saved' : undefined,
      folder:saved ? 'Стандарты' : undefined,
      agentState:undefined, agentUnread:false,
    } : {...thread}),
  };
}
