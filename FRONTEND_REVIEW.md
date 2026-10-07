# Проверка продуктового frontend — 2026-10-07

## Вердикт
FIXED — исправлены обнаруженные ошибки transport/state и конфигурации сборки. Это не подтверждение готовности к production: полная сборка и работа в хосте НОРМ здесь не проверены.

## Scope
Проверены STOMP transport, адаптер событий, HTTP repository диалогов, stores сообщений/trace/диалогов, provider диалогов, composer, feature flags, entrypoint и настройки сборки. Согласованный дизайн не менялся. Generated OpenAPI, прототип в main и зависимости не изменялись.

## Findings и исправления
| Важность | Область | Исправление |
|---|---|---|
| High | vite.config.ts | В клиент больше не подставляется весь process.env; явно оставлен NODE_ENV. BASE_PREFIX_URL используется только для настройки сборки. |
| High | Chat.reconnect / threads / provider | При смене tenant очищаются очередь, сообщения, trace, threads, skill, контекст и вложения. Старые socket callbacks и результаты HTTP-операций не применяются к новой области состояния. |
| Major | Chat.applyInboundUpdate | User echo не заменяет pending assistant; повторный final не создаёт дубликат; завершение снимает loading. |
| Major | AgentRun store | Повторный start того же run не стирает trace и не открывает завершённый run заново. |
| Major | Feedback / history | Для реакции и курсора истории используется backendMessageId, а локальный ID остаётся стабильным для UI. |
| Major | Pagination / adapter | lastMessage=false не отключает историю. Boolean extras нормализуются в строки; неподдерживаемые объекты не проходят в string/null domain contract. |
| Major | Product actions | createIncident обрабатывается и при замене pending turn; replay не повторяет переход. Текущий ответ не считается историей только потому, что одновременно загружается история. |
| Major | Connection lifecycle | Offline-клиент деактивируется вместе с попытками reconnect. Отписка использует subscription handle. |
| Major | Message store | Удаление работает по объекту store; сортировка и вставка не изменяют ранее выданные массивы. |
| Major | Thread UI state | Сброс сообщений снимает loading. Удаление активного диалога очищает выбранный skill и возможность загрузки истории. Composer заблокирован во время thread operation. |
| Major | Feature flags / logging | Отключённый Universal Agent не принимает agent updates. Ошибки парсинга не выводят содержимое серверного сообщения в консоль. |

## Проверки
| Проверка | Результат | Ограничение |
|---|---|---|
| Vitest: chat transport, adapter, routing, HTTP repository, AgentRun store/model | Passed: 6 файлов, 38 тестов | Изолированный временный config и локально кешированные публичные зависимости. Внешние модули платформы заменены только в unit tests. |
| git diff --check | Passed | Проверка diff. |
| npm run lint:ts | Blocked | В неполной корневой установке не найден tsc. Внутренний tsconfig-пакет также недоступен локально. |
| Полный npm test / build / Biome | Skipped | Требуются полная установка зависимостей и доступ к Nexus. |
| UI в хосте НОРМ и настоящий backend | Skipped | Требуется корпоративная среда и реализация BACKEND_CONTRACT.md. |

## Перед интеграцией
В среде с Nexus выполнить npm ci, npm run lint:ts, npm run lint, npm test и npm run build. Затем проверить в хосте переключение tenant/thread во время запроса, reconnect, files, feedback, историю с trace и createIncident. Настоящий backend не заменялся mock-реализацией.
