import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  return (
    <div className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
