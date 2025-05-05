import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, CardHeader, CardBody, Input, Button, CardFooter } from '@heroui/react';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-black text-white w-full h-full flex items-center justify-center">
      <Card className="px-6 py-4">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md font-bold">Login to your account</p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-6 w-[320px] pb-0">
            <Input
              className="w-full"
              labelPlacement="outside"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <Input
              labelPlacement="outside"
              className="w-full"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Button color="primary">
              <Link to="/signup" className="text-white">
                Register
              </Link>
            </Button>
          </div>
        </CardBody>
        <CardFooter>
          <div className="h-full w-full">
            <p className="text-center text-sm text-gray-400">
              Don't have an account yet?{' '}
              <Link to="/signup" className="text-blue-500">
                Signup
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
