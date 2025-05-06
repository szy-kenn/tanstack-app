import { combineReducers } from 'redux';
import { AUTH_ACTIONS, type AuthState } from '@/lib/types';

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case AUTH_ACTIONS.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case AUTH_ACTIONS.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
