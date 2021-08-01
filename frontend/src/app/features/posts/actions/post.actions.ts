import { createAction, props } from '@ngrx/store';

import { Post } from '../../../core/interfaces';

export const loaded = createAction('[Post Resolver] Post Loaded', props<{ post: Post }>());

export const like = createAction('[Post Like Button] Like Post', props<{ post: Post }>());

export const unlike = createAction('[Post Like Button] Unlike Post', props<{ post: Post }>());
