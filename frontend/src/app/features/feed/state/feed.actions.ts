import { createAction, props } from '@ngrx/store';

import { Post } from '@pique/frontend/core/interfaces';

export const get = createAction('[Feed Page] Get Feed');
export const getSuccess = createAction('[Feed API] Get Feed Success', props<{ posts: Post[] }>());
export const getFailure = createAction('[Feed API] Get Feed Failure', props<{ error: any }>());

export const next = createAction('[Feed Page] Next Feed');
export const nextSuccess = createAction('[Feed API] Next Feed Success', props<{ posts: Post[] }>());
export const nextFailure = createAction('[Feed API] Next Feed Failure', props<{ error: any }>());
