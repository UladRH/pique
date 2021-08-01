import { createAction, props } from '@ngrx/store';

import { IError, Profile } from '../../../core/interfaces';

export const followSuccess = createAction(
  '[Profiles/API] Follow Profile Success',
  props<{ profile: Profile }>(),
);

export const followFailure = createAction(
  '[Profiles/API] Follow Profile Failure',
  props<{ profile: Profile; error: IError }>(),
);

export const unfollowSuccess = createAction(
  '[Profiles/API] Unfollow Profile Success',
  props<{ profile: Profile }>(),
);

export const unfollowFailure = createAction(
  '[Profiles/API] Unfollow Profile Failure',
  props<{ profile: Profile; error: IError }>(),
);

export const updateSuccess = createAction(
  '[Profiles/API] Update Profile Success',
  props<{ profile: Profile }>(),
);

export const updateFailure = createAction(
  '[Profiles/API] Update Profile Failure',
  props<{ error: IError }>(),
);
