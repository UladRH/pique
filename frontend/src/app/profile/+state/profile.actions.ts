import { createAction, props } from '@ngrx/store';

import { Profile } from '../../shared/interfaces';

export const loadProfile = createAction(
  '[Profile Resolver] Load Profile',
  props<{ profile: Profile }>(),
);
