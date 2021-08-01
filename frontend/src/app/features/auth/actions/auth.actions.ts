import { createAction } from '@ngrx/store';

export const init = createAction('[Auth] Init');

export const getUser = createAction('[Auth] Get User');

export const logout = createAction('[Auth] Logout');
