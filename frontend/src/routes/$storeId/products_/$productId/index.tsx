import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$storeId/products_/$productId/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/$storeId/products/$productId/"!</div>;
}
