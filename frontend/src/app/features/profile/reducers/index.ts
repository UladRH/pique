import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import { rootEntities, rootEntity, toStaticSelector } from 'ngrx-entity-relationship';

import { Post, Profile } from '../../../core/interfaces';
import * as fromProfile from './profile.reducer';

export const profileFeatureKey = 'profiles';

export interface ProfileState {
  [fromProfile.profileFeatureKey]: fromProfile.State;
}

export function reducers(state: ProfileState | undefined, action: Action) {
  return combineReducers({
    [fromProfile.profileFeatureKey]: fromProfile.reducer,
  })(state, action);
}

export const selectProfileState = createFeatureSelector<ProfileState>(profileFeatureKey);

export const selectProfileEntitiesState = createSelector(
  selectProfileState,
  (state) => state[fromProfile.profileFeatureKey],
);

export const selectProfile = rootEntity(selectProfileEntitiesState);

export const selectProfiles = rootEntities(selectProfile);

export const selectProfileById = (id: Post['id']) => toStaticSelector(selectProfile, id);

export const selectLoggedInProfile = createSelector(
  selectProfileEntitiesState,
  ({ entities, loggedInProfileId }) => (loggedInProfileId ? entities[loggedInProfileId] : null),
);

export const selectIsOwnProfile = (id: Profile['id']) =>
  createSelector(selectProfileEntitiesState, ({ loggedInProfileId }) => id == loggedInProfileId);
