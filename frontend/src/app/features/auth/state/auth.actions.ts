import { createAction, props } from '@ngrx/store';

import { IError, LoginUserDto, RegisterUserDto, User } from '../../../core/interfaces';

export const init = createAction('[Auth] Init');

export const authRequired = createAction('[Click Logged In Directive] Authentication Required');
export const authRedirect = createAction('[Auth Guard] Redirect To Login Page');
export const loggedInRedirect = createAction('[No Auth Guard] Redirect To Main Page');

export const getUser = createAction('[Auth] Get User');
export const getUserSuccess = createAction('[Auth API] Get User Success', props<{ user: User }>());
export const getUserFailure = createAction(
  '[Auth API] Get User Failure',
  props<{ error: IError }>(),
);

export const login = createAction('[Login Page] Login', props<{ dto: LoginUserDto }>());
export const loginPageUnload = createAction('[Login Page] Unload');
export const loginSuccess = createAction('[Auth API] Login Success', props<{ user: User }>());
export const loginFailure = createAction('[Auth API] Login Failure', props<{ error: IError }>());

export const register = createAction('[Register Page] Register', props<{ dto: RegisterUserDto }>());
export const registerPageUnload = createAction('[Register Page] Unload');
export const registerSuccess = createAction('[Auth API] Register Success', props<{ user: User }>());
export const registerFailure = createAction(
  '[Auth API] Register Failure',
  props<{ error: IError }>(),
);

export const logout = createAction('[Auth] Logout');
