import { createReducer, on } from '@ngrx/store';

import { Post } from '../../../core/interfaces';
import * as PostDraftActions from './post-draft.actions';
import * as ProfilePostsActions from './profile-posts.actions';

export const profilePostsFeatureKey = 'profilePosts';

export interface ProfilePostsState {
  [key: string]: Post['id'][];
}

export const initialState: ProfilePostsState = {};

export const reducer = createReducer(
  initialState,

  on(ProfilePostsActions.getSuccess, (state, { profile, posts }) => ({
    ...state,
    [profile.id]: posts.map((post) => post.id),
  })),

  on(ProfilePostsActions.nextSuccess, (state, { profile, posts }) => ({
    ...state,
    [profile.id]: [...state[profile.id], ...posts.map((post) => post.id)],
  })),

  on(PostDraftActions.publishSuccess, (state, { post }) => ({
    ...state,
    [post.profileId]: [post.id, ...(state[post.profileId] ?? [])],
  })),
);
