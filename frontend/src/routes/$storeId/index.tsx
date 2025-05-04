import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$storeId/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/$storeId/"!</div>;
}
