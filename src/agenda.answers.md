# Frontend Interview — Middle+ / Senior (60-90 min)

---

## Block 1. General Questions (10-15 min)

### 1.1 Architecture decisions [middle+]

**Q:** Ты приходишь на существующий проект и тебе поручают его вести - как ты решаешь — переписывать с нуля или оставить существующую версию и обновлять инкрементально?

**Expected:** Сбор требований и ограничений, оценка edge cases, оценка сложности и времени, согласование с бизнесом, знает ли команда стек. Переписывать только если поддержка дороже в долгосрочной перспективе. Упомянуть strangler fig pattern, инкрементальную миграцию.

### 1.2 Build tools [middle+]

**Q:** Какие бандлеры использовал? Webpack vs Vite vs Rspack — в чём разница и trade-offs?

**Expected:** Webpack — зрелый, богатая экосистема плагинов, сложный конфиг. Vite — быстрый dev через нативный ESM + esbuild, Rollup для прода. Rspack — на Rust, совместим с Webpack, быстрые сборки. Упомянуть tree-shaking, code splitting, lazy loading (`React.lazy`, динамический `import()`).

### 1.3 CI/CD [middle+]

**Q:** Настраивал ли CI/CD? Какие шаги включает твой пайплайн?

**Expected:** Линтинг, проверка типов, unit/integration тесты, сборка, деплой (staging → prod). Упомянуть GitHub Actions / GitLab CI / Jenkins. Preview-деплои, кеширование зависимостей.

### 1.4 Environment variables без ребилда [middle+]

**Q:** Как подменить env-переменные на фронте без пересборки приложения?

**Expected:** На этапе сборки (Vite/Webpack) env инлайнятся в бандл — после билда их уже не поменять. Варианты без ребилда: 1) runtime-конфиг — отдельный `config.js` / `env.js`, который подгружается через `<script>` до запуска приложения и кладёт значения в `window.__ENV__`. 2) Серверная подстановка — nginx/entrypoint-скрипт в Docker заменяет плейсхолдеры (`__API_URL__`) в собранных файлах при старте контейнера. 3) API-эндпоинт `/config` — приложение запрашивает конфиг при инициализации. Упомянуть, почему `VITE_*` / `NEXT_PUBLIC_*` не подходят для runtime-подмены.

### 1.5 Testing [middle+]

**Q:** Какие типы тестов писал? Когда стоит покрывать тестами, а когда нет?

**Expected:** Unit (Vitest/Jest), integration (React Testing Library), e2e (Playwright/Cypress). Пирамида тестирования. Покрывать критичную бизнес-логику, пропускать быстро прототипируемый UI. Упомянуть TDD, плюсы/минусы snapshot-тестирования.

### 1.6 Project architecture [senior]

**Q:** Как ты организуешь код в большом / среднем проекте? Какие архитектурные подходы использовал?

**Expected:** Feature-sliced design, модульная архитектура, barrel exports. Разделение ответственности: UI / бизнес-логика / слой данных. Monorepo (Turborepo, Nx) vs polyrepo — trade-offs.

### 1.7 Monitoring & observability [senior]

**Q:** Как ты мониторишь фронтенд в продакшене? Как узнаёшь, что у пользователей что-то сломалось, до того как они напишут в поддержку? Использовал ли фича флаги Feature flags ?

**Expected:** Трекинг ошибок (Sentry) — автоматический сбор uncaught exceptions и unhandled rejections, группировка по stack trace, привязка к релизу через release/commit. Source maps — загружать в Sentry приватно, не отдавать клиенту. Метрики производительности: Core Web Vitals (LCP, INP, CLS) через web-vitals библиотеку или RUM-сервисы (Datadog RUM, New Relic Browser). Кастомные метрики — время загрузки критичных API-запросов, время до интерактивности конкретных фич. Алертинг — порог по error rate (например, >1% сессий с JS-ошибкой), деградация Web Vitals по перцентилям (p75, p95). Логирование — structured logs в консоль, которые агрегируются на бэкенде. Feature flags + мониторинг — связка для безопасного раскатывания фич с возможностью быстрого отката.

### 1.8 SOLID и GRASP / паттерны на фронте [senior]

**Q:** Как ты применяешь SOLID или GRASP на фронтенде? Приведи примеры.

**Expected:**

- **S (Single Responsibility):** компонент только рендерит, логика вынесена в хук или сервис. Пример: `UserList` только отображает список, `useUsers()` — загрузка и кеш.
- **O (Open/Closed):** расширение без правки кода — композиция (children, render props), конфиг (таблица колонок, маппинг полей). Пример: таблица принимает массив колонок с `render`, добавление колонки без изменения компонента таблицы.
- **L (Liskov):** подтипы подставляемы. Пример: все варианты кнопки (`Button`, `IconButton`) принимают те же базовые пропсы (onClick, disabled), не ломают контракт.
- **I (Interface Segregation):** узкие интерфейсы. Пример: не один «богоподобный» контекст со всем стейтом, а отдельные `ThemeContext`, `AuthContext` — компонент подписывается только на нужное.
- **D (Dependency Inversion):** зависимость от абстракций. Пример: компонент получает `fetchUsers: () => Promise<User[]>` через проп или контекст, а не импортирует конкретный API-модуль — проще тесты и подмена источника данных.
- **GRASP (Information Expert, Creator, Controller):** эксперт — данные рядом с теми, кто ими владеет (форма владеет полями → валидация в форме или рядом). Creator — фабрика/хук создаёт сущности (например, `useForm` создаёт объект формы). Controller — оркестрация в одном месте (страница/контейнер координирует данные и передаёт в презентационные компоненты).

---

## Block 2. Browser & Network (10-15 min, oral)

### 2.1 Authentication vs Authorization [middle+]

**Q:** В чём разница между аутентификацией и авторизацией?

**Expected:** Аутентификация — установление личности («кто ты?»): логин/пароль, OAuth, JWT, сессия. Авторизация — проверка прав доступа («что тебе разрешено?»): роли, permissions, проверка на бэкенде перед выполнением действия. На фронте храним токен/сессию, на бэкенде при каждом запросе проверяем и аутентификацию (валидный ли токен), и авторизацию (доступен ли ресурс этому пользователю).

### 2.2 Browser Storages [middle+]

**Q:** Какие способы хранения данных в браузере ты знаешь? В чём разница между ними и когда что использовать?

**Expected:** `localStorage` — синхронный, до 5-10 MB, данные сохраняются между сессиями, доступен только в рамках одного origin. `sessionStorage` — то же самое, но данные живут только в рамках вкладки/сессии. `cookies` — отправляются с каждым HTTP-запросом к серверу, ограничение ~4 KB, есть атрибуты `HttpOnly`, `Secure`, `SameSite`, `Expires`/`Max-Age`. `IndexedDB` — асинхронная NoSQL-база в браузере, большие объёмы данных (сотни MB), подходит для офлайн-приложений и кеширования. `Cache API` (Service Worker) — для кеширования HTTP-ответов, основа PWA и офлайн-стратегий.
`HttpOnly` — cookie недоступна из JS (`document.cookie`)

### 2.3 Rendering [middle+]

- Опиши Critical Rendering Path: DOM → CSSOM → Render Tree → Layout → Paint → Composite
- Reflow vs repaint — что вызывает каждый из них?
- **Expected:** Reflow = изменение геометрии (width, height, position). Repaint = визуальные изменения (color, shadow). Reflow дороже и всегда вызывает repaint.

### 2.4 Network [middle+]

- HTTP/1.1 vs HTTP/2 vs HTTP/3 — ключевые отличия?
- Кеширование: `ETag`, `Cache-Control`, `Last-Modified` — как работает?
- CORS: что это, preflight-запросы, заголовки `Access-Control-*`?
- **Expected:** HTTP/2 = мультиплексирование, сжатие заголовков, server push. HTTP/3 = QUIC (на базе UDP), быстрое установление соединения. CORS контролируется браузером, сам по себе не является механизмом безопасности.

### 2.5 Performance [senior]

- Core Web Vitals: LCP, INP (заменил FID), CLS — что это?
- Как измерить и улучшить каждый?
- **Expected:** LCP: оптимизация critical rendering path, preload шрифтов/изображений. INP: уменьшение времени выполнения JS, использование `requestIdleCallback`. CLS: явные размеры для изображений/рекламы, избегать сдвигов макета.

### 2.6 GraphQL vs REST [middle+]

**Q:** Сравни GraphQL и REST — плюсы и минусы.

**Expected:** REST — много endpoint'ов, сервер решает какие данные вернуть; кеширование по URL, простой контракт. GraphQL — один endpoint, клиент сам запрашивает нужные поля; меньше overfetching/underfetching, но сложнее кеширование и контроль нагрузки. REST проще для простых CRUD; GraphQL удобен при сложных связях данных и мобильных клиентах с разными потребностями.

---

## Block 3. JavaScript (15-20 min)

### 3.1 Event Loop & Promises [middle+]

- **Practice file:** `src/practice/js/Promises/1.ts`
- **Topic:** microtask queue vs macrotask queue, execution order of `setTimeout` vs `Promise.then` vs `queueMicrotask`
- **Follow-up:** В чём разница между `Promise.all`, `Promise.allSettled` и `Promise.race`? Когда что использовать?

### 3.2 Closures & Context [middle+]

- **Practice file:** `src/practice/js/closures/closures.tsx`
- **Topic:** closures, `var` vs `let` in loops with `setTimeout`, `this` in arrow vs regular functions, `bind/call/apply`
- **Follow-up (senior):** Реализуй `debounce` с поддержкой cancel/flush

### 3.3 Serializer [middle+ / senior]

- **Practice file:** `src/practice/js/serializer/serializer.tsx`
- **Topic:** recursive types, recursion with depth limit, `typeof` / `Array.isArray`
- **Follow-up (senior):** Как бы ты обработал циклические ссылки? (подсказка: `WeakSet`)

---

## Block 4. TypeScript (10-15 min)

### 4.1 `keyof typeof` [junior+]

- **Practice file:** `src/practice/typescript/1.ts`

### 4.2 Implement `Pick` [middle]

- **Practice file:** `src/practice/typescript/2.ts`

### 4.3 Extract component props [middle+]

- **Practice file:** `src/practice/typescript/3.ts`
- Uses `infer` with conditional types

### 4.4 Advanced types [senior]

- **Practice file:** `src/practice/typescript/4.ts`
- **Topics:** `DeepReadonly`, template literal types, discriminated unions, `satisfies`

---

## Block 5. React (15-20 min)

### 5.1 Virtual DOM & Reconciliation [middle+]

**Q:** Опиши процесс обновления Virtual DOM. Что такое Reconciliation?

**Expected:** Две фазы:

- **Render Phase:** инициирование обновления → создание дерева Work In Progress → diffing (сравнение старого и нового дерева) → работа с ключами (`key`) для идентификации элементов → сбор побочных эффектов → учёт приоритетов (Fiber).
- **Commit Phase:** применение изменений к реальному DOM → вызовы lifecycle-методов и хуков (`useEffect`, `useLayoutEffect`) → batch updates (группировка обновлений).

### 5.2 Synthetic Events [middle+]

**Q:** Зачем React использует Synthetic Events, если уже есть нативные DOM Events?

**Expected:** Кросс-браузерная совместимость — единый API поверх нативных событий. Event delegation — React вешает один обработчик на корневой элемент, а не на каждый DOM-узел. Пулинг событий (до React 17) — переиспользование объектов для снижения нагрузки на GC. С React 17 события делегируются на root-контейнер, а не на `document`.

### 5.3 Custom hooks [middle+]

- **Practice file:** `src/practice/react/1-useHover/useHover.tsx`
- **Topics:** rules of hooks, cleanup in `useEffect`, ref vs state

### 5.4 Lifecycle & useEffect [middle+]

- **Practice file:** `src/practice/react/2-lifecycle/Lifecycle.tsx`
- **Topics:** mount/unmount order, dependency array, strict mode double-invoke

### 5.5 Re-render optimization [middle+]

- **Practice file:** `src/practice/react/3-rerenders/Rerenders.tsx`
- **Topics:** `React.memo`, `useMemo`, `useCallback`, composition pattern (children prop)

### 5.6 Error Boundaries [middle+]

**Q:** Что такое Error Boundary? Когда ловит ошибки, когда нет?

**Expected:** Классовый компонент с `getDerivedStateFromError` / `componentDidCatch` — ловит ошибки в рендере и lifecycle потомков. Не ловит: события (нужен try/catch), асинхронный код, ошибки в самом boundary. Один глобальный + по границам фич/роутов — чтобы падение блока не ломало всю страницу.

### 5.7 Advanced Hooks [senior]

**Q:** Расскажи про `useImperativeHandle`, `useTransition`, `useDeferredValue` — когда и зачем?

**Expected:** `useImperativeHandle` — кастомизация ref, который родитель получает через `forwardRef`; используется для императивного API компонента (например, `.focus()`, `.scrollTo()`). `useTransition` — помечает обновление как неприоритетное, UI остаётся отзывчивым во время тяжёлого ре-рендера. `useDeferredValue` — откладывает обновление значения до момента, когда браузер освободится; похоже на debounce, но управляется планировщиком React.

### 5.8 Suspense & Virtualization [senior]

**Q:** Что такое Suspense? Когда нужна виртуализация списков?

**Expected:** Suspense — декларативная обработка асинхронных зависимостей (lazy-компоненты, data fetching). Оборачиваем в `<Suspense fallback={...}>`, React показывает fallback пока данные загружаются. Вложенные Suspense boundaries позволяют гранулярно управлять loading-состояниями. Виртуализация (react-window, react-virtuoso, tanstack-virtual) — рендерить только видимые элементы списка; нужна при тысячах элементов, снижает количество DOM-узлов и ускоряет рендер.

### 5.9 State management (oral) [senior]

**Q:** Когда Context API, а когда Zustand/Redux/Jotai? «Prop drilling» vs «context hell» — как балансировать?

**Expected:** Context для редко обновляемых данных (тема, авторизация). Внешние сторы для частых или расшаренных обновлений. Принцип колокации — держать стейт рядом с тем, где он используется.

### 5.10 React Server Components (oral) [senior]

**Q:** React Server Components vs SSR — в чём разница?

**Expected:** RSC выполняется на сервере, отправляет сериализованное дерево компонентов (без гидрации). SSR отправляет HTML-строку, потом гидрирует. RSC позволяет уменьшить размер клиентского бандла — серверные компоненты не попадают в JS-бандл. `use client` / `use server` — директивы для разделения серверного и клиентского кода.
