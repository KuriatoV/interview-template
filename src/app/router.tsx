import { createRouter, createRoute, createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { HomePage } from '@/app/pages/HomePage';
import { UseHoverPage } from '@/app/pages/UseHoverPage';
import { LifecyclePage } from '@/app/pages/LifecyclePage';
import { RerendersPage } from '@/app/pages/RerendersPage';
import { UserMessagesPage } from '@/app/pages/UserMessagesPage';
import { SerializerPage } from '@/app/pages/SerializerPage';

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-4">
          <Link
            to="/"
            className="text-xl font-semibold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Practice
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const useHoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/react/use-hover',
  component: UseHoverPage,
});

const lifecycleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/react/lifecycle',
  component: LifecyclePage,
});

const rerendersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/react/rerenders',
  component: RerendersPage,
});

const userMessagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/js/user-messages',
  component: UserMessagesPage,
});

const serializerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/js/serializer',
  component: SerializerPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  useHoverRoute,
  lifecycleRoute,
  rerendersRoute,
  userMessagesRoute,
  serializerRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
