import { Action, createReducer, on } from '@ngrx/store';

import { IError, User } from '../../shared/interfaces';
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  loggedIn: boolean;
  user: User;
  isSubmitting: boolean;
  error?: IError;
  returnTo: string;
}

export const initialState: AuthState = {
  loggedIn: null,
  user: null,
  isSubmitting: false,
  error: null,
  returnTo: '/',
};

const authReducer = createReducer(
  initialState,

  on(AuthActions.loginRequired, (state, action) => ({
    ...state,
    returnTo: action.returnTo || initialState.returnTo,
  })),

  on(
    AuthActions.getUserSuccess,
    AuthActions.loginSuccess,
    AuthActions.registerSuccess,
    (state, action) => ({
      ...state,
      loggedIn: true,
      user: action.user,
      isSubmitting: false,
    }),
  ),

  on(AuthActions.getUserFail, AuthActions.loginFail, AuthActions.registerFail, (state, action) => ({
    ...state,
    loggedIn: false,
    user: null,
    isSubmitting: false,
    error: action.error,
  })),

  on(AuthActions.login, AuthActions.register, (state, action) => ({
    ...state,
    isSubmitting: true,
    error: null,
  })),

  on(AuthActions.logout, (state, action) => ({
    ...initialState,
  })),
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducer(state, action);
}
