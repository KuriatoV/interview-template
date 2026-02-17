import { useState, useRef } from 'react';

function useRenderCount() {
  const count = useRef(0);
  count.current++;
  return count.current;
}

function HeavyComponent() {
  const renders = useRenderCount();

  const items = Array.from({ length: 500 }, (_, i) => (
    <span key={i} className="inline-block h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700" />
  ));

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">HeavyComponent</h3>
        <RenderBadge count={renders} />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">500 elements rendered below:</p>
      <div className="flex flex-wrap gap-0.5">{items}</div>
    </div>
  );
}

function CountDisplay({ handleIncrement, count }: { handleIncrement: () => void; count: number }) {
  const renders = useRenderCount();

  return (
    <>
      <button
        onClick={handleIncrement}
        className="self-start rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Increment
      </button>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">CountDisplay</h3>
          <RenderBadge count={renders} />
        </div>
        <p className="text-2xl font-bold text-center">{count}</p>
      </div>
    </>
  );
}

function RenderBadge({ count }: { count: number }) {
  return (
    <span className="rounded-full bg-red-100 dark:bg-red-900 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:text-red-200">
      renders: {count}
    </span>
  );
}

export default function Rerenders() {
  const renders = useRenderCount();
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rerenders</h1>
        <RenderBadge count={renders} />
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950 p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Click the button and watch the render counts. HeavyComponent does not depend on count but
          still re-renders. Optimize it.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <CountDisplay handleIncrement={() => setCount((c) => c + 1)} count={count} />
        <HeavyComponent />
      </div>
    </div>
  );
}
