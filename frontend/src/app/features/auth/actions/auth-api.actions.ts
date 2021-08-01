import { createAction, props } from '@ngrx/store';

import { IError, User } from '@pique/frontend/core/interfaces';

export const getUserSuccess = createAction(
  '[Auth/API] Get User Success', //
  props<{ user: User }>(),
);

export const getUserFailure = createAction(
  '[Auth/API] Get User Failure',
  props<{ error: IError }>(),
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success', //
  props<{ user: User }>(),
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure', //
  props<{ error: IError }>(),
);

export const registerSuccess = createAction(
  '[Auth/API] Register Success', //
  props<{ user: User }>(),
);

export const registerFailure = createAction(
  '[Auth/API] Register Failure', //
  props<{ error: IError }>(),
);
