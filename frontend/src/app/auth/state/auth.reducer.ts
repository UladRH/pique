import { createReducer, on } from '@ngrx/store';

import { IError, Profile, User } from '../../shared/interfaces';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  loggedIn: boolean;
  user: User;
  profileId: Profile['id'];
  pending: boolean;
  error: IError;
}

export const initialState: AuthState = {
  loggedIn: null,
  user: null,
  profileId: null,
  pending: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(
    AuthActions.getUserSuccess,
    AuthActions.loginSuccess,
    AuthActions.registerSuccess,
    (state, { user, profile }) => ({ ...state, user, profileId: profile.id, loggedIn: true }),
  ),

  on(AuthActions.getUserFailure, (state) => ({ ...state, loggedIn: false })),

  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(AuthActions.login, AuthActions.register, (state) => ({ ...state, pending: true })),

  on(
    AuthActions.loginSuccess,
    AuthActions.loginFailure,
    AuthActions.registerSuccess,
    AuthActions.registerFailure,
    (state) => ({ ...state, pending: false }),
  ),

  on(AuthActions.loginPageUnload, AuthActions.registerPageUnload, (state) => ({
    ...state,
    error: null,
  })),
);
