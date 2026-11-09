export type ScenarioId = 'vnd' | 'settings' | 'csi' | 'csi-direct' | 'feedback-complaint' | 'feedback-positive';
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
    id: 'csi', eyebrow: 'CSI · после значимого сценария', title: 'Разговорная оценка проверки ВНД',
    description: 'Фиксированный вопрос 1–5, контекстная реакция и завершение без формы подтверждения.', accent: 'mint',
    steps: [
      { id:'csi.prompt', number:'01', title:'Короткое приглашение', actor:'Агент', kind:'entry', summary:'После сохранения ВНД агент задаёт один необязательный вопрос.', detail:'Вопрос и шкала CSI неизменны. Пользователь может отказаться без повторного приглашения.', screen:'screens/csi-01-prompt.png', screenAlt:'Короткое приглашение оценить проверку ВНД', tags:['CSI','проактивно'] },
      { id:'csi.low', number:'02', title:'Оценка 1–2', actor:'Агент', kind:'state', summary:'Низкая оценка сохранена, агент спокойно спрашивает, что помешало.', detail:'Комментарий необязателен и не влияет на сохранность выбранного балла.', screen:'screens/csi-02-low.png', screenAlt:'Низкая оценка и вопрос о проблеме', tags:['1–2','эмпатия'] },
      { id:'csi.neutral', number:'03', title:'Оценка 3', actor:'Агент', kind:'state', summary:'Нейтральная оценка сохранена, агент спрашивает, что улучшить.', detail:'Реакция не подталкивает пользователя повысить оценку.', screen:'screens/csi-03-neutral.png', screenAlt:'Оценка три и нейтральный уточняющий вопрос', tags:['3','уточнение'] },
      { id:'csi.high', number:'04', title:'Оценка 4–5', actor:'Агент', kind:'state', summary:'Высокая оценка сохранена, можно назвать удачный или неудобный момент.', detail:'Комментарий остаётся свободным и необязательным.', screen:'screens/csi-04-high.png', screenAlt:'Высокая оценка и предложение добавить комментарий', tags:['4–5','комментарий'] },
      { id:'csi.skipped', number:'05', title:'Без комментария', actor:'Пользователь', kind:'result', summary:'Пользователь пропускает комментарий, выбранная оценка сохраняется.', detail:'Нет повторного опроса, review-экрана, согласия или второй записи.', screen:'screens/csi-05-skipped.png', screenAlt:'Подтверждение сохранения оценки без комментария', tags:['пропуск','сохранение'] },
      { id:'csi.saved', number:'06', title:'Комментарий добавлен', actor:'Агент', kind:'result', summary:'Дословный комментарий присоединён к той же оценке без отдельного подтверждения.', detail:'Оценка и комментарий сохранены как одна запись.', screen:'screens/csi-06-saved.png', screenAlt:'Разговорное завершение CSI с комментарием', tags:['первоисточник','одна запись'] },
      { id:'csi.error', number:'07', title:'Ошибка сохранения', actor:'Система', kind:'result', summary:'Сохранить оценку не удалось, пользователю предлагается повторить попытку позже.', detail:'Повторное действие не создаёт дубликат записи.', screen:'screens/csi-07-error.png', screenAlt:'Сообщение об ошибке сохранения оценки', tags:['ошибка','без дублей'] },
      { id:'csi.declined', number:'08', title:'Не сейчас', actor:'Пользователь', kind:'result', summary:'Приглашение отклонено без давления и сохранения.', detail:'Разговор возвращается к рабочей задаче.', screen:'screens/csi-08-declined.png', screenAlt:'Отказ от CSI и возврат к работе', tags:['отказ','ненавязчиво'] },
    ],
  },
  {
    id:'csi-direct', eyebrow:'CSI · по инициативе пользователя', title:'Самостоятельная оценка сервиса',
    description:'Короткий путь с известным сервисом или одним уточнением.', accent:'blue',
    steps:[
      { id:'csi-direct.known', number:'01', title:'Сервис известен', actor:'Пользователь', kind:'entry', summary:'Пользователь просит оценить проверку ВНД и сразу видит CSI-вопрос.', detail:'Добровольное обращение не превращается в длинную анкету.', screen:'screens/csi-direct-01-known.png', screenAlt:'Самостоятельный CSI для известного сервиса', tags:['direct','известный сервис'] },
      { id:'csi-direct.service', number:'02', title:'Какой сервис?', actor:'Агент', kind:'action', summary:'Если контекста нет, агент задаёт одно короткое уточнение.', detail:'Без ответа формальная оценка не создаётся.', screen:'screens/csi-direct-02-service.png', screenAlt:'Уточнение сервиса перед CSI', tags:['уточнение','один вопрос'] },
      { id:'csi-direct.rating', number:'03', title:'Сервис уточнён', actor:'Пользователь', kind:'state', summary:'После явного ответа показывается тот же фиксированный CSI-вопрос.', detail:'Оценка будет привязана к сервису «Проверка ВНД».', screen:'screens/csi-direct-03-rating.png', screenAlt:'CSI после уточнения сервиса', tags:['questionId','1–5'] },
      { id:'csi-direct.saved', number:'04', title:'Оценка записана', actor:'Агент', kind:'result', summary:'Бал сохранён и привязан к выбранному сервису.', detail:'Завершение остаётся коротким, без review-экрана и чекбокса.', screen:'screens/csi-direct-04-saved.png', screenAlt:'Завершение самостоятельного CSI', tags:['сохранение','без формы'] },
    ],
  },
  {
    id:'feedback-complaint', eyebrow:'Обратная связь · проблема', title:'Жалоба или запрос помощи',
    description:'Дословная жалоба сохраняется отдельно, просьба помочь остаётся рабочей задачей.', accent:'mint',
    steps:[
      { id:'feedback.complaint', number:'01', title:'Явная жалоба', actor:'Пользователь', kind:'entry', summary:'Конкретная проблема сохраняется без CSI и дополнительной анкеты.', detail:'Сохраняются точные слова и минимум контекста.', screen:'screens/feedback-complaint-01-complaint.png', screenAlt:'Принятая жалоба о результате проверки', tags:['жалоба','первоисточник'] },
      { id:'feedback.help', number:'02', title:'Просьба помочь', actor:'Агент', kind:'result', summary:'Агент помогает найти результат и не записывает просьбу как жалобу.', detail:'При сомнении сообщение не уходит за пределы чата.', screen:'screens/feedback-complaint-02-help.png', screenAlt:'Рабочая помощь без создания жалобы', tags:['помощь','не жалоба'] },
      { id:'feedback.clarify', number:'03', title:'Сервис неясен', actor:'Агент', kind:'action', summary:'Агент задаёт не более одного вопроса о сервисе.', detail:'Исходная жалоба уже сохранена в состоянии и не теряется при молчании.', screen:'screens/feedback-complaint-03-clarify.png', screenAlt:'Одно уточнение сервиса для жалобы', tags:['уточнение','общая очередь'] },
      { id:'feedback.clarified', number:'04', title:'Уточнение добавлено', actor:'Пользователь', kind:'result', summary:'Точный ответ присоединяется к исходной жалобе.', detail:'Создаётся одна запись без пересказа на подтверждение.', screen:'screens/feedback-complaint-04-clarified.png', screenAlt:'Жалоба после одного уточнения', tags:['маршрутизация','одна запись'] },
      { id:'feedback.error', number:'05', title:'Ошибка сохранения', actor:'Система', kind:'result', summary:'При сбое агент сообщает, что отзыв сохранить не удалось.', detail:'Повторная отправка не создаёт ложный успех или дубликат.', screen:'screens/feedback-complaint-05-error.png', screenAlt:'Ошибка сохранения жалобы', tags:['ошибка','повтор'] },
    ],
  },
  {
    id:'feedback-positive', eyebrow:'Обратная связь · идея и похвала', title:'Свободная положительная обратная связь',
    description:'Идея или благодарность принимается без автоматического CSI.', accent:'blue',
    steps:[
      { id:'feedback.idea', number:'01', title:'Идея принята', actor:'Пользователь', kind:'entry', summary:'Конкретное предложение записывается дословно.', detail:'Агент не обещает реализацию и не просит звёзды.', screen:'screens/feedback-positive-01-idea.png', screenAlt:'Принятая идея об улучшении сервиса', tags:['идея','без CSI'] },
      { id:'feedback.idea-clarify', number:'02', title:'Контекст идеи неясен', actor:'Агент', kind:'action', summary:'Один ненавязчивый вопрос помогает определить сервис.', detail:'Уточнение необязательно, исходная идея не переписывается.', screen:'screens/feedback-positive-02-idea-clarify.png', screenAlt:'Уточнение сервиса для идеи', tags:['идея','уточнение'] },
      { id:'feedback.idea-clarified', number:'03', title:'Идея уточнена', actor:'Агент', kind:'result', summary:'Ответ добавлен к той же записи, завершение остаётся коротким.', detail:'Предложение сохраняется и передаётся команде выбранного сервиса.', screen:'screens/feedback-positive-03-idea-clarified.png', screenAlt:'Идея после одного уточнения', tags:['одна запись','маршрутизация'] },
      { id:'feedback.praise', number:'04', title:'Благодарность принята', actor:'Агент', kind:'result', summary:'Похвала принимается без автоматического запроса CSI.', detail:'Короткий живой ответ не обещает внешнюю передачу.', screen:'screens/feedback-positive-04-praise.png', screenAlt:'Ответ на благодарность без CSI', tags:['похвала','коротко'] },
    ],
  },
];

export const getScenario = (scenarioId: string | null): Scenario | undefined =>
  scenarios.find(scenario => scenario.id === scenarioId);

const legacyStepRedirects: Record<string, string> = {
  'csi.rating': 'csi.high',
  'csi.review': 'csi.saved',
  'csi.edited': 'csi.saved',
  'csi.submitted': 'csi.saved',
};

export const getScenarioStep = (scenarioId: string, stepId: string | null): ScenarioStep | undefined =>
  getScenario(scenarioId)?.steps.find(step => step.id === (stepId ? legacyStepRedirects[stepId] ?? stepId : stepId));

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
