import { createAction, props } from '@ngrx/store';

import { Profile, ProfileEditFormDto } from '@pique/frontend/core/interfaces';

export const loaded = createAction(
  '[Profile Resolver] Profile Loaded',
  props<{ profile: Profile }>(),
);

export const follow = createAction(
  '[Profile Follow Button] Follow Profile',
  props<{ profile: Profile }>(),
);

export const unfollow = createAction(
  '[Profile Follow Button] Unfollow Profile',
  props<{ profile: Profile }>(),
);

export const update = createAction(
  '[Settings Profile Edit] Update Profile',
  props<{ dto: ProfileEditFormDto }>(),
);
