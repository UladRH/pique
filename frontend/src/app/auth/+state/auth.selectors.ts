import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);
export const getLoggedIn = createSelector(getAuthState, (auth: AuthState) => auth.loggedIn);
export const getUser = createSelector(getAuthState, (auth: AuthState) => auth.user);
export const getIsSubmitting = createSelector(getAuthState, (auth: AuthState) => auth.isSubmitting);
export const getError = createSelector(getAuthState, (auth: AuthState) => auth.error);

export const authQuery = {
  getAuthState,
  getLoggedIn,
  getUser,
  getIsSubmitting,
  getError,
};
