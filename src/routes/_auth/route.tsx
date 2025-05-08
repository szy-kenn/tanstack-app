import { createFileRoute, Outlet } from '@tanstack/react-router';
import Navbar from './-components/navbar';
import Footer from './-components/footer';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="dark flex flex-col min-h-screen h-full w-full bg-black text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
