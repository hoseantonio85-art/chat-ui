import type { AgentEvent } from '../src/components/AgentActivity/model';
import type { IChartData } from '../src/components/UniversalChart/types';
export const scenarios = [
  {id: 'vndBackground', title: 'ВНД · проверка в фоне', question: 'Проверь ВНД на соответствие стандартам группы.'},
  {id: 'vnd', title: 'ВНД · сам пишу в чат', question: 'Проверь ВНД на соответствие стандартам группы.'},
  {id: 'vndWelcome', title: 'ВНД · пришёл по кнопке', question: 'Проверь ВНД на соответствие стандартам группы.'},
  {id: 'vndBackgroundToBe', title: 'ВНД to be · проверка в фоне', question: 'Проверь ВНД на соответствие стандартам группы.'},
  {id: 'vndToBe', title: 'ВНД to be · сам пишу в чат', question: 'Проверь ВНД на соответствие стандартам группы.'},
  {id: 'vndWelcomeToBe', title: 'ВНД to be · пришёл по кнопке', question: 'Проверь ВНД на соответствие стандартам группы.'},
  {id: 'csiProactive', title: 'CSI · после проверки ВНД', question: 'Оценить завершённую проверку ВНД.'},
  {id: 'csiDirect', title: 'CSI · пользователь, сервис известен', question: 'Хочу оценить сервис проверки ВНД.'},
  {id: 'csiDirectUnknown', title: 'CSI · сначала уточнить сервис', question: 'Хочу оценить сервис.'},
  {id: 'csiError', title: 'CSI · ошибка сохранения', question: 'Оценить проверку ВНД и показать ошибку сохранения.'},
  {id: 'feedbackComplaint', title: 'ОС · явная жалоба', question: 'Невозможно найти результат после проверки.'},
  {id: 'feedbackComplaintClarify', title: 'ОС · жалоба, сервис неизвестен', question: 'После возврата всё сбросилось.'},
  {id: 'feedbackHelp', title: 'ОС · запрос помощи, не жалоба', question: 'Помогите найти результат проверки.'},
  {id: 'feedbackIdea', title: 'ОС · идея', question: 'Добавьте фильтр по статусу проверки.'},
  {id: 'feedbackIdeaClarify', title: 'ОС · идея, сервис неизвестен', question: 'Добавьте быстрый фильтр.'},
  {id: 'feedbackPraise', title: 'ОС · благодарность', question: 'Проверка стала очень удобной.'},
  {id: 'feedbackError', title: 'ОС · ошибка сохранения', question: 'Фильтр сбрасывается после возврата назад.'},
  {id: 'normal', title: 'Обычная проверка', question: 'Проверь операционные риски компании и подскажи, на что обратить внимание.'},
  {id: 'noReasoning', title: 'Модель без рассуждений', question: 'Проверь операционные риски компании и подскажи, на что обратить внимание.'},
  {id: 'parallel', title: 'Два источника сразу', question: 'Проверь профиль компании и реестр рисков, а затем уточни у методолога.'},
  {id: 'subagent', title: 'Работа с экспертом', question: 'Подключи методолога и проверь, как оценить риск сбоя поставок.'},
  {id: 'empty', title: 'Источник без данных', question: 'Есть ли в реестре риски для нового направления компании?'},
  {id: 'error', title: 'Источник недоступен', question: 'Проверь риски компании, даже если один из источников не отвечает.'},
  {id: 'rich', title: 'Файл, таблица и график', question: 'Покажи потери по месяцам: таблицу, график и краткий отчёт.'},
  {id: 'registration', title: 'Регистрация события', question: 'Помоги зарегистрировать событие операционного риска.'},
  {id: 'ordinary', title: 'Обычный чат без формы', question: 'Кратко объясни, что такое операционный риск.'},
  {id: 'finalOnly', title: 'Ответ без потока', question: 'Объясни, что такое операционный риск, без промежуточных событий.'},
  {id: 'backendCallback', title: 'Текущий контракт /ainvoke', question: 'Проверь профиль компании, спроси методолога и посмотри реестр рисков.'},
] as const;
export type ScenarioId = typeof scenarios[number]['id'];

export const scenarioGroups = [
  {id:'vnd', title:'ВНД', scenarioIds:['vndBackground', 'vnd', 'vndWelcome']},
  {id:'vnd-to-be', title:'ВНД · to be (на будущее)', scenarioIds:['vndBackgroundToBe', 'vndToBe', 'vndWelcomeToBe']},
  {id:'csi', title:'CSI', scenarioIds:['csiProactive', 'csiDirect', 'csiDirectUnknown', 'csiError']},
  {id:'feedback', title:'Обратная связь', scenarioIds:['feedbackComplaint', 'feedbackComplaintClarify', 'feedbackHelp', 'feedbackIdea', 'feedbackIdeaClarify', 'feedbackPraise', 'feedbackError']},
  {id:'agent', title:'Работа агента', scenarioIds:['normal', 'noReasoning', 'parallel', 'subagent', 'empty', 'error', 'backendCallback']},
  {id:'answers', title:'Форматы ответа', scenarioIds:['rich', 'ordinary', 'finalOnly']},
] as const satisfies ReadonlyArray<{id:string; title:string; scenarioIds:readonly ScenarioId[]}>;

export const ungroupedScenarioIds = ['registration'] as const satisfies readonly ScenarioId[];
export const usesReferenceFlow = (id: ScenarioId) => id === 'normal' || id === 'noReasoning' || id === 'parallel';

export const vndStandards = [
  'Методика сбора данных об инцидентах операционного риска',
  'Регламент сбора данных об инцидентах операционного риска',
  'Политика по управлению операционным риском',
  'Общий стандарт по организации системы управления операционными рисками в компаниях с участием ПАО Сбербанк',
] as const;

const vndStandardList = vndStandards.map((standard, index) => `${index + 1}. ${standard}`).join('\n');

export const vndStandardPrompt = `Документ загружен. С каким групповым документом его нужно сверить? Отправьте номер выбранного варианта.\n\n${vndStandardList}`;

export const vndToBeStandardPrompt = 'Документ загружен. Выберите групповой документ для сверки. Можно выбрать вариант ниже или отправить его номер сообщением.';

export const isVndToBeScenario = (id: ScenarioId): boolean => id === 'vndBackgroundToBe' || id === 'vndToBe' || id === 'vndWelcomeToBe';
export const isVndBackgroundScenario = (id: ScenarioId): boolean => id === 'vndBackground' || id === 'vndBackgroundToBe';

export const vndResultAnswer = `**Проверка завершена.** В документе выявлены отклонения от групповых требований.

| Выявленное отклонение | Рекомендация |
| --- | --- |
| Порог регистрации потерь выше группового | Привести порог в соответствие |
| Не указаны сроки расследования инцидентов | Добавить сроки и ответственных |
| Не описаны функции коллегиального органа | Закрепить функции за ответственными органами |

Внесите правки и загрузите исправленный документ повторно.`;

export const vndCorrectedAnswer = `**Повторная проверка завершена.** Все ранее выявленные отклонения устранены.

| Требование | Результат повторной проверки |
| --- | --- |
| Порог регистрации потерь | Приведён в соответствие |
| Сроки расследования инцидентов | Добавлены сроки и ответственные |
| Функции коллегиального органа | Закреплены за ответственными органами |

Документ соответствует выбранному групповому стандарту.`;
export const chart: IChartData = {
  metadata: {title: 'Потери по месяцам', view: 'barChart', categories: ['Январь', 'Февраль', 'Март', 'Апрель'], series: ['Прямые', 'Косвенные'], colors: {Прямые: '#a0d7f3', Косвенные: '#d5bbff'}, units: {y: 'тыс. ₽'}},
  data: [410, 400, 210, 190].map((value, i) => ({category: ['Январь','Февраль','Март','Апрель'][i], values: {Прямые: value, Косвенные: [415,810,180,490][i]}})),
};
export function fixture(scenario: ScenarioId, runId: string, start: number) {
  const events: AgentEvent[] = [];
  const backendSteps: string[] = [];
  if (scenario === 'vnd') return {events, backendSteps, answer: vndResultAnswer};
  if (scenario === 'finalOnly') return {events, backendSteps, answer: '**Операционный риск** — вероятность потерь из-за ошибок процессов, людей, систем или внешних событий. Для первичной оценки определите причину, последствия, вероятность и действующие меры контроля.'};
  if (scenario === 'backendCallback') {
    // Exact service texts from api/norm_chat.py and tests/unit/test_norm_chat.py.
    // The plan's todo contents are the backend test fixture, not fixed agent phrases.
    // The combination/order is illustrative; this pilot does not call the backend.
    backendSteps.push(
      'План:\n✓ Уточнить требования\n→ Собрать данные\n• Ответить',
      'Посмотрел профиль компании',
      'Подключил профильного помощника',
      'Спросил методолога',
      'Посмотрел реестр рисков — источник недоступен',
    );
    return {events, backendSteps, answer: '**Проверка завершена.** Профиль компании и рекомендации методолога получены. Реестр рисков сейчас недоступен, поэтому его данные нужно перепроверить перед итоговой оценкой.'};
  }
  let at = start;
  const sourceDelays: Record<string, number> = {get_company_profile:3800, ask_methodologist:6200, get_company_risks:4600, get_company_laws:4100};
  const add = (kind: AgentEvent['kind'], data: Partial<AgentEvent> = {}, delay?: number) => {
    at += delay ?? (usesReferenceFlow(scenario) && kind === 'toolResult' ? sourceDelays[data.tool ?? ''] ?? 4000 : 700);
    events.push({id: `${runId}-${events.length}`, runId, at, kind, ...data});
  };
  const explain = (text: string, stepId?: string) => {
    if (scenario === 'noReasoning') return;
    const fragments = text.match(/\S+(?:\s+\S+)?\s*/g) ?? [];
    fragments.forEach((fragment, index) => add('thinking', {progressDelta: {stepId, text: fragment}}, index ? 300 : 700));
  };
  if (scenario === 'ordinary') {
    explain('Пользователь просит краткое определение. Объясню, откуда возникает операционный риск, и приведу простой пример.');
    return {events, backendSteps, answer: '**Операционный риск** — вероятность потерь из-за ошибок в процессах, действий сотрудников, сбоев систем или внешних событий. Например, сбой платёжной системы может задержать перевод и привести к потерям.'};
  }
  const profileStep = `${runId}-profile`;
  const methodStep = `${runId}-method`;
  const risksStep = `${runId}-risks`;
  const requestRisks = (delay?: number) => add('toolCall', {id:risksStep, callId:'risks', tool:'get_company_risks', source:'Реестр рисков', args:{company_id:'demo-company', risk_type:'operational', limit:10}}, delay);
  const finishRisks = (delay?: number) => add('toolResult', {callId:'risks', tool:'get_company_risks', source:'Реестр рисков', result:{items:[{name:'Сбой поставок', level:'Высокий'}, {name:'Простой оборудования', level:'Средний'}], total:2}}, delay);
  // Keep the wording and timing of the three reference scenarios in sync with design-fixes.
  if (scenario !== 'rich' && scenario !== 'registration') {
    explain(scenario === 'parallel'
      ? 'Чтобы оценить риски, нужно понимать, чем живёт компания, и что по ней уже зарегистрировано. Профиль и реестр друг от друга не зависят, поэтому запрошу оба источника сразу, чтобы не ждать дважды.'
      : scenario === 'subagent' ? 'Пользователь просит оценить риск сбоя поставок. Уточню, от каких поставок зависит работа компании.'
      : scenario === 'empty' ? 'Пользователь спрашивает о новом направлении. Уточню профиль компании, чтобы проверить реестр в контексте её деятельности.'
      : scenario === 'error' ? 'Пользователь просит продолжить проверку при сбое. Начну с профиля компании и соберу данные, которые доступны.'
      : 'Пользователь спрашивает про операционные риски компании. Чтобы ответ был предметным, сначала нужно понять, чем компания занимается, где у неё площадки и какие процессы для неё ключевые. Начну с профиля.', profileStep);
    add('toolCall', {id:profileStep, callId:'profile', tool:'get_company_profile', source:'Данные компании', args:{company_id:'demo-company', sections:['activities', 'operations']}});
    if (scenario === 'parallel') requestRisks(50);
    add('toolResult', {callId:'profile', tool:'get_company_profile', source:'Данные компании', result:{company:'Промтех', industry:'Производство', locations:3, key_process:'Поставки комплектующих'}}, usesReferenceFlow(scenario) ? undefined : 1400);
    if (scenario === 'parallel') finishRisks(1500);

    explain(scenario === 'subagent'
      ? 'Поставки комплектующих — ключевой процесс. Попрошу методолога подобрать критерии оценки сбоя и меры, снижающие зависимость от поставщика.'
      : scenario === 'parallel'
        ? 'Профиль и реестр получены: ключевой процесс — поставки комплектующих, в реестре два операционных риска. Осталось понять, как их правильно оценить, — это вопрос к методологу.'
        : scenario === 'empty' ? 'Даже если записей нет, направление можно оценить. Уточню у методолога, какие критерии применить.'
        : scenario === 'error' ? 'Профиль доступен. Уточню критерии оценки у методолога, чтобы дать предварительную рекомендацию и при неполных данных.'
        : 'Профиль показывает, что ключевой процесс — поставки комплектующих, а площадок три. Чтобы оценивать риски не на глаз, нужны критерии из методологии: вероятность, влияние и действующие контроли.', methodStep);
    if (scenario === 'subagent') {
      add('delegation', {id:methodStep, callId:'expert', tool:'task', label:'Подключаю методолога…', source:'Методолог', args:{subagent_type:'methodologist', description:'Оценить риск сбоя поставок по методологии'}});
      add('message', {parentCallId:'expert', text:'Проверю критерии оценки и необходимые меры контроля.'});
      add('toolCall', {parentCallId:'expert', callId:'method', tool:'ask_methodologist', source:'Методолог', args:{query:'Критерии риска сбоя поставок', company_id:'demo-company'}});
      add('toolResult', {parentCallId:'expert', callId:'method', tool:'ask_methodologist', source:'Методолог', result:{criteria:['Вероятность', 'Влияние', 'Действующие контроли'], recommendations:['Резервный поставщик', 'Контроль критичных запасов']}});
      add('handback', {parentCallId:'expert', callId:'expert', text:'Методолог завершил проверку и вернул рекомендации супервизору.', result:{assessment:'Оценить концентрацию поставщиков', controls:2}});
    } else {
      add('toolCall', {id:methodStep, callId:'method', tool:'ask_methodologist', source:'Методолог', args:{query:'Оценка операционных рисков компании'}});
      add('toolResult', {callId:'method', tool:'ask_methodologist', source:'Методолог', result:{criteria:['Вероятность', 'Влияние'], controls:['Резервный поставщик', 'Мониторинг сроков']}}, usesReferenceFlow(scenario) ? undefined : 1400);
    }
    if (scenario === 'parallel') {
      explain('Все три источника ответили, картина сходится. Формирую ответ с конкретными шагами.');
      return {events, backendSteps, answer: '**Проверка завершена.** Профиль и реестр запрошены одновременно; в реестре найдено два операционных риска: сбой поставок и простой оборудования.\n\nПо методологии начните с концентрации поставщиков и контроля критичных запасов.'};
    }

    explain(scenario === 'subagent' ? 'Методолог предложил проверить концентрацию поставщиков и запас комплектующих. Уточню, зарегистрирован ли риск сбоя поставок.'
      : scenario === 'empty' ? 'Проверю записи по новому направлению. Отсутствие записей не подтверждает отсутствие рисков.'
      : scenario === 'error' ? 'Проверю зарегистрированные риски. Если реестр не ответит, укажу, какие сведения остались неподтверждёнными.'
      : 'Критерии оценки есть. Теперь важно не изобретать риски заново, а посмотреть, что по компании уже зарегистрировано в реестре, и сравнить это с тем, что видно по профилю.', risksStep);
    requestRisks();
    if (scenario === 'error') add('error', {callId:'risks', tool:'get_company_risks', source:'Реестр рисков', text:'Источник не ответил. Продолжу по доступным данным; сведения реестра не подтверждены.', result:{code:'SOURCE_TIMEOUT', retryable:true}});
    else if (scenario === 'empty') add('empty', {callId:'risks', tool:'get_company_risks', source:'Реестр рисков', text:'По заданным условиям записей нет. Это не означает отсутствие риска.', result:{items:[], total:0}});
    else finishRisks();
  }
  if (scenario === 'normal') {
    const lawsStep = `${runId}-laws`;
    explain('В реестре два риска: сбой поставок и простой оборудования. Прежде чем советовать меры, проверю, какие требования законов к управлению операционным риском касаются компании.', lawsStep);
    add('toolCall', {id:lawsStep, callId:'laws', tool:'get_company_laws', source:'Законы', args:{question:'Требования к управлению операционным риском'}});
    add('toolResult', {callId:'laws', tool:'get_company_laws', source:'Законы', result:{items:[{title:'Положение об управлении операционным риском'}]}});
  }
  if (scenario === 'registration') {
    const formStep = `${runId}-form`;
    explain('Пользователь хочет зарегистрировать событие, но ещё не описал его. Подготовлю форму, где можно указать дату, обстоятельства и последствия.', formStep);
    add('toolCall', {id:formStep, callId:'form', tool:'get_incident_form', source:'Регистрация события', args:{company_id:'demo-company'}});
    add('toolResult', {callId:'form', tool:'get_incident_form', source:'Регистрация события', result:{fields:['Описание', 'Дата', 'Потери']}});
  }
  if (scenario === 'rich') {
    const financeStep = `${runId}-finance`;
    explain('Пользователь просит сравнить потери по месяцам. Запрошу у аналитика прямые и косвенные потери за один период.', financeStep);
    add('toolCall', {id:financeStep, callId:'finance', tool:'get_company_fin_indicators', source:'Финансовые показатели', args:{company_id:'demo-company', period:'2025-01/2025-04'}});
    add('toolResult', {callId:'finance', tool:'get_company_fin_indicators', source:'Финансовые показатели', result:chart.data});
  }
  if (scenario !== 'registration') explain(scenario === 'error' ? 'Реестр не ответил. Отделю предварительные рекомендации по профилю и методологии от сведений, которые нужно перепроверить.'
    : scenario === 'empty' ? 'Записей по направлению нет. Объясню, какие процессы и меры контроля можно оценить до появления данных.'
    : scenario === 'subagent' ? 'Риск сбоя поставок есть в реестре. Сопоставлю запись с рекомендациями методолога и выделю первые меры контроля.'
    : scenario === 'rich' ? 'Сравню месячные суммы и выделю пик. Для таблицы, графика и отчёта использую один набор данных.'
    : 'Данных достаточно: профиль, критерии и риски из реестра сходятся. Формирую ответ с конкретными шагами.');
  const answer = scenario === 'rich' ? 'Вот потери по месяцам, в тыс. ₽.\n\n| Месяц | Прямые потери | Косвенные потери |\n| --- | ---: | ---: |\n| Январь | 410 | 415 |\n| Февраль | 400 | 810 |\n| Март | 210 | 180 |\n| Апрель | 190 | 540 |\n\nСамые высокие совокупные потери — в феврале. Рекомендую проверить причины отклонения и действующие контроли.'
    : scenario === 'registration' ? '**Событие можно зарегистрировать в НОРМ.** Нажмите «Открыть форму» и укажите, что произошло, когда это случилось и какие последствия известны.'
    : scenario === 'error' ? '**Реестр рисков сейчас недоступен.** Проверка частичная: профиль компании и методология получены, данные реестра не подтверждены.\n\nПредварительно стоит проверить зависимость от ключевого поставщика и план восстановления. Повторите обращение к реестру перед итоговой оценкой.'
    : scenario === 'empty' ? '**В реестре нет записей по заданным условиям.** Это не подтверждает отсутствие рисков.\n\nПо профилю и методологии стоит уточнить границы нового процесса и проверить зависимость от поставщиков.'
    : scenario === 'subagent' ? '**Методолог завершил проверку.** Для оценки риска сбоя поставок нужны вероятность, влияние и действующие контроли.\n\n1. Проверьте концентрацию поставщиков.\n2. Уточните запас критичных комплектующих.\n3. Назначьте владельца резервного плана.\n\nРеестр содержит два релевантных риска. Подробности работы эксперта доступны выше.'
    : '**Проверка завершена.** В реестре найдено два операционных риска: сбой поставок и простой оборудования.\n\nРекомендую начать с резервного поставщика и контроля критичных запасов. Оценку вероятности и влияния следует уточнить с владельцами процессов.';
  return {events, backendSteps, answer};
}
