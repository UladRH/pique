import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuthForms from '@pique/frontend/auth/reducers/auth-forms.reducer';
import * as fromAuth from '@pique/frontend/auth/reducers/auth.reducer';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromAuthForms.authFormsFeatureKey]: fromAuthForms.State;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromAuth.authFeatureKey]: fromAuth.reducer,
    [fromAuthForms.authFormsFeatureKey]: fromAuthForms.reducer,
  })(state, action);
}

export const selectAuthFeatureState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthState = createSelector(
  selectAuthFeatureState,
  (state) => state[fromAuth.authFeatureKey],
);

export const selectAuthFormsState = createSelector(
  selectAuthFeatureState,
  (state) => state[fromAuthForms.authFormsFeatureKey],
);

export const selectLoggedInUser = createSelector(selectAuthState, (state) => state.user);

export const selectLoggedIn = createSelector(selectAuthState, (state) => state.loggedIn);

export const selectLoginFormPending = createSelector(
  selectAuthFormsState,
  (state) => state.pending,
);
export const selectLoginFormError = createSelector(selectAuthFormsState, (state) => state.error);

export const selectRegisterFormPending = selectLoginFormPending;
export const selectRegisterFormError = selectLoginFormError;
