import type { RouterContext } from '@/lib/types';
import { verifyAuth } from '@/lib/verify-auth';
import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext, type ParsedLocation } from '@tanstack/react-router';
import '../App.css';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  loader: async ({ context, location }: { context: RouterContext; location: ParsedLocation<{}> }) =>
    verifyAuth(location.pathname, context.queryClient),
  component: () => {
    return <Outlet />;
  },
});
