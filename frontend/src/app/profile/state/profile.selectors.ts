import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProfile from './profile.reducer';

export const selectProfileState = createFeatureSelector<fromProfile.ProfileState>(
  fromProfile.profileFeatureKey,
);

const { selectEntities: getProfileEntities } = fromProfile.adapter.getSelectors();

export const selectProfileEntities = createSelector(selectProfileState, getProfileEntities);

export const selectProfileById = (id) =>
  createSelector(selectProfileEntities, (entities) => entities[id]);

export const selectLoggedInProfile = createSelector(
  selectProfileState,
  ({ entities, loggedInProfileId }) => entities[loggedInProfileId],
);

export const selectIsOwnProfile = (id) =>
  createSelector(selectProfileState, ({ loggedInProfileId }) => id == loggedInProfileId);
