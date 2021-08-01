import { createReducer, on } from '@ngrx/store';

import { User } from '../../../core/interfaces';
import { AuthApiActions } from '../actions';

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
