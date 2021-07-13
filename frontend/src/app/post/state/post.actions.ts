import { createAction, props } from '@ngrx/store';

import { Post } from '../../shared/interfaces/post.interface';

export const loaded = createAction('[Post Resolver] Post Loaded', props<{ post: Post }>());
