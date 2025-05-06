import { QueryClient } from '@tanstack/react-query';
import ApiAuth from './api-auth';
import { redirect } from '@tanstack/react-router';
const publicRoutes = ['/login', '/signup', '/forgot-password'];

export const verifyAuth = async (pathname: string, queryClient: QueryClient): Promise<any> => {
  const isPublicRoute = publicRoutes.some((route) => route === pathname);

  try {
    const data = await queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: async () => {
        const response = await ApiAuth.get('/user');
        return response.data;
      },
    });

    if (data && isPublicRoute) {
      return redirect({
        to: '/products',
      });
    }

    return { user: data };
  } catch (error) {
    if (!isPublicRoute) {
      throw redirect({
        to: '/login',
      });
    }

    return { user: null };
  }
};
