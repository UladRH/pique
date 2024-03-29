import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Post } from '@pique/frontend/core/interfaces';
import { PostActions, PostsApiActions } from '@pique/frontend/posts/actions';

export const postsFeatureKey = 'posts';

export interface State extends EntityState<Post> {}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,

  on(PostActions.like, PostsApiActions.unlikeFailure, (state, { post: { id } }) =>
    adapter.updateOne({ id, changes: { likesCount: state.entities[id]!.likesCount + 1 } }, state),
  ),

  on(PostActions.unlike, PostsApiActions.likeFailure, (state, { post: { id } }) =>
    adapter.updateOne({ id, changes: { likesCount: state.entities[id]!.likesCount - 1 } }, state),
  ),
);
