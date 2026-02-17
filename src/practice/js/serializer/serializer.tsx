// Define the `Serializable` type based on these value examples:
//
// 1
// "abc"
// [1, 2, "xyz", [1, 2, 3]]
// {a: 1, b: 2}
// [1, 2, {a: 3, b: 4}, [5, 6]]
// () => "some string"

type Serializable =
  | number
  | string
  | ((...args: unknown[]) => unknown)
  | Serializable[]
  | { [key: string]: Serializable };

// Returns a string representation of the given `value` of `Serializable` type,
// up to the nesting level specified in `maxNestingLevel`.
//
// For functions — returns a minified string representation of the function body.
//
// @example
// serialize(1)             → "1"
// serialize("abc")         → "abc"
// serialize([1, 2])        → "Array(1, 2)"
// serialize({a: 1, b: 2})  → "Object(a = 1, b = 2)"
// serialize({a: 1, b: {c: 2}})  → "Object(a = 1, b = Object(c = 2))"
// serialize(() => { return "result" })  → "function(){return"result";}"
//
// When maxNestingLevel is reached, nested structures are replaced with "..." :
// serialize({a: {b: {c: 1}}}, 1) → "Object(a = Object(b = ...))"
//
// in case of circular references, the function returns '[Circular]'
// Tip: /\s/g — regexp for removing whitespace, tabs, newlines, etc.

function serialize(value: Serializable, maxNestingLevel = 2, seen?: any): string {
  //TODO: implement
}

// ── Test cases ──────────────────────────────────────────────

const testCases: Array<{ input: Serializable; depth?: number; label: string }> = [
  { input: 1, label: 'number' },
  { input: 'abc', label: 'string' },
  { input: [1, 2, 'xyz', [3, 4]], label: 'nested array' },
  { input: { a: 1, b: 2 }, label: 'simple object' },
  {
    input: { a: 1, b: { c: 2, d: [3, 4] } },
    label: 'nested object',
  },
  {
    input: { a: { b: { c: { d: 1 } } } },
    depth: 1,
    label: 'depth = 1 (truncated)',
  },
  {
    input: () => {
      return 'func body';
    },
    label: 'function',
  },
  {
    input: {
      num: 42,
      arr: [1, { x: 2 }],
      fn: function () {
        return 'hello';
      },
    },
    label: 'mixed object',
  },

  (() => {
    const arr: Serializable[] = [1, { name: 'inner', back: null as unknown as Serializable }];
    (arr[1] as Record<string, Serializable>).back = arr; // объект внутри массива ссылается на сам массив → [Circular]
    return { input: arr, label: 'array: element refs array (circular)' };
  })(),
];

export const SerializerComponent = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Serializer</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Define the recursive{' '}
          <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs font-mono">
            Serializable
          </code>{' '}
          type and implement the{' '}
          <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs font-mono">
            serialize
          </code>{' '}
          function that converts any serializable value into a human-readable string representation,
          respecting the{' '}
          <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-xs font-mono">
            maxNestingLevel
          </code>{' '}
          depth limit.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Format rules
        </h2>
        <ul className="text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-1 list-disc list-inside">
          <li>
            <strong>Primitives</strong> — return as-is:{' '}
            <code className="text-xs bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
              serialize(1) → "1"
            </code>
          </li>
          <li>
            <strong>Arrays</strong> —{' '}
            <code className="text-xs bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
              Array(el1, el2, ...)
            </code>
          </li>
          <li>
            <strong>Objects</strong> —{' '}
            <code className="text-xs bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
              Object(key = value, ...)
            </code>
          </li>
          <li>
            <strong>Functions</strong> — minified source:{' '}
            <code className="text-xs bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
              {'function(){return"result";}'}
            </code>
          </li>
          <li>
            <strong>Depth exceeded</strong> — replace with{' '}
            <code className="text-xs bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">...</code>
          </li>
          <li>
            <strong>Circular reference</strong> — replace with{' '}
            <code className="text-xs bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
              [Circular]
            </code>
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Test cases
        </h2>
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">
                  Label
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">
                  Input
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">
                  Output
                </th>
              </tr>
            </thead>
            <tbody>
              {testCases.map((tc) => {
                const result = serialize(tc.input, tc.depth);
                return (
                  <tr
                    key={tc.label}
                    className="border-b last:border-b-0 border-gray-200 dark:border-gray-800"
                  >
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{tc.label}</td>
                    <td className="px-4 py-2 font-mono text-xs text-gray-600 dark:text-gray-300 max-w-[200px] truncate">
                      {typeof tc.input === 'function'
                        ? tc.input.toString()?.replace(/\s+/g, ' ').slice(0, 60)
                        : (() => {
                            try {
                              return JSON.stringify(tc.input);
                            } catch {
                              return serialize(tc.input)?.replace(/\s+/g, ' ').slice(0, 80);
                            }
                          })()}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs">
                      {result ? (
                        <span className="text-green-600 dark:text-green-400">{result}</span>
                      ) : (
                        <span className="text-gray-400 italic">empty</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
