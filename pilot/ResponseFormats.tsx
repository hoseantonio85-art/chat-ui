import React from 'react';
import { ERoles, type IMessage } from '@/types';
import { ContextualButtons, ContextualChoices, type ContextualPlacement } from './ContextualActions';

export const responseFormatsTitle = 'Варианты выбора и действия';

const formats = [
  'Краткая сводка для команды',
  'Подробный разбор с описанием рисков и рекомендациями',
  'Справка для руководителя с выводами и следующими шагами',
] as const;

const sections = [
  'Главные риски и возможные последствия',
  'Инциденты и их причины',
  'Меры контроля и план действий',
] as const;

const actions = ['Показать пример', 'Изменить состав', 'Закончить'] as const;
type Format = typeof formats[number];
type Section = typeof sections[number];
type Action = typeof actions[number];

export type ResponseFormatsDraft =
  | { stage: 'format'; promptId: string }
  | { stage: 'sections' | 'actions'; promptId: string; format: Format; selected: Section[] }
  | { stage: 'done' };

export type ResponseFormatsEvent =
  | { kind: 'format'; format: Format }
  | { kind: 'toggle'; section: Section }
  | { kind: 'confirm' }
  | { kind: 'sections'; selected: Section[] }
  | { kind: 'action'; action: Action }
  | { kind: 'text'; text: string };

const labels = {
  format: 'В каком формате подготовить сводку?',
  sections: 'Какие разделы включить в сводку?',
  actions: 'Что сделать со сводкой?',
};

function message(role: ERoles, text: string, at = Date.now()) {
  return { id: `response-format-${crypto.randomUUID()}`, role, text, timeCreated: new Date(at).toISOString() } satisfies IMessage;
}

export function startResponseFormats() {
  const history = [
    'Когда будет следующая встреча по рискам?',
    'Встреча запланирована на четверг. На ней разберут события квартала и меры, по которым нужно принять решение.',
    'Кто будет участвовать?',
    'Команды платежей и закупок, а также специалисты по работе с подрядчиками.',
    'Подготовь материалы так, чтобы все успели ознакомиться до встречи.',
    'Соберу одну сводку для участников. Сначала уточним, какие процессы и события включить.',
    'Нужно собрать сводку по операционным рискам за квартал.',
    'Какие процессы включить? В последней сводке были платежи, поставки и работа с подрядчиками.',
    'Да, оставь те же три процесса. Добавь события, которые повлияли на сроки.',
    'В платежах был один сбой: часть операций прошла с задержкой. По поставкам были переносы сроков, связанные с подрядчиками.',
    'Уточни, что уже сделали по сбою в платежах.',
    'Команда восстановила обработку и добавила уведомление о росте очереди. Следующий шаг — проверить уведомление на тестовом сбое.',
    'А по поставкам какие следующие шаги?',
    'Ответственные сверят сроки по открытым заказам и согласуют, когда предупреждать команды о возможном переносе.',
    'Хорошо. Собери это в одну сводку для встречи.',
  ];
  const now = Date.now();
  const prompt = message(ERoles.bot, `Собрал данные по платежам, поставкам и подрядчикам. ${labels.format}`, now);
  return {
    messages: [
      ...history.map((text, index) => message(index % 2 === 0 ? ERoles.user : ERoles.bot, text, now - (history.length - index) * 60_000)),
      prompt,
    ],
    draft: { stage: 'format', promptId: prompt.id } satisfies ResponseFormatsDraft,
  };
}

const normalize = (value: string) => value.trim().toLocaleLowerCase('ru-RU');
function findOption<T extends string>(options: readonly T[], text: string) {
  const value = normalize(text);
  return options.find((option, index) => normalize(option) === value || String(index + 1) === value);
}

export function parseResponseFormatsText(draft: ResponseFormatsDraft, body: string): ResponseFormatsEvent {
  if (draft.stage === 'format') {
    const format = findOption(formats, body);
    if (format) return { kind: 'format', format };
  }
  if (draft.stage === 'sections') {
    const selected = body.split(/[,;\n]/).map(text => findOption(sections, text));
    if (selected.every((section): section is Section => section !== undefined)) {
      return { kind: 'sections', selected: [...new Set(selected)] };
    }
  }
  if (draft.stage === 'actions') {
    const action = actions.find(item => normalize(item) === normalize(body));
    if (action) return { kind: 'action', action };
  }
  return { kind: 'text', text: body };
}

export function advanceResponseFormats(draft: ResponseFormatsDraft, event: ResponseFormatsEvent): {
  draft: ResponseFormatsDraft;
  messages?: IMessage[];
} {
  const reply = (answer: string, text: string) => [message(ERoles.user, answer), message(ERoles.bot, text)];
  if (draft.stage === 'format' && event.kind === 'format') {
    const messages = reply(event.format, `${labels.sections} Можно отметить несколько.`);
    return { draft: { stage: 'sections', promptId: messages[1].id, format: event.format, selected: [] }, messages };
  }
  if (draft.stage === 'sections') {
    if (event.kind === 'toggle') {
      const selected = draft.selected.includes(event.section)
        ? draft.selected.filter(section => section !== event.section)
        : [...draft.selected, event.section];
      return { draft: { ...draft, selected } };
    }
    if (event.kind === 'confirm' || event.kind === 'sections') {
      const selected = sections.filter(section => (event.kind === 'confirm' ? draft.selected : event.selected).includes(section));
      if (!selected.length) return { draft };
      const messages = reply(selected.join(', '), 'Состав сводки для встречи готов. Что сделать дальше?');
      return { draft: { ...draft, stage: 'actions', promptId: messages[1].id, selected }, messages };
    }
  }
  if (draft.stage === 'actions' && event.kind === 'action') {
    if (event.action === 'Изменить состав') {
      const messages = reply(event.action, `${labels.sections} Ранее выбранные разделы отмечены.`);
      return { draft: { ...draft, stage: 'sections', promptId: messages[1].id }, messages };
    }
    if (event.action === 'Показать пример') {
      const descriptions: Record<Section, string> = {
        'Главные риски и возможные последствия': 'Сбой обработки платежей может повлиять на сроки операций.',
        'Инциденты и их причины': 'Часть операций задержалась. Команда восстановила обработку и изучает причину роста очереди.',
        'Меры контроля и план действий': 'Проверить оповещение о росте очереди и согласовать порядок предупреждения о переносах поставок.',
      };
      const text = [`**${draft.format}**`, ...draft.selected.map(section => `**${section}.** ${descriptions[section]}`), labels.actions].join('\n\n');
      const messages = reply(event.action, text);
      return { draft: { ...draft, promptId: messages[1].id }, messages };
    }
    return { draft: { stage: 'done' }, messages: reply(event.action, 'Готово. Состав сводки согласован.') };
  }
  if (event.kind === 'text') {
    const guidance = {
      format: 'Укажите название или номер формата. Варианты доступны в списке.',
      sections: 'Укажите названия разделов через запятую или отметьте их в списке.',
      actions: 'Доступны «Показать пример», «Изменить состав» и «Закончить».',
      done: 'Сводка уже согласована. Чтобы пройти этот пример снова, нажмите «Начать заново» над чатом.',
    };
    return { draft, messages: reply(event.text, guidance[draft.stage]) };
  }
  return { draft };
}

export function ResponseFormatsActions({ draft, placement, onEvent }: {
  draft: Exclude<ResponseFormatsDraft, { stage: 'done' }>;
  placement: ContextualPlacement;
  onEvent: (event: ResponseFormatsEvent) => void;
}) {
  const label = labels[draft.stage];
  if (draft.stage === 'format') return <ContextualChoices label={label} placement={placement} options={formats}
    mode={{ numbered: true, onSelect: format => onEvent({ kind: 'format', format }) }} />;
  if (draft.stage === 'sections') return <ContextualChoices label={label} placement={placement} options={sections}
    mode={{
      selected: draft.selected,
      onToggle: section => onEvent({ kind: 'toggle', section }),
      onConfirm: () => onEvent({ kind: 'confirm' }),
    }} />;
  return <ContextualButtons label={label} placement={placement}
    actions={actions.map(action => ({ label: action, onSelect: () => onEvent({ kind: 'action', action }) }))} />;
}
