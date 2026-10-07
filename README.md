# НОРМ — продуктовый frontend чата

Это исходный Single-SPA микрофронтенд `@n-orm/chat-mf-app` на React, TypeScript и Reatom. Он содержит согласованный UI Universal Agent внутри продуктового чата. В этой ветке нет отдельного demo-приложения и mock-провайдеров пилота. Прототип сохранён в ветке `main`.

## Сборка и запуск

Нужны Node.js 18+ и доступ к пакетам `@sber-orm/*` во внутреннем npm-реестре. `.npmrc` содержит адрес реестра без учётных данных. Доступ к нему настраивается в окружении разработчика или CI.

```bash
npm ci
npm run lint:ts
npm run lint
npm test
npm run build
```

Для разработки в составе платформы используется `npm run dev`. Микрофронтенд экспортируется из `src/chat-mf-app.ts`; хост предоставляет внешние зависимости, перечисленные в `vite.config.ts`, включая UI Kit, компоненты платформы и auth-модуль. Отдельная страница GitHub Pages для этой ветки не предусмотрена: микрофронтенд работает внутри НОРМ.

## Включение Universal Agent

Настройки задаёт хост через `window`:

| Переменная | Назначение |
| --- | --- |
| `SBERORM_CHAT_WEBSOCKET_URL` | STOMP/WebSocket endpoint продукта |
| `SBERORM_CHAT_LOAD_LIMIT` | Размер страницы истории |
| `SBERORM_CHAT_THREADS_API_URL` | URL коллекции HTTP API диалогов |
| `FF_UNIVERSAL_AGENT_ENABLED` | Live `AgentActivity` и потоковый ответ |
| `FF_CHAT_THREADS_ENABLED` | Список диалогов и история по thread |
| `FF_CHAT_ASSISTANT_SKILLS_ENABLED` | Выбор навыка в composer |
| `FF_CHAT_ATTACHMENTS_ENABLED` | Существующий механизм вложений |

Новые флаги по умолчанию выключены. После предоставления контрактов из [BACKEND_CONTRACT.md](BACKEND_CONTRACT.md) включайте их по пилотной группе. Когда флаг диалогов включён, frontend использует HTTP-адаптер по `SBERORM_CHAT_THREADS_API_URL`; при необходимости хост может передать собственную реализацию через экспорт `configureThreadRepository`.

Продуктовые возможности файлов, feedback, графиков, таблиц, пагинации истории, offline/reconnect, permissions и переходов в формы остаются в `src`. Кнопка «Открыть форму» показывается только в контексте `createIncident`.

## Граница готовности

Frontend содержит состояние, transport adapter, HTTP-клиент диалогов и UI. Сервер Universal Agent и реализация согласованного протокола в этом репозитории отсутствуют. Реальная сквозная работа требует backend и проверки в хосте НОРМ. Корневая сборка зависит от внутреннего npm-реестра и внешних модулей платформы.
