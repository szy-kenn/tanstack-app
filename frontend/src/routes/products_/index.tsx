import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import * as z from 'zod';

const defaultValues: {
  category: string;
  sort: 'asc' | 'desc';
  page: number;
} = {
  category: 'all',
  sort: 'desc',
  page: 1,
};

const searchSchema = z.object({
  category: z.string().default(defaultValues.category),
  sort: z.enum(['asc', 'desc']).default(defaultValues.sort),
  page: z.number().default(defaultValues.page),
});

export const Route = createFileRoute('/products_/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [stripSearchParams(defaultValues)],
  },
});

function RouteComponent() {
  const { category, sort, page } = Route.useSearch();

  return <div>{`Hello "/$storeId/products?category=${category}&sort=${sort}&page=${page}!`}</div>;
}
