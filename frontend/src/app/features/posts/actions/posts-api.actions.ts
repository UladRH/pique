import { createAction, props } from '@ngrx/store';

import { IError, Post, Profile } from '@pique/frontend/core/interfaces';

export const likeSuccess = createAction(
  '[Posts/API] Like Post Success', //
  props<{ post: Post }>(),
);

export const likeFailure = createAction(
  '[Posts/API] Like Post Failure',
  props<{ post: Post; error: IError }>(),
);

export const unlikeSuccess = createAction(
  '[Posts/API] Unlike Post Success',
  props<{ post: Post }>(),
);

export const unlikeFailure = createAction(
  '[Posts/API] Unlike Post Failure',
  props<{ post: Post; error: IError }>(),
);

export const publishSuccess = createAction(
  '[Posts/API] Publish Success', //
  props<{ post: Post }>(),
);

export const publishFailure = createAction(
  '[Posts/API] Publish Failure',
  props<{ error: IError }>(),
);

export const getSuccess = createAction(
  '[Posts/API] Get Profile Posts Success',
  props<{ profile: Profile; posts: Post[] }>(),
);

export const getFailure = createAction(
  '[Posts/API] Get Profile Posts Failure',
  props<{ error: any }>(),
);

export const nextSuccess = createAction(
  '[Posts/API] Next Profile Posts Success',
  props<{ profile: Profile; posts: Post[] }>(),
);

export const nextFailure = createAction(
  '[Posts/API] Next Profile Posts Failure',
  props<{ error: any }>(),
);
