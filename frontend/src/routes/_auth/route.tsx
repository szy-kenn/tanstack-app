import { createFileRoute, Outlet } from '@tanstack/react-router';
import Navbar from './-components/navbar';
import Footer from './-components/footer';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <div className="h-full">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
