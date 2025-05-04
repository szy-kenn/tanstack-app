import { createFileRoute } from '@tanstack/react-router';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
  );
}
