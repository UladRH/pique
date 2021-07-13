import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer } from '@ngrx/store';

import { Post } from '../../shared/interfaces/post.interface';

export const postFeatureKey = 'posts';

export interface PostState extends EntityState<Post> {}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({});

export const initialState: PostState = adapter.getInitialState({});

export const reducer = createReducer(initialState);
