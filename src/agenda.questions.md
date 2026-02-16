# Frontend Interview — Middle+ / Senior (60-90 min)

## Block 1. General Questions (10-15 min)

### 1.1 Architecture decisions [middle+]

Ты приходишь на существующий проект и тебе поручают его вести - как ты решаешь — переписывать с нуля или оставить существующую версию и обновлять инкрементально?

### 1.2 Build tools [middle+]

Какие бандлеры использовал? Webpack vs Vite vs Rspack — в чём разница и trade-offs?

### 1.3 CI/CD [middle+]

Настраивал ли CI/CD? Какие шаги включает твой пайплайн?

### 1.4 Environment variables без ребилда [middle+]

Как подменить env-переменные на фронте без пересборки приложения?

### 1.5 Testing [middle+]

Какие типы тестов писал? Когда стоит покрывать тестами, а когда нет?

### 1.6 Project architecture [senior]

Как ты организуешь код в большом / среднем проекте? Какие архитектурные подходы использовал?

### 1.7 Monitoring & observability [senior]

Как ты мониторишь фронтенд в продакшене? Как узнаёшь, что у пользователей что-то сломалось, до того как они напишут в поддержку? Использовал ли Feature flags?

### 1.8 SOLID и GRASP на фронте [senior]

Как применяешь SOLID или GRASP на фронтенде? Приведи примеры (компоненты, хуки, контексты, таблицы, формы).

---

## Block 2. Browser & Network (10-15 min, oral)

### 2.1 Authentication vs Authorization [middle+]

В чём разница между аутентификацией и авторизацией?

### 2.2 Browser Storages [middle+]

Какие способы хранения данных/состояния в браузере ты знаешь? В чём разница между ними и когда что использовать?

### 2.3 Rendering [middle+]

- Опиши Critical Rendering Path: DOM → CSSOM → Render Tree → Layout → Paint → Composite
- Reflow vs repaint — что вызывает каждый из них?

### 2.4 Network [middle+]

- HTTP/1.1 vs HTTP/2 vs HTTP/3 — ключевые отличия версий HTTP?
- Websocket работал ли с ним? Сравни с HTTP, в чём концептуальное отличие?
- CORS (Cross-Origin Resource Sharing)

### 2.5 Performance [senior]

- Core Web Vitals: LCP, INP (заменил FID), CLS — что это?
- Как измерить и улучшить каждый?

### 2.6 GraphQL vs REST [middle+]

Сравни GraphQL и REST — плюсы и минусы.

---

## Block 3. JavaScript (15-20 min)

### 3.1 Event Loop & Promises [middle+]

- Practice file: `src/practice/js/Promises/1.ts`
- В чём разница между `Promise.all`, `Promise.allSettled` и `Promise.race`? Когда что использовать?

### 3.2 Closures & Context [middle+]

- Practice file: `src/practice/js/closures/closures.tsx`
- (senior) Реализуй `debounce` с поддержкой cancel/flush

### 3.3 Serializer [middle+ / senior]

- Practice file: `src/practice/js/serializer/serializer.tsx`
- (senior) Как бы ты обработал циклические ссылки?

---

## Block 4. TypeScript (10-15 min)

### 4.1 `keyof typeof` [junior+]

- Practice file: `src/practice/typescript/1.ts`

### 4.2 Implement `Pick` [middle]

- Practice file: `src/practice/typescript/2.ts`

### 4.3 Extract component props [middle+]

- Practice file: `src/practice/typescript/3.ts`

### 4.4 Advanced types [senior]

- Practice file: `src/practice/typescript/4.ts`

---

## Block 5. React (15-20 min)

### 5.1 Virtual DOM & Reconciliation [middle+]

Опиши процесс обновления Virtual DOM. Что такое Reconciliation?

### 5.2 Synthetic Events [middle+]

Зачем React использует Synthetic Events, если уже есть нативные DOM Events?

### 5.3 Custom hooks [middle+]

- Practice file: `src/practice/react/1-useHover/useHover.tsx`

### 5.4 Lifecycle & useEffect [middle+]

- Practice file: `src/practice/react/2-lifecycle/Lifecycle.tsx`

### 5.5 Re-render optimization [middle+]

- Practice file: `src/practice/react/3-rerenders/Rerenders.tsx`

### 5.6 Error Boundaries [middle+]

Что такое Error Boundary? Когда ловит ошибки, когда нет?

### 5.7 Advanced Hooks [senior]

Расскажи про `useImperativeHandle`, `useTransition`, `useDeferredValue` — когда и зачем?

### 5.8 Suspense & Virtualization [senior]

Что такое Suspense? Когда нужна виртуализация списков?

### 5.9 State management (oral) [senior]

- Когда Context API, а когда Zustand/Redux/Jotai?
- «Prop drilling» vs «context hell» — как балансировать?

### 5.10 React Server Components (oral) [senior]

React Server Components vs SSR — в чём разница?
