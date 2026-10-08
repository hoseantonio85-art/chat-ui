# Совместимость с UI Kit

Проверено 8 октября 2026 года по переданным npm-пакетам:

| Пакет host-приложения | Проверенная версия |
| --- | --- |
| `@sber-orm/ui-kit` | `0.307.0` |
| `@sber-orm/components` | `0.269.0` |

Чат собирается как Single-SPA микрофронтенд. Оба пакета перечислены во `vite.config.ts` как external dependencies, поэтому их фактическую runtime-версию задаёт оболочка НОРМ. Для запуска этого frontend host должен предоставить указанные версии или совместимые более новые версии.

Проверка деклараций новых пакетов прошла без ошибок. В них присутствуют все используемые экспортируемые компоненты и API: `Button`, `ButtonUploader`, `FileItem`, `Icon`, `MarkdownViewer`, `Row`, `ScrollBar`, `Text`, `Title`, `Tooltip`, `notification`, `ClickStreamProvider`, `Portal`, `useTracking`, `validatorsSchema`, `IFileProps` и `IFileAttach`.

Также подтверждены все используемые значения `EIconName`: `arrowUp`, `check`, `chevronFillDown`, `chevronFillUp`, `clock`, `edit`, `errorRounded`, `fileAdd`, `fill`, `kebabMenu`, `message`, `pin`, `pinOff`, `success`, `taskList`, `taskSearch`, `trash`, `users`, `userSwap` и `warningRounded`.

## Что обновляется в корпоративном репозитории

1. В import map или dependency-конфигурации оболочки НОРМ выставляются `@sber-orm/ui-kit@0.307.0` и `@sber-orm/components@0.269.0`.
2. В chat repo обновляются `@sber-orm/types__ui-kit` и `@sber-orm/types__components` до версий типов, выпущенных вместе с этими runtime-пакетами.
3. Lockfile обновляется штатным `npm install` через Nexus; затем выполняются `npm run lint:ts`, `npm run lint`, `npm test` и `npm run build`.

Переданные runtime-пакеты не содержат номера соответствующих `types__*` релизов. Поэтому версии type-пакетов в `package.json` пока сохранены: подстановка предполагаемого номера сделала бы `npm ci` невоспроизводимым. Альтернатива после согласования с владельцами UI Kit — использовать сами runtime-пакеты как devDependencies для типизации и убрать отдельные `types__*` mappings из `tsconfig.app.json`.
