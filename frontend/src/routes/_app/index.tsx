import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@heroui/button';

export const Route = createFileRoute('/_app/')({
  component: App,
});

function App() {
  return (
    <div className="w-full h-full flex flex-col gap-8 justify-center items-center p-4">
      <div className="p-4 flex items-center justify-center flex-col gap-2">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-5xl font-bold uppercase">Shoemaker's Choices</p>
          <p className="text-lg font-medium">Step Up Your Style, One Pair at a Time.</p>
        </div>
        <Link to="/products">
          <Button color="primary" size="lg" variant="shadow" className="mt-4">
            Shop Now
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-8">
        <div className="w-full flex gap-4 col-span-full"></div>
      </div>
    </div>
  );
}
