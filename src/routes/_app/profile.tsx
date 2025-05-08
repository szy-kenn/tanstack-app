import Navbar from '@/components/navbar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';

export const Route = createFileRoute('/_app/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}
