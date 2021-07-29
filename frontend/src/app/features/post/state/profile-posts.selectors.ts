import { createFeatureSelector, createSelector } from '@ngrx/store';
import { toStaticSelector } from 'ngrx-entity-relationship';

import { Profile } from '../../../core/interfaces';
import * as fromPost from './post.selectors';
import * as fromProfilePosts from './profile-posts.reducer';

export const selectProfilePostsState = createFeatureSelector<fromProfilePosts.ProfilePostsState>(
  fromProfilePosts.profilePostsFeatureKey,
);

export const selectProfilePostsIds = (profile: Profile) =>
  createSelector(selectProfilePostsState, (state) => state[profile.id]);

export const selectProfilePosts = (profile: Profile) =>
  toStaticSelector(fromPost.selectPosts, selectProfilePostsIds(profile));

export const selectProfilePostsCount = (profile: Profile) =>
  createSelector(selectProfilePostsState, (state) => state[profile.id].length ?? 0);
