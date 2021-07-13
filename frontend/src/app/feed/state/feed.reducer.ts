import { createReducer, on } from '@ngrx/store';

import { Post } from '../../shared/interfaces/post.interface';
import * as FeedActions from './feed.actions';

export const feedFeatureKey = 'feed';

export interface FeedState {
  postsIds: Post['id'][];
}

export const initialState: FeedState = {
  postsIds: [],
};

export const reducer = createReducer(
  initialState,

  on(FeedActions.getSuccess, (state, { posts }) => ({
    ...state,
    postsIds: [...state.postsIds, ...posts.map((post) => post.id)],
  })),
);
