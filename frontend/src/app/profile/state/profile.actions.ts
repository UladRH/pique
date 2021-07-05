import { createAction, props } from '@ngrx/store';

import { Profile } from '../../shared/interfaces';

export const loadedProfile = createAction(
  '[Profile Resolver] Profile Loaded',
  props<{ profile: Profile }>(),
);
