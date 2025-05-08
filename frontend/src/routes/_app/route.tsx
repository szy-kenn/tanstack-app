import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex flex-col dark h-full w-full bg-black text-white">
      <Navbar />
      <div className="overflow-auto flex self-center relative h-full max-w-[1600px] flex-col w-full px-8 py-6 gap-6 box-border bg-black text-white">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
