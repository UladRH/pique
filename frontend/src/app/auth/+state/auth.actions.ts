import { createAction, props } from '@ngrx/store';

import { IError, LoginUserDto, RegisterUserDto, User } from '../../shared/interfaces';

export const getUser = createAction('[Auth] Get User');
export const getUserSuccess = createAction('[Auth] Get User Success', props<{ user: User }>());
export const getUserFail = createAction('[Auth] Get User Fail', props<{ error: IError }>());

export const login = createAction('[Auth] Login', props<{ dto: LoginUserDto }>());
export const loginRequired = createAction('[Auth] Login Required', props<{ returnTo: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const loginFail = createAction('[Auth] Login Fail', props<{ error: IError }>());

export const register = createAction('[Auth] Register', props<{ dto: RegisterUserDto }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: User }>());
export const registerFail = createAction('[Auth] Register Fail', props<{ error: IError }>());

export const logout = createAction('[Auth] Logout');
