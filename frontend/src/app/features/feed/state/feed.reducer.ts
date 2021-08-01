import { createReducer, on } from '@ngrx/store';

import { Post } from '@pique/frontend/core/interfaces';
import * as FeedActions from '@pique/frontend/feed/state/feed.actions';
import { PostsApiActions } from '@pique/frontend/posts/actions';

export const feedFeatureKey = 'feed';

export interface FeedState {
  postsIds: Post['id'][];
  page: number | null;
  perPage: number;
}

export const initialState: FeedState = {
  postsIds: [],
  page: null,
  perPage: 5,
};

export const reducer = createReducer(
  initialState,

  on(FeedActions.getSuccess, (state, { posts }) => ({
    ...state,
    postsIds: posts.map((post) => post.id),
    page: 1,
  })),

  on(FeedActions.nextSuccess, (state, { posts }) => ({
    ...state,
    postsIds: [...state.postsIds, ...posts.map((post) => post.id)],
    page: state.page! + 1,
  })),

  on(PostsApiActions.publishSuccess, (state, { post }) => ({
    ...state,
    postsIds: [post.id, ...state.postsIds],
  })),
);
