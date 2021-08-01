import { createReducer, on } from '@ngrx/store';

import { AuthApiActions, AuthFormsActions } from '@pique/frontend/auth/actions';
import { IError } from '@pique/frontend/core/interfaces';

export const authFormsFeatureKey = 'forms';

export interface State {
  pending: boolean;
  error: IError | null;
}

export const initialState: State = {
  pending: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(AuthApiActions.loginFailure, AuthApiActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(AuthFormsActions.login, AuthFormsActions.register, (state) => ({ ...state, pending: true })),

  on(
    AuthApiActions.loginSuccess,
    AuthApiActions.loginFailure,
    AuthApiActions.registerSuccess,
    AuthApiActions.registerFailure,
    (state) => ({ ...state, pending: false }),
  ),

  on(AuthFormsActions.loginPageUnload, AuthFormsActions.registerPageUnload, (state) => ({
    ...state,
    error: null,
  })),
);
