export type ScenarioId = 'vnd' | 'settings' | 'csi';
export type MapView = 'story' | 'screens';
export type StepKind = 'entry' | 'action' | 'system' | 'state' | 'result';

export interface ScenarioStep {
  id: string;
  number: string;
  title: string;
  actor: 'Пользователь' | 'Агент' | 'Система';
  kind: StepKind;
  summary: string;
  detail: string;
  screen: string;
  screenAlt: string;
  tags: string[];
}

export interface Scenario {
  id: ScenarioId;
  eyebrow: string;
  title: string;
  description: string;
  accent: 'mint' | 'blue';
  steps: ScenarioStep[];
}

export interface MapLocation {
  scenarioId: ScenarioId;
  stepId: string;
  view: MapView;
}

export const scenarios: Scenario[] = [
  {
    id: 'vnd',
    eyebrow: 'ВНД · положительный результат',
    title: 'Фоновая проверка и сохранение',
    description: 'От загрузки документа до подтверждённого сохранения в базе знаний.',
    accent: 'mint',
    steps: [
      {
        id: 'vnd.start', number: '01', title: 'Начало проверки', actor: 'Агент', kind: 'entry',
        summary: 'Ассистент объясняет задачу и просит прикрепить ВНД.',
        detail: 'Точка входа не блокирует другие сценарии универсального агента. Пользователь остаётся в обычном продуктовом чате.',
        screen: 'screens/vnd-01-start.png', screenAlt: 'Чат с приветствием и просьбой прикрепить ВНД',
        tags: ['чат', 'точка входа'],
      },
      {
        id: 'vnd.running', number: '02', title: 'Проверка выполняется', actor: 'Агент', kind: 'system',
        summary: 'Документ и стандарт выбраны. AgentActivity показывает текущую работу.',
        detail: 'Проверка выполняется в фоне. Пилюлю можно раскрыть и посмотреть шаги, а состояние принадлежит конкретному диалогу.',
        screen: 'screens/vnd-02-running.png', screenAlt: 'Чат с документом, выбранным стандартом и пилюлей активности',
        tags: ['activity', 'background'],
      },
      {
        id: 'vnd.history-running', number: '03', title: 'Работа видна в истории', actor: 'Система', kind: 'state',
        summary: 'Название работающего чата получает сине-зелёную анимацию.',
        detail: 'В истории нет дополнительной строки статуса: состояние передаётся только обработкой названия диалога.',
        screen: 'screens/vnd-03-history-running.png', screenAlt: 'История диалогов во время фоновой проверки',
        tags: ['история', 'running'],
      },
      {
        id: 'vnd.unread', number: '04', title: 'Результат готов вне чата', actor: 'Система', kind: 'state',
        summary: 'После завершения у диалога появляется четырёхлучевая звёздочка.',
        detail: 'Пользователь находится в другом сценарии. Индикатор показывает непросмотренный результат и исчезнет после открытия.',
        screen: 'screens/vnd-04-unread.png', screenAlt: 'История с непрочитанным результатом проверки ВНД',
        tags: ['история', 'unread'],
      },
      {
        id: 'vnd.result', number: '05', title: 'Положительный результат', actor: 'Агент', kind: 'result',
        summary: 'Отклонений нет. Ассистент предлагает сохранить актуальный ВНД.',
        detail: 'Сохранение продолжается в диалоге: можно ответить «Да», назвать другую папку или отказаться.',
        screen: 'screens/vnd-05-result.png', screenAlt: 'Чат с положительным результатом и предложением сохранить ВНД',
        tags: ['результат', 'knowledge base'],
      },
      {
        id: 'vnd.saved', number: '06', title: 'Сохранение подтверждено', actor: 'Пользователь', kind: 'result',
        summary: 'Пользователь отвечает словами, ассистент подтверждает файл и папку.',
        detail: 'Отдельная модалка не нужна. Старый UI выбора папки сохранён в исходниках, но не участвует в основном пути.',
        screen: 'screens/vnd-06-saved.png', screenAlt: 'Подтверждение сохранения ВНД в базе знаний',
        tags: ['подтверждение', 'сохранение'],
      },
    ],
  },
  {
    id: 'settings',
    eyebrow: 'Настройки агента',
    title: 'Удаление факта памяти',
    description: 'Переход из истории во второй слой drawer и безопасное удаление одного факта.',
    accent: 'blue',
    steps: [
      {
        id: 'settings.history', number: '01', title: 'Вход через историю', actor: 'Пользователь', kind: 'entry',
        summary: 'Настройки доступны из фиксированной нижней части drawer истории.',
        detail: 'История остаётся первым слоем. Группы диалогов прокручиваются независимо от точки входа в настройки.',
        screen: 'screens/settings-01-history.png', screenAlt: 'История диалогов с точкой входа в настройки',
        tags: ['drawer', 'навигация'],
      },
      {
        id: 'settings.overview', number: '02', title: 'Обзор настроек', actor: 'Пользователь', kind: 'state',
        summary: 'Второй слой содержит историю чатов и память агента.',
        detail: 'История расположена выше, потому что её секция стабильна по высоте. Память растёт вниз и прокручивается.',
        screen: 'screens/settings-02-overview.png', screenAlt: 'Drawer настроек с историей и памятью агента',
        tags: ['settings', 'memory'],
      },
      {
        id: 'settings.confirm', number: '03', title: 'Подтверждение удаления', actor: 'Система', kind: 'action',
        summary: 'Удаление одного факта проходит через контролируемый UI-kit Popover.',
        detail: 'Popover привязан к кнопке записи, фокус получает «Отмена», Escape закрывает верхний слой и возвращает фокус.',
        screen: 'screens/settings-03-confirm.png', screenAlt: 'Popover подтверждения удаления факта памяти',
        tags: ['popover', 'destructive'],
      },
      {
        id: 'settings.updated', number: '04', title: 'Память обновлена', actor: 'Система', kind: 'result',
        summary: 'Факт исчезает, счётчик обновляется, фокус переходит на стабильный заголовок.',
        detail: 'История чатов не затрагивается. Очистка памяти и очистка истории остаются независимыми действиями.',
        screen: 'screens/settings-04-updated.png', screenAlt: 'Настройки после удаления одного факта памяти',
        tags: ['focus', 'updated'],
      },
    ],
  },
  {
    id: 'csi',
    eyebrow: 'CSI · после значимого сценария',
    title: 'Оценка завершённой проверки ВНД',
    description: 'Стандартизированный вопрос, прозрачное подтверждение данных и демонстрационный результат.',
    accent: 'mint',
    steps: [
      {
        id: 'csi.prompt', number: '01', title: 'Ненавязчивое приглашение', actor: 'Агент', kind: 'entry',
        summary: 'После завершения проверки агент предлагает один короткий вопрос, который можно пропустить.',
        detail: 'CSI продолжает рабочий сценарий в том же чате. Отдельный виджет не перекрывает интерфейс, а приглашение не появляется после каждого ответа.',
        screen: 'screens/csi-01-prompt.png', screenAlt: 'Чат с завершённой проверкой ВНД и компактной оценкой от одной до пяти звёзд',
        tags: ['CSI', 'проактивно'],
      },
      {
        id: 'csi.rating', number: '02', title: 'Формальная оценка', actor: 'Пользователь', kind: 'action',
        summary: 'Пользователь ставит 4 из 5 и при желании добавляет свободный комментарий.',
        detail: 'Вопрос и шкала имеют стабильный questionId. Комментарий необязателен, потому что формальная оценка и качественная обратная связь не смешиваются.',
        screen: 'screens/csi-02-rating.png', screenAlt: 'Выбранная оценка четыре звезды и предложение добавить необязательный комментарий',
        tags: ['1–5', 'комментарий'],
      },
      {
        id: 'csi.review', number: '03', title: 'Проверка состава данных', actor: 'Система', kind: 'state',
        summary: 'Карточка показывает исходные ответы отдельно от изменяемой интерпретации AI.',
        detail: 'Дословные ответы сохраняют порядок и идентификаторы. Весь чат, вложения и другие диалоги не включаются по умолчанию.',
        screen: 'screens/csi-03-review.png', screenAlt: 'Карточка подтверждения с исходными цитатами, интерпретацией AI и составом передаваемых данных',
        tags: ['первоисточник', 'согласие'],
      },
      {
        id: 'csi.edited', number: '04', title: 'Интерпретация исправлена', actor: 'Пользователь', kind: 'action',
        summary: 'Пользователь уточняет AI-сводку, не изменяя исходные цитаты.',
        detail: 'Согласие относится к явно показанному составу данных. Кнопка подтверждения недоступна, пока согласие не отмечено.',
        screen: 'screens/csi-04-edited.png', screenAlt: 'Отредактированная AI-интерпретация рядом с неизменными исходными ответами',
        tags: ['редактирование', 'контроль'],
      },
      {
        id: 'csi.submitted', number: '05', title: 'Демонстрационный результат', actor: 'Агент', kind: 'result',
        summary: 'Оценка появляется в демо-списке с фильтром по сервису и раскрытием первоисточника.',
        detail: 'Реальной отправки нет. Прототип не обещает обработку и явно отделяет будущие API, права доступа, хранение и методику CSI.',
        screen: 'screens/csi-05-submitted.png', screenAlt: 'Демонстрационный список оценок CSI с фильтром по сервису и исходными ответами',
        tags: ['mock', 'список'],
      },
    ],
  },
];

export const getScenario = (scenarioId: string | null): Scenario | undefined =>
  scenarios.find(scenario => scenario.id === scenarioId);

export const getScenarioStep = (scenarioId: string, stepId: string | null): ScenarioStep | undefined =>
  getScenario(scenarioId)?.steps.find(step => step.id === stepId);

export function getInitialLocation(search: string): MapLocation {
  const params = new URLSearchParams(search);
  const scenario = getScenario(params.get('scenario')) ?? scenarios[0];
  const step = getScenarioStep(scenario.id, params.get('step')) ?? scenario.steps[0];
  const view = params.get('view') === 'screens' ? 'screens' : 'story';
  return { scenarioId: scenario.id, stepId: step.id, view };
}

export const toSearch = ({ scenarioId, stepId, view }: MapLocation): string => {
  const params = new URLSearchParams({ scenario: scenarioId, step: stepId, view });
  return `?${params.toString()}`;
};

export const toLivePreviewUrl = (baseUrl: string, stepId: string): string => {
  const params = new URLSearchParams({ atlas: stepId, embed: '1' });
  return `${baseUrl}?${params.toString()}`;
};

export function getAdjacentStep(scenarioId: ScenarioId, stepId: string, direction: -1 | 1): ScenarioStep | undefined {
  const scenario = getScenario(scenarioId);
  if (!scenario) return undefined;
  const index = Math.max(0, scenario.steps.findIndex(step => step.id === stepId));
  const nextIndex = Math.min(scenario.steps.length - 1, Math.max(0, index + direction));
  return scenario.steps[nextIndex];
}
