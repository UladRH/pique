import { createAction } from '@ngrx/store';

export const authRequired = createAction('[Click Logged In Directive] Authentication Required');

export const authRedirect = createAction('[Auth Guard] Redirect To Login Page');

export const loggedInRedirect = createAction('[No Auth Guard] Redirect To Main Page');
