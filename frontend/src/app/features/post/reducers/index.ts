import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import {
  relatedEntity,
  rootEntities,
  rootEntity,
  toStaticSelector,
} from 'ngrx-entity-relationship';

import { Post, PostCreateDto, Profile } from '../../../core/interfaces';
import * as fromProfile from '../../profile/state/profile.selectors';
import * as fromPostDraft from './post-draft.reducer';
import * as fromPost from './post.reducer';
import * as fromProfilePosts from './profile-posts.reducer';

export const postFeatureKey = 'posts';

export interface PostState {
  [fromPost.postFeatureKey]: fromPost.State;
  [fromPostDraft.draftFeatureKey]: fromPostDraft.State;
  [fromProfilePosts.profilePostsFeatureKey]: fromProfilePosts.State;
}

export function reducers(state: PostState | undefined, action: Action) {
  return combineReducers({
    [fromPost.postFeatureKey]: fromPost.reducer,
    [fromPostDraft.draftFeatureKey]: fromPostDraft.reducer,
    [fromProfilePosts.profilePostsFeatureKey]: fromProfilePosts.reducer,
  })(state, action);
}

export const selectPostState = createFeatureSelector<PostState>(postFeatureKey);

export const selectPostEntitiesState = createSelector(
  selectPostState,
  (state) => state[fromPost.postFeatureKey],
);

export const selectPost = rootEntity(
  selectPostEntitiesState,
  relatedEntity(fromProfile.selectProfileState, 'profileId', 'profile'),
);

export const selectPosts = rootEntities(selectPost);

export const selectPostById = (id: Post['id']) => toStaticSelector(selectPost, id);

export const selectDraftState = createSelector(
  selectPostState,
  (state) => state[fromPostDraft.draftFeatureKey],
);

export const selectDraftDto = createSelector(
  selectDraftState,
  (state): PostCreateDto => ({
    content: state.content,
    mediaAttachmentsIds: state.mediaAttachments.map(({ id }) => id),
  }),
);

export const selectDraftMediaAttachments = createSelector(
  selectDraftState,
  (state) => state.mediaAttachments,
);

export const selectDraftContent = createSelector(selectDraftState, (state) => state.content);

export const selectProfilePostsState = createSelector(
  selectPostState,
  (state) => state[fromProfilePosts.profilePostsFeatureKey],
);

export const selectProfilePostsIds = (profile: Profile) =>
  createSelector(selectProfilePostsState, (state) => state[profile.id]);

export const selectProfilePosts = (profile: Profile) =>
  toStaticSelector(selectPosts, selectProfilePostsIds(profile));

export const selectProfilePostsCount = (profile: Profile) =>
  createSelector(selectProfilePostsState, (state) => state[profile.id].length ?? 0);
