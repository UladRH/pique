import { createReducer, on } from '@ngrx/store';

import { Post } from '../../../core/interfaces';
import { PostApiActions } from '../actions';

export const profilePostsFeatureKey = 'profilePosts';

export interface State {
  [key: string]: Post['id'][];
}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,

  on(PostApiActions.getSuccess, (state, { profile, posts }) => ({
    ...state,
    [profile.id]: posts.map((post) => post.id),
  })),

  on(PostApiActions.nextSuccess, (state, { profile, posts }) => ({
    ...state,
    [profile.id]: [...state[profile.id], ...posts.map((post) => post.id)],
  })),

  on(PostApiActions.publishSuccess, (state, { post }) => ({
    ...state,
    [post.profileId]: [post.id, ...(state[post.profileId] ?? [])],
  })),
);