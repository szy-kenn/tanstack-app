import type { QueryClient } from '@tanstack/react-query';

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
};

export type ValidationErrors = {
  [K in keyof SignUpFormValues]?: string[];
};

export const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGOUT: 'AUTH/LOGOUT',
  SET_TOKEN: 'AUTH/SET_TOKEN',
} as const;

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    id?: number;
    name?: string;
    email?: string;
  } | null;
}

export type RouterContext = {
  queryClient: QueryClient;
};

export const CATEGORIES = {
  // ALL: 'All',
  RUNNING: 'Running',
  TRAIL: 'Trail',
  SNEAKERS: 'Sneakers',
  CASUAL: 'Casual',
} as const;
