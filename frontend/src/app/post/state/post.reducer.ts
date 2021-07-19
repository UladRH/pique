import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Post } from '../../shared/interfaces';
import * as PostActions from './post.actions';

export const postFeatureKey = 'posts';

export interface PostState extends EntityState<Post> {}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({});

export const initialState: PostState = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,

  on(PostActions.like, PostActions.unlikeFailure, (state, { post: { id } }) =>
    adapter.updateOne({ id, changes: { likesCount: state.entities[id]!.likesCount + 1 } }, state),
  ),

  on(PostActions.unlike, PostActions.likeFailure, (state, { post: { id } }) =>
    adapter.updateOne({ id, changes: { likesCount: state.entities[id]!.likesCount - 1 } }, state),
  ),
);
