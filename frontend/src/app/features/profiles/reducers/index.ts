import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import { rootEntities, rootEntity, toStaticSelector } from 'ngrx-entity-relationship';

import { Post, Profile } from '../../../core/interfaces';
import * as fromProfile from './profiles.reducer';

export const profilesFeatureKey = 'profiles';

export interface ProfilesState {
  [fromProfile.profilesFeatureKey]: fromProfile.State;
}

export function reducers(state: ProfilesState | undefined, action: Action) {
  return combineReducers({
    [fromProfile.profilesFeatureKey]: fromProfile.reducer,
  })(state, action);
}

export const selectProfileState = createFeatureSelector<ProfilesState>(profilesFeatureKey);

export const selectProfileEntitiesState = createSelector(
  selectProfileState,
  (state) => state[fromProfile.profilesFeatureKey],
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
