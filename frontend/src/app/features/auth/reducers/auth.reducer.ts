import { createReducer, on } from '@ngrx/store';

import { AuthApiActions } from '@pique/frontend/auth/actions';
import { User } from '@pique/frontend/core/interfaces';

export const authFeatureKey = 'auth';

export interface State {
  loggedIn: boolean | null;
  user: User | null;
}

export const initialState: State = {
  loggedIn: null,
  user: null,
};

export const reducer = createReducer(
  initialState,

  on(
    AuthApiActions.getUserSuccess,
    AuthApiActions.loginSuccess,
    AuthApiActions.registerSuccess,
    (state, { user }) => ({ ...state, user, loggedIn: true }),
  ),

  on(AuthApiActions.getUserFailure, (state) => ({ ...state, loggedIn: false })),
);
