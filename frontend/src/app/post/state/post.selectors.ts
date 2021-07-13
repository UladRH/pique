import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  relatedEntity,
  relatedEntitySelector,
  rootEntities,
  rootEntity,
  rootEntitySelector,
  toStaticSelector,
} from 'ngrx-entity-relationship';

import { selectProfileState } from '../../profile/state/profile.selectors';
import * as fromPost from './post.reducer';

export const selectPostState = createFeatureSelector<fromPost.PostState>(fromPost.postFeatureKey);

const { selectEntities: getPostEntities } = fromPost.adapter.getSelectors();

export const selectPostEntities = createSelector(selectPostState, getPostEntities);

export const rootPost = rootEntitySelector(selectPostState);

export const relPostProfile = relatedEntitySelector(selectProfileState, 'profileId', 'profile');

export const selectPost = rootEntity(
  selectPostState,
  relatedEntity(selectProfileState, 'profileId', 'profile'),
);

export const selectPosts = rootEntities(selectPost);

export const selectPostById = (id) => toStaticSelector(selectPost, id);
