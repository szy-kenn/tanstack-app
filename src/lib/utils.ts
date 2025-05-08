import { type ParsedLocation } from '@tanstack/react-router';

export const getPathSegments = (
  location: ParsedLocation<{
    category?: string[] | undefined;
    sort?: 'asc' | 'desc' | undefined;
    page?: number | undefined;
  }>
) => {
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      name: segment.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
      path,
    };
  });

  return breadcrumbs;
};
