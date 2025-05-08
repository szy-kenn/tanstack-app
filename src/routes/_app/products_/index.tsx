import ApiAuth from '@/lib/api-auth';
import { createFileRoute, stripSearchParams, useLoaderData, useLocation, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import * as z from 'zod';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { BreadcrumbItem, Breadcrumbs, Button, CheckboxGroup, Divider, Image } from '@heroui/react';
import { Link } from '@tanstack/react-router';
import { getPathSegments } from '@/lib/utils';
import { CATEGORIES } from '@/lib/types';
import { useState } from 'react';
import { CustomCheckbox } from '@/components/toggle-group';

const defaultValues: {
  category: string[];
  sort: 'asc' | 'desc';
  page: number;
} = {
  category: [CATEGORIES.CASUAL, CATEGORIES.RUNNING, CATEGORIES.SNEAKERS, CATEGORIES.TRAIL],
  sort: 'desc',
  page: 1,
};

const searchSchema = z.object({
  category: z.string().array().default(defaultValues.category),
  sort: z.enum(['asc', 'desc']).default(defaultValues.sort),
  page: z.number().default(defaultValues.page),
});

export const Route = createFileRoute('/_app/products_/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [stripSearchParams(defaultValues)],
  },
  beforeLoad: async ({ search }) => {
    const response = await ApiAuth.get(
      `${import.meta.env.VITE_API_AUTH_URL}/products?category=${search.category}&sort=${search.sort}&page=${search.page}`
    );
    return { data: response.data };
  },
  loader: ({ context: { data } }) => {
    return data;
  },
});

function RouteComponent() {
  const location = useLocation();
  const navigate = useNavigate({ from: Route.fullPath });

  const data = useLoaderData({ from: '/_app/products_/' });

  const breadcrumbs = getPathSegments(location);
  const [groupSelected, setGroupSelected] = useState<string[]>([]);

  const handleCategoryChange = (values: string[]) => {
    setGroupSelected(values);
    navigate({
      search: (prev) => ({
        ...prev,
        category: values,
      }),
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Breadcrumbs>
          {breadcrumbs.map((breadcrumb, index) => (
            <BreadcrumbItem key={index} href={breadcrumb.path}>
              {breadcrumb.name}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
        <div className="flex w-full justify-between items-center">
          <div className="flex justify-center flex-col gap-2">
            <h1 className="text-4xl font-bold">All Products</h1>
            <p className="text-gray-500">Explore our collection of products</p>
          </div>
          <div className="pr-2">{data.data.length} results</div>
        </div>
      </div>
      <Divider />
      <div className="flex gap-2 items-center">
        <CheckboxGroup
          className="gap-4 flex-row"
          label="Select categories"
          orientation="horizontal"
          value={groupSelected}
          onChange={handleCategoryChange}
        >
          {Object.entries(CATEGORIES).map(([key, value]) => (
            <CustomCheckbox key={key} value={value}>
              {value}
            </CustomCheckbox>
          ))}
        </CheckboxGroup>
      </div>
      <Divider />
      <div className="w-full grid grid-cols-4 scrollbar-hide gap-4 overflow-auto h-full">
        {data.data.map((item: any) => (
          <Link to={`/products/$productId`} params={{ productId: item.id }} key={item.id}>
            <Card isFooterBlurred className="bg-white w-full h-full flex" radius="none">
              <CardBody className="p-4 space-y-4">
                <div className="h-full aspect-square flex items-center justify-center overflow-hidden">
                  <Image alt={item.name} className="object-cover object-center" src={item.image} isZoomed />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-black text-xl font-medium">{item.name}</p>
                  <div className="flex gap-0 flex-col">
                    <p className="text-gray-500 text-sm">{item.category}</p>
                    <p className="text-gray-500 text-sm">1 variant</p>
                    <p className="text-gray-500 text-sm">1 color</p>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="px-4 pb-4 bg-white text-black flex justify-between">
                <div className="flex flex-col gap-0">
                  <p className="text-base text-gray-900">USD {item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-700">{item.quantity} items left</p>
                </div>
                <Button variant="solid" size="md">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
        {/* {data.links.map((item: any, idx: number) => (
          <div className="flex items-center justify-center">
            <Link to={item.url}>
              {idx === 0 ? <ChevronLeft className="w-6 h-6" /> : idx === 1 ? idx : <ChevronRight className="w-6 h-6" />}
            </Link>
          </div>
        ))} */}
      </div>
    </>
  );
}
