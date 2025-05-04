import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col h-screen w-full">
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
