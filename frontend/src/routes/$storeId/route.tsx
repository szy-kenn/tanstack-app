import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/$storeId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { storeId } = Route.useParams();

  return (
    <div>
      <p>This is store {storeId}</p>
      <Outlet />
    </div>
  );
}
