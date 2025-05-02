import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/products')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <p>
        Hello "/products/product"!
        <Outlet />
      </p>
    </div>
  );
}
