import { AUTH_ACTIONS } from '@/lib/types';

export const loginSuccess = (user: any) => ({
  type: AUTH_ACTIONS.LOGIN_SUCCESS,
  payload: { user },
});

export const setToken = (token: string) => ({
  type: AUTH_ACTIONS.SET_TOKEN,
  payload: token,
});

export const logout = () => ({
  type: AUTH_ACTIONS.LOGOUT,
});
