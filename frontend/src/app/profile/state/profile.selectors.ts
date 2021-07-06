import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from '../../auth/state/auth.selectors';
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
  fromAuth.selectLoggedInProfileId,
  ({ entities }, profileId) => entities[profileId],
);

export const selectIsOwnProfile = (id) =>
  createSelector(fromAuth.selectLoggedInProfileId, (loggedInProfileId) => id == loggedInProfileId);
