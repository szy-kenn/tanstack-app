import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/about')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full gap-2 flex-col w-full items-center justify-center">
      <p className="uppercase text-lg font-bold">About Us</p>
      <p>This is the Shoemaker.</p>
    </div>
  );
}
