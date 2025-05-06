import ApiAuth from '@/lib/api-auth';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { BreadcrumbItem, Breadcrumbs, Image } from '@heroui/react';
import { createFileRoute, useLoaderData, useLocation } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/products_/$productId/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const response = await ApiAuth.get(`${import.meta.env.VITE_API_AUTH_URL}/products/${params.productId}`);
    console.log('Data: ', response.data);
    return { data: response.data };
  },
});

function RouteComponent() {
  const { data } = useLoaderData({ from: '/_app/products_/$productId/' });

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      name: segment.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
      path,
    };
  });

  return (
    <div>
      <Breadcrumbs>
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem key={index} href={breadcrumb.path}>
            {breadcrumb.name}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <Card className="w-fit">
        <CardHeader>{data.name}</CardHeader>
        <CardBody>
          <Image alt={data.name} className="object-cover" height={200} src={data.image} width={200} isZoomed />
        </CardBody>
        <CardFooter>{data.price}</CardFooter>
      </Card>
    </div>
  );
}
