import type { AgentEvent } from '../src/components/AgentActivity/model';
import type { IChartData } from '../src/components/UniversalChart/types';
export const scenarios = [
  {id: 'vndBackground', title: 'ВНД · проверка в фоне', question: 'Проверь ВНД на соответствие стандартам группы.'},
  {id: 'vnd', title: 'ВНД · сам пишу в чат', question: 'Проверь ВНД на соответствие стандартам группы.'},
  {id: 'vndWelcome', title: 'ВНД · пришёл по кнопке', question: 'Проверь ВНД на соответствие стандартам группы.'},
  {id: 'csiProactive', title: 'CSI · после проверки ВНД', question: 'Оценить завершённую проверку ВНД.'},
  {id: 'csiDirect', title: 'CSI · пользователь, сервис известен', question: 'Хочу оценить сервис проверки ВНД.'},
  {id: 'csiDirectUnknown', title: 'CSI · сначала уточнить сервис', question: 'Хочу оценить сервис.'},
  {id: 'csiError', title: 'CSI · ошибка демо-сохранения', question: 'Оценить проверку ВНД и показать ошибку сохранения.'},
  {id: 'feedbackComplaint', title: 'ОС · явная жалоба', question: 'Невозможно найти результат после проверки.'},
  {id: 'feedbackComplaintClarify', title: 'ОС · жалоба, сервис неизвестен', question: 'После возврата всё сбросилось.'},
  {id: 'feedbackHelp', title: 'ОС · запрос помощи, не жалоба', question: 'Помогите найти результат проверки.'},
  {id: 'feedbackIdea', title: 'ОС · идея', question: 'Добавьте фильтр по статусу проверки.'},
  {id: 'feedbackIdeaClarify', title: 'ОС · идея, сервис неизвестен', question: 'Добавьте быстрый фильтр.'},
  {id: 'feedbackPraise', title: 'ОС · благодарность', question: 'Проверка стала очень удобной.'},
  {id: 'feedbackError', title: 'ОС · ошибка демо-сохранения', question: 'Фильтр сбрасывается после возврата назад.'},
  {id: 'normal', title: 'Обычная проверка', question: 'Проверь операционные риски компании и подскажи, на что обратить внимание.'},
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

export const vndStandardPrompt = `Документ загружен. С каким групповым документом его нужно сверить? Отправьте номер выбранного варианта.

1. Методика сбора данных об инцидентах операционного риска
2. Регламент сбора данных об инцидентах операционного риска
3. Политика по управлению операционным риском
4. Общий стандарт по организации системы управления операционными рисками в компаниях с участием ПАО Сбербанк`;

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
  metadata: {title: 'Потери по месяцам · демонстрационные данные', view: 'barChart', categories: ['Январь', 'Февраль', 'Март', 'Апрель'], series: ['Прямые', 'Косвенные'], colors: {Прямые: '#a0d7f3', Косвенные: '#d5bbff'}, units: {y: 'тыс. ₽'}},
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
    return {events, backendSteps, answer: '**Демонстрационный итоговый ответ.** Его содержание в настоящем запросе генерирует модель; фиксированных текстов ответа в бэкенде нет.'};
  }
  let at = start;
  const add = (kind: AgentEvent['kind'], data: Partial<AgentEvent> = {}, delay = 700) => {
    at += delay;
    events.push({id: `${runId}-${events.length}`, runId, at, kind, ...data});
  };
  const explain = (text: string, stepId?: string) => {
    const fragments = text.match(/\S+(?:\s+\S+)?\s*/g) ?? [];
    fragments.forEach((fragment, index) => add('thinking', {progressDelta: {stepId, text: fragment}}, index ? 300 : 700));
  };
  const profileStep = `${runId}-profile`;
  explain(scenario === 'normal'
    ? 'Профиль покажет, какие процессы учесть при оценке рисков. Одновременно уточню у методолога критерии оценки.'
    : 'Начну с профиля компании. Он покажет, какие процессы учесть при оценке рисков.', profileStep);
  add('toolCall', {id:profileStep, callId:'profile', tool:'get_company_profile', source:'Данные компании', args:{company_id:'demo-company', sections:['activities', 'operations']}});
  const finishProfile = (delay = 1400) => add('toolResult', {callId:'profile', tool:'get_company_profile', source:'Данные компании', result:{company:'Демо-компания', industry:'Производство', locations:3, key_process:'Поставки комплектующих'}}, delay);
  if (scenario !== 'normal') finishProfile();
  const methodStep = `${runId}-method`;
  if (scenario === 'subagent') {
    explain('Ключевой процесс компании — поставки комплектующих. Поручу методологу проверить, как оценить риск сбоя поставок.', methodStep);
    add('delegation', {id:methodStep, callId:'expert', tool:'task', label:'Подключаю методолога…', source:'Методолог', args:{subagent_type:'methodologist', description:'Оценить риск сбоя поставок по методологии'}});
    add('message', {parentCallId:'expert', text:'Проверю критерии оценки и необходимые меры контроля.'});
    add('toolCall', {parentCallId:'expert', callId:'method', tool:'ask_methodologist', source:'Методолог', args:{query:'Критерии риска сбоя поставок', company_id:'demo-company'}});
    add('toolResult', {parentCallId:'expert', callId:'method', tool:'ask_methodologist', source:'Методолог', result:{criteria:['Вероятность', 'Влияние', 'Действующие контроли'], recommendations:['Резервный поставщик', 'Контроль критичных запасов']}});
    add('handback', {parentCallId:'expert', callId:'expert', text:'Методолог завершил проверку и вернул рекомендации супервизору.', result:{assessment:'Оценить концентрацию поставщиков', controls:2}});
  } else {
    if (scenario !== 'normal') explain('Уточню, какие критерии применять при оценке рисков компании.', methodStep);
    add('toolCall', {id:methodStep, callId:'method', tool:'ask_methodologist', source:'Методолог', args:{query:'Оценка операционных рисков компании'}});
    if (scenario === 'normal') finishProfile(1100);
    add('toolResult', {callId:'method', tool:'ask_methodologist', source:'Методолог', result:{criteria:['Вероятность', 'Влияние'], controls:['Резервный поставщик', 'Мониторинг сроков']}}, 1400);
  }
  const risksStep = `${runId}-risks`;
  explain('Профиль и критерии получены. Теперь сверю их с рисками, уже зарегистрированными в реестре.', risksStep);
  add('toolCall', {id:risksStep, callId:'risks', tool:'get_company_risks', source:'Реестр рисков', args:{company_id:'demo-company', risk_type:'operational', limit:10}});
  if (scenario === 'error') add('error', {callId:'risks', tool:'get_company_risks', source:'Реестр рисков', text:'Источник не ответил. Продолжу по доступным данным; сведения реестра не подтверждены.', result:{code:'SOURCE_TIMEOUT', retryable:true}});
  else if (scenario === 'empty') add('empty', {callId:'risks', tool:'get_company_risks', source:'Реестр рисков', text:'По заданным условиям записей нет. Это не означает отсутствие риска.', result:{items:[], total:0}});
  else add('toolResult', {callId:'risks', tool:'get_company_risks', source:'Реестр рисков', result:{items:[{name:'Сбой поставок', level:'Высокий'}, {name:'Простой оборудования', level:'Средний'}], total:2}});
  if (scenario === 'rich') {
    const financeStep = `${runId}-finance`;
    explain('Для таблицы и графика запрошу у аналитика данные о потерях по месяцам.', financeStep);
    add('toolCall', {id:financeStep, callId:'finance', tool:'get_company_fin_indicators', source:'Финансовые показатели', args:{company_id:'demo-company', period:'2025-Q1-Q2'}});
    add('toolResult', {callId:'finance', tool:'get_company_fin_indicators', source:'Финансовые показатели', result:chart.data});
  }
  explain(scenario === 'error' ? 'Собираю выводы по доступным источникам. Отмечу, что сведения реестра не подтверждены.'
    : scenario === 'empty' ? 'Учитываю, что в реестре нет записей по заданным условиям.'
    : 'Собираю выводы и добавляю меры контроля для найденных рисков.');
  const answer = scenario === 'rich' ? 'Вот потери по месяцам. Все значения демонстрационные, в тыс. ₽.\n\n| Месяц | Прямые потери | Косвенные потери |\n| --- | ---: | ---: |\n| Январь | 410 | 415 |\n| Февраль | 400 | 810 |\n| Март | 210 | 180 |\n| Апрель | 190 | 490 |\n\nСамые высокие совокупные потери — в феврале. Рекомендую проверить причины отклонения и действующие контроли.'
    : scenario === 'registration' ? '**Событие можно зарегистрировать в НОРМ.** Я подготовил контекст по компании и помогу перенести его в форму. Кнопка «Открыть форму» доступна только в этом диалоге.'
    : scenario === 'ordinary' ? '**Операционный риск** — вероятность потерь из-за ошибок процессов, людей, систем или внешних событий. Для первичной оценки определите причину, последствия, вероятность и действующие меры контроля.'
    : scenario === 'error' ? '**Реестр рисков сейчас недоступен.** Проверка частичная: профиль компании и методология получены, данные реестра не подтверждены.\n\nПредварительно стоит проверить зависимость от ключевого поставщика и план восстановления. Повторите обращение к реестру перед итоговой оценкой.'
    : scenario === 'empty' ? '**В реестре нет записей по заданным условиям.** Это не подтверждает отсутствие рисков.\n\nПо профилю и методологии стоит уточнить границы нового процесса и проверить зависимость от поставщиков. При необходимости откройте форму регистрации события в НОРМ.'
    : scenario === 'subagent' ? '**Методолог завершил проверку.** Для оценки риска сбоя поставок нужны вероятность, влияние и действующие контроли.\n\n1. Проверьте концентрацию поставщиков.\n2. Уточните запас критичных комплектующих.\n3. Назначьте владельца резервного плана.\n\nРеестр содержит два релевантных риска. Подробности работы эксперта доступны выше.'
    : '**Проверка завершена.** В демонстрационном реестре найдено два операционных риска: сбой поставок и простой оборудования.\n\nРекомендую начать с резервного поставщика и контроля критичных запасов. Оценку вероятности и влияния следует уточнить с владельцами процессов.\n\nИсточники: данные компании, методолог и реестр рисков.';
  return {events, backendSteps, answer};
}
