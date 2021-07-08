import { createAction, props } from '@ngrx/store';

import { IError, Profile, ProfileUpdateDto } from '../../shared/interfaces';

export const loaded = createAction(
  '[Profile Resolver] Profile Loaded',
  props<{ profile: Profile }>(),
);

export const follow = createAction(
  '[Profile Page] Profile Followed',
  props<{ profile: Profile }>(),
);
export const followSuccess = createAction(
  '[Profile Api] Profile Follow Success',
  props<{ profile: Profile }>(),
);
export const followFailure = createAction(
  '[Profile Api] Profile Follow Failure',
  props<{ profile: Profile; error: IError }>(),
);

export const unfollow = createAction(
  '[Profile Page] Profile Unfollowed',
  props<{ profile: Profile }>(),
);
export const unfollowSuccess = createAction(
  '[Profile Api] Profile Unfollow Success',
  props<{ profile: Profile }>(),
);
export const unfollowFailure = createAction(
  '[Profile Api] Profile Unfollow Failure',
  props<{ profile: Profile; error: IError }>(),
);

export const updateProfileDetails = createAction(
  '[Settings Profile Edit] Update Profile Details',
  props<{ dto: ProfileUpdateDto }>(),
);
export const updateProfileDetailsSuccess = createAction(
  '[Settings Profile Edit] Update Profile Details Success',
  props<{ profile: Profile }>(),
);
export const updateProfileDetailsFailure = createAction(
  '[Settings Profile Edit] Update Profile Details Failure',
  props<{ error: IError }>(),
);
