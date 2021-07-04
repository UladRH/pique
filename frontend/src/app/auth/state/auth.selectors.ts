import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authFeatureKey, AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectLoggedIn = createSelector(selectAuthState, (state) => state.loggedIn);

export const selectLoginFormPending = createSelector(selectAuthState, (state) => state.pending);
export const selectLoginFormError = createSelector(selectAuthState, (state) => state.error);

export const selectRegisterFormPending = selectLoginFormPending;
export const selectRegisterFormError = selectLoginFormError;
