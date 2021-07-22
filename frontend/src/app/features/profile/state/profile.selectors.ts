import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Profile } from '../../../core/interfaces';
import * as fromProfile from './profile.reducer';

export const selectProfileState = createFeatureSelector<fromProfile.ProfileState>(
  fromProfile.profileFeatureKey,
);

const { selectEntities: getProfileEntities } = fromProfile.adapter.getSelectors();

export const selectProfileEntities = createSelector(selectProfileState, getProfileEntities);

export const selectProfileById = (id: Profile['id']) =>
  createSelector(selectProfileEntities, (entities) => entities[id] ?? null);

export const selectLoggedInProfile = createSelector(
  selectProfileState,
  ({ entities, loggedInProfileId }) => (loggedInProfileId ? entities[loggedInProfileId] : null),
);

export const selectIsOwnProfile = (id: Profile['id']) =>
  createSelector(selectProfileState, ({ loggedInProfileId }) => id == loggedInProfileId);
