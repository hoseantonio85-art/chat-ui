export type ScenarioId = 'vnd' | 'vnd-to-be' | 'reply-ready' | 'chat-rename' | 'reasoning' | 'settings' | 'csi' | 'csi-direct' | 'feedback-complaint' | 'feedback-positive';
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
  scopeNote?: string;
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
    id: 'reply-ready',
    eyebrow: 'История чатов',
    title: 'Ответ готов в другом чате',
    description: 'Звёздочка отмечает готовый ответ, пока пользователь находится в другом диалоге.',
    accent: 'mint',
    steps: [
      {
        id: 'reply-ready.switch', number: '01', title: 'Перейти в другой чат', actor: 'Пользователь', kind: 'entry',
        summary: 'Агент ещё готовит ответ. Пользователь открывает другой диалог из истории.',
        detail: 'Откройте живой экран и выберите «Анализ рисков компании», пока идёт проверка ВНД. Примерно через 10 секунд ответ будет готов, и у кнопки истории появится звёздочка.',
        screen: 'screens/reply-ready-01-switch.png', screenAlt: 'История чатов открыта, пока идёт проверка ВНД',
        tags: ['история', 'фоновая работа'],
      },
      {
        id: 'reply-ready.running', number: '02', title: 'Ответ готовится в фоне', actor: 'Система', kind: 'state',
        summary: 'Выбран другой чат. По названию «Проверка ВНД» движется градиент.',
        detail: 'В живом экране видна анимация названия «Проверка ВНД» на белом фоне. Выбранный чат «Анализ рисков компании» подсвечен отдельно.',
        screen: 'screens/reply-ready-02-running.png', screenAlt: 'Цветной градиент на названии «Проверка ВНД» в белой строке истории',
        tags: ['градиент', 'фоновая работа'],
      },
      {
        id: 'reply-ready.menu', number: '03', title: 'Звёздочка на кнопке истории', actor: 'Система', kind: 'state',
        summary: 'В шапке другого чата появляется звёздочка на кнопке истории.',
        detail: 'Панель истории закрыта, звёздочка видна сразу. Нажмите кнопку истории, чтобы увидеть, в каком чате готов ответ.',
        screen: 'screens/reply-ready-02-menu.png', screenAlt: 'Бирюзовая звёздочка на кнопке истории в левом верхнем углу чата',
        tags: ['звёздочка', 'кнопка истории'],
      },
      {
        id: 'reply-ready.unread', number: '04', title: 'Звёздочка у готового ответа', actor: 'Система', kind: 'state',
        summary: 'Звёздочка отмечает исходный чат в истории, пока открыт другой диалог.',
        detail: 'В живом экране нажмите «Проверка ВНД» со звёздочкой. Откроется исходный чат с готовым ответом.',
        screen: 'screens/reply-ready-02-unread.png', screenAlt: 'Звёздочка рядом с исходным чатом в истории',
        tags: ['звёздочка', 'новый ответ'],
      },
      {
        id: 'reply-ready.read', number: '05', title: 'Ответ открыт, звёздочка снята', actor: 'Система', kind: 'result',
        summary: 'При открытии исходного чата отметка исчезает в истории и у её кнопки.',
        detail: 'В истории выбран чат «Проверка ВНД». Закройте панель, чтобы увидеть готовый ответ.',
        screen: 'screens/reply-ready-03-read.png', screenAlt: 'Выбран исходный чат, звёздочки рядом с ним больше нет',
        tags: ['готовый ответ', 'прочитано'],
      },
    ],
  },
  {
    id: 'settings',
    eyebrow: 'История чатов',
    title: 'Настройки агента',
    description: 'Из настроек можно удалить один факт или очистить память целиком.',
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
        summary: 'В разделе «Память агента» можно удалить один факт или очистить весь список.',
        detail: 'Нажмите на корзину рядом с фактом или на «Очистить память» под списком. Оба действия требуют подтверждения.',
        screen: 'screens/settings-clear-01-overview.png', screenAlt: 'Настройки с историей, списком фактов и кнопкой очистки памяти',
        tags: ['settings', 'memory'],
      },
      {
        id: 'settings.confirm', number: '03', title: 'Удалить один факт', actor: 'Система', kind: 'action',
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
      {
        id: 'settings-clear.confirm', number: '05', title: 'Очистить всю память', actor: 'Пользователь', kind: 'action',
        summary: 'Настройки запрашивают подтверждение удаления всех фактов.',
        detail: 'Нажмите «Очистить» в живом экране. Если выбрать «Отмена» или нажать Escape, факты сохранятся.',
        screen: 'screens/settings-clear-02-confirm.png', screenAlt: 'Окно подтверждения очистки памяти агента',
        tags: ['подтверждение', 'очистка'],
      },
      {
        id: 'settings-clear.empty', number: '06', title: 'Память пуста', actor: 'Система', kind: 'result',
        summary: 'После очистки список исчезает, а кнопка «Очистить память» становится недоступной.',
        detail: 'Фокус переходит на заголовок «Память агента». Сохранённые чаты по-прежнему доступны в истории.',
        screen: 'screens/settings-clear-03-empty.png', screenAlt: 'Пустая память агента после очистки',
        tags: ['пустое состояние', 'память'],
      },
    ],
  },
  {
    id: 'csi', eyebrow: 'CSI · после значимого сценария', title: 'Разговорная оценка проверки ВНД',
    description: 'Фиксированный вопрос 1–5, контекстная реакция и завершение без формы подтверждения.', accent: 'mint',
    steps: [
      { id:'csi.prompt', number:'01', title:'Короткое приглашение', actor:'Агент', kind:'entry', summary:'Завершение проверки и необязательный вопрос CSI показаны отдельными сообщениями.', detail:'Компактная шкала остаётся внутри CSI-сообщения, а отказ вынесен под него отдельной нейтральной кнопкой.', screen:'screens/csi-01-prompt.png', screenAlt:'Короткое приглашение оценить проверку ВНД', tags:['CSI','проактивно'] },
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
  {
    id:'vnd-to-be',
    eyebrow:'ВНД TO-BE · все варианты проверки',
    title:'Проверка ВНД: с отклонениями и без',
    description:'Одна карта: выбор стандарта, два исхода проверки, повторная проверка и все варианты сохранения.',
    accent:'mint',
    steps:[
      {id:'vnd-to-be.start', number:'01', title:'Прикрепить ВНД', actor:'Пользователь', kind:'entry',
        summary:'Агент предлагает загрузить документ для проверки.',
        detail:'В живом экране прикрепите документ и отправьте его. Агент предложит четыре групповых стандарта.',
        screen:'screens/vnd-to-be-01-start.png', screenAlt:'Приглашение загрузить ВНД', tags:['загрузка', 'ВНД']},
      {id:'vnd-to-be.standard', number:'02', title:'Выбрать стандарт кнопкой', actor:'Пользователь', kind:'action',
        summary:'Под вопросом — четыре длинных наименования в светлом блоке выбора.',
        detail:'Нажмите любой пункт. Проверка начнётся сразу. Если прокрутить вопрос за пределы экрана, варианты будут доступны в виджете над полем ввода.',
        screen:'screens/vnd-to-be-02-standard.png', screenAlt:'Четыре стандарта для выбора нажатием', tags:['карточки выбора', 'один ответ']},
      {id:'vnd-to-be.result', number:'03', title:'Есть отклонения', actor:'Агент', kind:'result',
        summary:'Агент показывает расхождения и предлагает прикрепить исправленный документ.',
        detail:'Загрузите исправленный файл в живом экране. Повторная проверка использует уже выбранный стандарт.',
        screen:'screens/vnd-to-be-03-result.png', screenAlt:'Результат проверки с рекомендациями по исправлению', tags:['замечания', 'повторная проверка']},
      {id:'vnd-to-be.save', number:'04', title:'После исправлений: сохранить', actor:'Пользователь', kind:'action',
        scopeNote:'Не входит в текущую задачу',
        summary:'Повторная проверка завершена. Под предложением сохранить — три фиолетовые кнопки.',
        detail:'«Да, сохранить» сразу сохраняет исправленный файл в «Стандарты». «Выбрать другую папку» открывает выбор папки. «Не сейчас» откладывает сохранение.',
        screen:'screens/vnd-to-be-04-save.png', screenAlt:'Вопрос о сохранении с тремя кнопками', tags:['действия', 'сохранение']},
      {id:'vnd-to-be.folder', number:'05', title:'Выбрать другую папку', actor:'Пользователь', kind:'action',
        scopeNote:'Не входит в текущую задачу',
        summary:'Небольшая модалка позволяет выбрать папку и подтвердить сохранение.',
        detail:'Это вариант ответа «Выбрать другую папку». Выберите папку и нажмите «Сохранить» либо отмените выбор.',
        screen:'screens/vnd-to-be-05-folder.png', screenAlt:'Модалка выбора папки', tags:['другая папка', 'подтверждение']},
      {id:'vnd-to-be.deferred', number:'06', title:'Отложить сохранение', actor:'Пользователь', kind:'state',
        scopeNote:'Не входит в текущую задачу',
        summary:'После «Не сейчас» кнопки закрываются. В чате остаётся способ вернуться.',
        detail:'Это альтернативный ответ на предложение сохранить. Напишите «Вернуться к сохранению», чтобы снова получить три кнопки.',
        screen:'screens/vnd-to-be-06-deferred.png', screenAlt:'Сохранение отложено, показана команда возврата', tags:['не сейчас', 'возврат']},
      {id:'vnd-to-be.saved', number:'07', title:'Файл сохранён', actor:'Агент', kind:'result',
        scopeNote:'Не входит в текущую задачу',
        summary:'Агент подтверждает исправленную версию документа и папку сохранения.',
        detail:'Это результат нажатия «Да, сохранить». Вопрос закрыт, а свободный ввод остаётся доступным.',
        screen:'screens/vnd-to-be-07-saved.png', screenAlt:'Подтверждение сохранения исправленного ВНД', tags:['результат', 'база знаний']},
      {id:'vnd-to-be.clean',number:'08',title:"Отклонений нет",actor:"Агент",kind:'result',summary:"Первая проверка успешна. Можно сразу сохранить исходный документ в «Стандарты».",detail:"Выберите «Да, сохранить», другую папку или «Не сейчас». Исправленная версия не нужна.",screen:'screens/vnd-to-be-08-clean.png',screenAlt:"Положительный результат первой проверки и предложение сохранить",tags:['без отклонений','сохранение']},
      {id:'vnd-to-be.clean-folder',number:'09',title:"Без отклонений: другая папка",actor:"Пользователь",kind:'action',summary:"Выбор папки для исходного проверенного документа.",detail:"Подтвердите выбранную папку или отмените выбор. По умолчанию предложены «Стандарты».",screen:'screens/vnd-to-be-09-clean-folder.png',screenAlt:"Выбор папки после успешной первой проверки",tags:['без отклонений','сохранение']},
      {id:'vnd-to-be.clean-deferred',number:'10',title:"Без отклонений: не сейчас",actor:"Пользователь",kind:'state',summary:"Проверка завершена, сохранение отложено.",detail:"Напишите «Вернуться к сохранению», чтобы вновь открыть варианты. Исходный документ сохранён в контексте чата.",screen:'screens/vnd-to-be-10-clean-deferred.png',screenAlt:"Отложенное сохранение документа без отклонений",tags:['без отклонений','сохранение']},
      {id:'vnd-to-be.clean-saved',number:'11',title:"Исходный файл сохранён",actor:"Агент",kind:'result',summary:"Ассистент подтверждает сохранение исходного файла в «Стандарты».",detail:"Сохраняется тот же документ, который прошёл первую проверку. Повторная загрузка не требуется.",screen:'screens/vnd-to-be-11-clean-saved.png',screenAlt:"Подтверждение сохранения исходного ВНД в Стандарты",tags:['без отклонений','сохранение']},
    ],
  },
  {
    id:'reasoning',
    eyebrow:'Работа агента',
    title:'Ответ с рассуждениями',
    description:'Проверка операционных рисков с объяснениями шагов, обращением к источникам и итоговым ответом.',
    accent:'mint',
    steps:[
      {id:'reasoning.request', number:'01', title:'Запрос отправлен', actor:'Пользователь', kind:'entry',
        summary:'Пользователь просит проверить операционные риски компании.',
        detail:'В живом экране агент начинает работать. Можно раскрыть индикатор, дождаться ответа или переключиться в другой чат.',
        screen:'screens/reasoning-01-request.png', screenAlt:'Начало проверки рисков', tags:['запрос', 'живой запуск']},
      {id:'reasoning.thinking', number:'02', title:'Агент обдумывает задачу', actor:'Агент', kind:'system',
        summary:'Над будущим ответом появляется компактный индикатор «Думаю».',
        detail:'Раскройте индикатор и пункт «Думаю», чтобы прочитать пояснение следующего шага. Работа продолжается.',
        screen:'screens/reasoning-02-thinking.png', screenAlt:'Компактный индикатор рассуждения', tags:['рассуждение', 'раскрытие']},
      {id:'reasoning.sources', number:'03', title:'Ход работы и источники', actor:'Агент', kind:'state',
        summary:'Профиль компании получен, агент обращается к методологу. Пояснение шага можно прочитать под его названием.',
        detail:'Экран открывается с раскрытым ходом работы и пояснением профайлера. Можно свернуть их и раскрыть заново. Затем агент проверит реестр рисков и требования.',
        screen:'screens/reasoning-03-sources.png', screenAlt:'Раскрытый ход работы с пояснением профайлера', tags:['источники', 'подробности']},
      {id:'reasoning.answer', number:'04', title:'Итоговый ответ', actor:'Агент', kind:'result',
        summary:'В чате появился ответ с найденными рисками и рекомендациями. Ход работы свёрнут.',
        detail:'Нажмите «Ответ готов», чтобы вернуться к выполненным шагам. Ввод нового сообщения остаётся доступным.',
        screen:'screens/reasoning-04-answer.png', screenAlt:'Итог проверки рисков и свёрнутый ход работы', tags:['ответ', 'завершение']},
      {id:'reasoning.trace', number:'05', title:'Проверить выполненные шаги', actor:'Пользователь', kind:'action',
        summary:'После ответа пользователь раскрывает ход работы и пояснение обращения к профайлеру.',
        detail:'Каждый пункт можно раскрыть независимо. Переключение между чатом и картой сохраняет независимость их состояний.',
        screen:'screens/reasoning-05-trace.png', screenAlt:'Ход работы после завершения ответа', tags:['история работы', 'рассуждения']},
    ],
  },
  {
    id:'chat-rename',
    eyebrow:'История чатов',
    title:'Переименование диалога',
    description:'Новое название сохраняется галочкой или Enter. Крестик и Escape отменяют правку.',
    accent:'blue',
    steps:[
      {
        id:'chat-rename.history', number:'01', title:'Выбрать переименование', actor:'Пользователь', kind:'entry',
        summary:'В истории пользователь открывает действия чата «Анализ рисков компании».',
        detail:'Нажмите троеточие у названия и выберите «Переименовать».',
        screen:'screens/chat-rename-01-history.png', screenAlt:'История с выбранным чатом перед переименованием',
        tags:['история', 'меню действий'],
      },
      {
        id:'chat-rename.editing', number:'02', title:'Изменить название', actor:'Пользователь', kind:'action',
        summary:'Поле занимает строку, галочка стоит на месте троеточия, слева от неё — крестик отмены.',
        detail:'В живом экране отредактируйте название. Галочка и Enter сохраняют его, крестик и Escape отменяют правку. Пустое название сохранить нельзя.',
        screen:'screens/chat-rename-02-editing.png', screenAlt:'Поле названия с кнопками отмены и сохранения',
        tags:['поле ввода', 'галочка', 'крестик'],
      },
      {
        id:'chat-rename.saved', number:'03', title:'Название сохранено', actor:'Система', kind:'result',
        summary:'В истории отображается «Риски компании за квартал».',
        detail:'Откройте другой чат и вернитесь в историю — новое название сохранится. При желании можно переименовать чат ещё раз.',
        screen:'screens/chat-rename-03-saved.png', screenAlt:'Новое название чата в истории',
        tags:['сохранение', 'переключение чатов'],
      },
      {
        id:'chat-rename.cancelled', number:'04', title:'Правка отменена', actor:'Пользователь', kind:'result',
        summary:'При отмене остаётся прежнее название «Анализ рисков компании».',
        detail:'Это альтернативный исход шага редактирования. Живой экран позволяет снова открыть меню и продолжить работу.',
        screen:'screens/chat-rename-04-cancelled.png', screenAlt:'Исходное название чата после отмены правки',
        tags:['отмена', 'Escape'],
      },
    ],
  },
];

export const getScenario = (scenarioId: string | null): Scenario | undefined =>
  scenarios.find(scenario => scenario.id === scenarioId);

const legacyStepRedirects: Record<string, string> = {
  'settings-clear.overview': 'settings.overview',
  'csi.rating': 'csi.high',
  'csi.review': 'csi.saved',
  'csi.edited': 'csi.saved',
  'csi.submitted': 'csi.saved',
};

export const getScenarioStep = (scenarioId: string, stepId: string | null): ScenarioStep | undefined =>
  getScenario(scenarioId)?.steps.find(step => step.id === (stepId ? legacyStepRedirects[stepId] ?? stepId : stepId));

export function getInitialLocation(search: string): MapLocation {
  const params = new URLSearchParams(search);
  const requestedScenario = params.get('scenario');
  const scenario = getScenario(requestedScenario === 'settings-clear' ? 'settings' : requestedScenario) ?? scenarios[0];
  const step = getScenarioStep(scenario.id, params.get('step'))
    ?? (requestedScenario === 'settings-clear' ? getScenarioStep(scenario.id, 'settings.overview') : undefined)
    ?? scenario.steps[0];
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

export const vndToBeTransitions = [["vnd-to-be.start","vnd-to-be.standard"],["vnd-to-be.standard","vnd-to-be.result"],["vnd-to-be.standard","vnd-to-be.clean"],["vnd-to-be.result","vnd-to-be.save"],["vnd-to-be.save","vnd-to-be.folder"],["vnd-to-be.save","vnd-to-be.deferred"],["vnd-to-be.save","vnd-to-be.saved"],["vnd-to-be.folder","vnd-to-be.saved"],["vnd-to-be.deferred","vnd-to-be.save"],["vnd-to-be.clean","vnd-to-be.clean-folder"],["vnd-to-be.clean","vnd-to-be.clean-deferred"],["vnd-to-be.clean","vnd-to-be.clean-saved"],["vnd-to-be.clean-folder","vnd-to-be.clean-saved"],["vnd-to-be.clean-deferred","vnd-to-be.clean"]] as const;
export function getVndToBeNextSteps(stepId: string): ScenarioStep[] {
  return vndToBeTransitions.flatMap(([from,to]) => { const step=from===stepId?getScenarioStep('vnd-to-be',to):undefined; return step?[step]:[]; });
}

export const settingsTransitions = [
  ['settings.history', 'settings.overview'],
  ['settings.overview', 'settings.confirm'],
  ['settings.confirm', 'settings.updated'],
  ['settings.overview', 'settings-clear.confirm'],
  ['settings-clear.confirm', 'settings-clear.empty'],
] as const;

export function getSettingsNextSteps(stepId: string): ScenarioStep[] {
  return settingsTransitions.flatMap(([from, to]) => {
    const step = from === stepId ? getScenarioStep('settings', to) : undefined;
    return step ? [step] : [];
  });
}

export function getAdjacentStep(scenarioId: ScenarioId, stepId: string, direction: -1 | 1): ScenarioStep | undefined {
  const scenario = getScenario(scenarioId);
  if (!scenario) return undefined;
  if (scenarioId === 'settings' || scenarioId === 'vnd-to-be') {
    const step = getScenarioStep(scenarioId, stepId) ?? scenario.steps[0];
    if (direction === 1) {
      const next = scenarioId === 'settings' ? getSettingsNextSteps(step.id) : getVndToBeNextSteps(step.id);
      return next.length === 1 ? next[0] : step;
    }
    const previousId = (scenarioId === 'settings' ? settingsTransitions : vndToBeTransitions).find(([, to]) => to === step.id)?.[0];
    return getScenarioStep(scenarioId, previousId ?? null) ?? step;
  }
  const index = Math.max(0, scenario.steps.findIndex(step => step.id === stepId));
  const nextIndex = Math.min(scenario.steps.length - 1, Math.max(0, index + direction));
  return scenario.steps[nextIndex];
}
