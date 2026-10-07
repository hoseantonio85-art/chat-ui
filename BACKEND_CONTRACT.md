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

Текст ответа поступает как `assistant.message.delta` с `{threadId, requestId, assistantMessageId, runId?, delta, append?: true}`. Если backend назначает собственный `assistantMessageId`, он повторяет `requestId` или `runId` для сопоставления с pending-сообщением. Завершение — обычное `chat.message` с итоговым `IMessage`, `requestId` и `threadId` (в envelope или `extras`). Для восстановления истории backend возвращает `agent.run.snapshot` или `extras.agentRun` вместе с финальным сообщением. События одного run идут в порядке возникновения.

Пагинация через `/app/history` получает `extras.threadId` и `extras.loadLast`; очистка контекста через `/app/context` получает `threadId`. Reaction и файловые API сохраняют существующие контракты.

## Что проверить при подключении

1. Отправка и потоковый ответ в одном thread, включая reconnect и pending-send.
2. Переключение thread во время работы: событие старого thread не попадает в открытый диалог, а trace восстанавливается из snapshot.
3. Вложения, feedback, график, таблица и product action с новым агентом.
4. `createIncident`: открытие формы доступно только в нужном контексте.
5. Ошибка и пустой ответ отдельного источника отображаются в trace, финальный ответ остаётся корректным.
