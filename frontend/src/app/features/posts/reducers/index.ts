import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import {
  relatedEntity,
  rootEntities,
  rootEntity,
  toStaticSelector,
} from 'ngrx-entity-relationship';

import { Post, PostCreateDto, Profile } from '../../../core/interfaces';
import * as fromProfile from '../../profile/reducers';
import * as fromPostDraft from './post-draft.reducer';
import * as fromPosts from './posts.reducer';
import * as fromProfilePosts from './profile-posts.reducer';

export const postsFeatureKey = 'posts';

export interface PostsState {
  [fromPosts.postsFeatureKey]: fromPosts.State;
  [fromPostDraft.postDraftFeatureKey]: fromPostDraft.State;
  [fromProfilePosts.profilePostsFeatureKey]: fromProfilePosts.State;
}

export function reducers(state: PostsState | undefined, action: Action) {
  return combineReducers({
    [fromPosts.postsFeatureKey]: fromPosts.reducer,
    [fromPostDraft.postDraftFeatureKey]: fromPostDraft.reducer,
    [fromProfilePosts.profilePostsFeatureKey]: fromProfilePosts.reducer,
  })(state, action);
}

export const selectPostState = createFeatureSelector<PostsState>(postsFeatureKey);

export const selectPostEntitiesState = createSelector(
  selectPostState,
  (state) => state[fromPosts.postsFeatureKey],
);

export const selectPost = rootEntity(
  selectPostEntitiesState,
  relatedEntity(fromProfile.selectProfileEntitiesState, 'profileId', 'profile'),
);

export const selectPosts = rootEntities(selectPost);

export const selectPostById = (id: Post['id']) => toStaticSelector(selectPost, id);

export const selectDraftState = createSelector(
  selectPostState,
  (state) => state[fromPostDraft.postDraftFeatureKey],
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
