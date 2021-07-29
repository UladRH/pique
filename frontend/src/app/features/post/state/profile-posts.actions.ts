import { createAction, props } from '@ngrx/store';

import { Post, Profile } from '../../../core/interfaces';

export const get = createAction('[Profile Posts] Get Posts', props<{ profile: Profile }>());
export const getSuccess = createAction(
  '[Profile Posts] Get Posts Success',
  props<{ profile: Profile; posts: Post[] }>(),
);
export const getFailure = createAction(
  '[Profile Posts] Get Posts Failure',
  props<{ error: any }>(),
);

export const next = createAction('[Profile Posts] Next Posts', props<{ profile: Profile }>());
export const nextSuccess = createAction(
  '[Profile Posts] Next Posts Success',
  props<{ profile: Profile; posts: Post[] }>(),
);
export const nextFailure = createAction(
  '[Profile Posts] Next Posts Failure',
  props<{ error: any }>(),
);
