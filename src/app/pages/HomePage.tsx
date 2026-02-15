import { Link } from '@tanstack/react-router';

interface PracticeItem {
  title: string;
  path: string;
  category: string;
}

const problems: PracticeItem[] = [
  { title: 'useHover', path: '/react/use-hover', category: 'React' },
  { title: 'Lifecycle', path: '/react/lifecycle', category: 'React' },
  { title: 'Rerenders', path: '/react/rerenders', category: 'React' },
  { title: 'Sequential Promises', path: '/js/sequential-promises', category: 'JS' },
  { title: 'User Messages', path: '/js/user-messages', category: 'JS' },
  { title: 'Serializer', path: '/js/serializer', category: 'JS' },
];

export function HomePage() {
  const grouped = problems.reduce<Record<string, PracticeItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold tracking-tight">Problems to discuss</h1>

      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {category}
          </h2>
          <ul className="flex flex-col gap-2">
            {items.map((item, index) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors inline-flex w-full gap-2"
                >
                  <span className="text-gray-500 dark:text-gray-400">#{index + 1}</span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
