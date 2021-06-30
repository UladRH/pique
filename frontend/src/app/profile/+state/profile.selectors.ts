import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProfile from './profile.reducer';

export const selectProfileState = createFeatureSelector<fromProfile.ProfileState>(
  fromProfile.profileFeatureKey,
);

const {
  selectIds: selectProfileIds,
  selectEntities: selectProfileEntities,
  selectAll: selectAllProfiles,
} = fromProfile.adapter.getSelectors();

export const getProfileEntities = createSelector(selectProfileState, selectProfileEntities);

export const getProfileById = (id) =>
  createSelector(getProfileEntities, (profiles) => profiles[id]);
