import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="dark flex flex-col h-full w-full bg-black text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
