# Контракт подключения Universal Agent

Это ожидаемый frontend-протокол для пилота. Если backend использует другой формат, преобразование должно жить в `src/services/universalAgent/adapter.ts` или в `ThreadRepository`, а не в компонентах UI.

## Диалоги: HTTP

Коллекция задаётся `window.SBERORM_CHAT_THREADS_API_URL`. Клиент посылает cookie (`credentials: include`), заголовок `X-Sber-Auth-Session` при наличии и `tenantId` текущего tenant. Все ответы — JSON, кроме успешного удаления (`204`).

| Запрос | Ответ |
| --- | --- |
| `GET {baseUrl}` | `ChatThread[]` |
| `GET {baseUrl}/{threadId}` | `ThreadSnapshot` |
| `POST {baseUrl}` с `{title, initialSkill?}` | `ThreadSnapshot` |
| `PATCH {baseUrl}/{threadId}` с `{title}` | `ChatThread` |
| `PATCH {baseUrl}/{threadId}` с `{pinned}` | `ChatThread` |
| `DELETE {baseUrl}/{threadId}` | `204` |

`ChatThread`: `{id: string, title: string, pinned: boolean, updatedAt: number, initialSkill?: string}`. `updatedAt` — Unix timestamp в миллисекундах.

`ThreadSnapshot`: `{thread, messages, agentRuns, canLoadHistory}`. `messages` используют существующий формат `IMessage`; `agentRuns` — словарь `assistantMessageId → AgentRun`. Допускается также сериализованный run в `message.extras.agentRun`. Данные trace сохраняются на сервере и возвращаются при повторном открытии диалога. Новый пустой диалог возвращает `messages: []`, `agentRuns: {}`, `canLoadHistory: false`.

## Сообщения и события: существующий STOMP канал

Исходящий запрос остаётся на `/app/chat`. В `extras` frontend передаёт `threadId`, `assistantMessageId`, `agentRunId`, а при выборе навыка — `skill` и `skillTitle`. Существующие `fileIds` и product context сохраняются. Backend связывает ответ с исходным `id` пользователя через `requestId`.

Входящие события приходят через существующую пользовательскую подписку `/user/{userId}/tenant/{tenantId}/chat` (без tenant — `/user/{userId}/chat`). Для режима диалогов **каждый** входящий event и final message содержит `threadId`; frontend не отображает события другого или неопределённого диалога.

```json
{"type":"agent.run.started","payload":{"threadId":"thread-1","requestId":"request-1","assistantMessageId":"assistant-1","runId":"run-1","startedAt":1720000000000}}
```

Затем backend посылает `agent.run.event` с `{threadId, assistantMessageId, runId, event}`. `event` содержит `id`, `runId`, `at`, `kind` и поля конкретного шага: `callId`, `parentCallId`, `tool`, `source`, `label`, `text`, `args`, `result`, `todos`, `fatal`. Поддерживаемые `kind`: `thinking`, `message`, `plan`, `toolCall`, `toolResult`, `delegation`, `handback`, `error`, `empty`, `finish`. `args` и `result` сохраняют подробность trace.

### Текст для пользователя принадлежит backend

Текущий pilot использует вымышленные события, а frontend пока содержит справочник `tool → подпись`, подписи типов шагов и вычисление итогов по событиям. Это временное поведение **не является данными агента**. Для production-контракта backend/chat adapter должен передавать готовый для показа текст; frontend не должен угадывать его по `tool`, `kind` или содержимому результата.

- У каждого отображаемого шага backend передаёт `label` (заголовок) и, при необходимости, `text` (пояснение). Для текущей pill backend передаёт `activity` — действие в настоящем времени. Например, `tool: "get_company_risks"` остаётся машинным полем, а `label: "Проверяю реестр рисков"` и `source: "Реестр рисков"` задаёт backend.
- Для плана backend передаёт текст каждого пункта и готовую подпись его состояния (`statusLabel`). Машинные `write_todos`, `pending`, `in_progress`, `completed` нужны для связывания событий, а не как пользовательский текст.
- Для итогового блока backend передаёт `summaryText` и `sources` с готовыми именами, подписями состояний и количеством обращений. Frontend не должен выводить итог по собственной карте инструментов или вычислять источники из tool calls.
- Если этих полей нет, frontend может показывать только нейтральное состояние ожидания и полученный финальный ответ; он не должен создавать якобы агентские действия. Технические идентификаторы не выводятся в пользовательском trace по умолчанию.

**Кому что сделать.** Бэкенд Universal Agent отвечает за смысл и готовые русскоязычные формулировки; там уже есть `api/norm_chat.py:STEP_LABELS` для шагов финального callback. Чат-бэкенд передаёт их без переписывания в текущий STOMP-канал и сохраняет вместе с run. Frontend отвечает за отображение и доступность, но не придумывает действия или статусы по именам инструментов. Нейтральная pill «Готовлю ответ…» до первого события — состояние самого интерфейса, а не утверждение о работе агента.

Пример одного события целевого контракта (поля `activity` и остальные пользовательские тексты сейчас ещё не поддержаны текущим `/ainvoke`):

```json
{"type":"agent.run.event","payload":{"threadId":"thread-1","assistantMessageId":"assistant-1","runId":"run-1","event":{"id":"event-1","runId":"run-1","at":1720000001000,"kind":"toolCall","callId":"call-1","tool":"get_company_risks","source":"Реестр рисков","label":"Проверка реестра рисков","activity":"Сверяю данные с реестром рисков…"}}}
```

Для `toolResult`, `empty` и `error` backend присылает отдельные безопасные для пользователя `label`/`text` и итоговый статус источника; сырые исключения и ответы инструментов не становятся текстом UI. Для `delegation` и `handback` он подписывает эксперта и результат его работы. Для `plan` передаёт пункты, машинный статус и `statusLabel` каждого пункта. `thinking` показывается только при наличии разрешённого для пользователя текста от backend: если модель или backend его не дали, frontend его не сочиняет.

После завершения backend передаёт `summaryText` и `sources` (имя, машинный статус, `statusLabel`, число обращений); тот же набор сохраняется в snapshot истории. Если потоковой передачи нет, но trace собран, его можно прислать одним snapshot после ответа. Если trace не собран, остаётся только финальный ответ без раскрываемого блока. Наличие потоковой модели само по себе не гарантирует наличие пользовательского текста рассуждений.

**Критерии приёмки текстов:** изменение технического имени tool не меняет пользовательскую подпись; пустой результат и ошибка источника различаются; live и восстановленный из истории run показывают одинаковые подписи; ни `write_todos`, ни `get_company_risks`, ни сырые args/results не появляются в обычном пользовательском отображении. Текущий frontend ещё использует временные справочники, поэтому после реализации backend-полей требуется отдельное обновление frontend adapter и удаление этих fallback-подписей.

Пока `/ainvoke` отправляет один callback после завершения прогона с уже подготовленными backend текстовыми шагами. Он **не** отправляет перечисленные структурированные поля для `AgentActivity`. Чат-бэкенд должен пробросить их в STOMP и сохранять в истории; после этого frontend удаляет временные справочники и вычисления из `AgentActivity/model.ts` и `AgentTrace.tsx`.

Текст ответа поступает как `assistant.message.delta` с `{threadId, requestId, assistantMessageId, runId?, delta, append?: true}`. Если backend назначает собственный `assistantMessageId`, он повторяет `requestId` или `runId` для сопоставления с pending-сообщением. Завершение — обычное `chat.message` с итоговым `IMessage`, `requestId` и `threadId` (в envelope или `extras`). Для восстановления истории backend возвращает `agent.run.snapshot` или `extras.agentRun` вместе с финальным сообщением. События одного run идут в порядке возникновения.

Пагинация через `/app/history` получает `extras.threadId` и `extras.loadLast`; очистка контекста через `/app/context` получает `threadId`. Reaction и файловые API сохраняют существующие контракты.

## Что проверить при подключении

1. Отправка и потоковый ответ в одном thread, включая reconnect и pending-send.
2. Переключение thread во время работы: событие старого thread не попадает в открытый диалог, а trace восстанавливается из snapshot.
3. Вложения, feedback, график, таблица и product action с новым агентом.
4. `createIncident`: открытие формы доступно только в нужном контексте.
5. Ошибка и пустой ответ отдельного источника отображаются в trace, финальный ответ остаётся корректным.

## До появления потокового контракта

Текущий Universal Agent отвечает в продуктовый чат через `/ainvoke` и финальный callback. В этом режиме frontend показывает обычное ожидание, сохраняет промежуточные служебные сообщения отдельно от итогового ответа и не создаёт пустой `AgentActivity`. Pill и подробный trace появляются только при реальных событиях прогона или сохранённом snapshot. Объект `extras.chart` сохраняется транспортным адаптером как JSON-строка и проверяется перед показом графика.

Текущий system-only отказ агента пока распознаётся по его точному тексту, поскольку callback не несёт признака завершения. Чат-бэкенду нужен явный terminal marker для ошибки и признак промежуточного callback; после их появления текстовую совместимость следует убрать.
