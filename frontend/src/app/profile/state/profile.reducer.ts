import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Profile } from '../../shared/interfaces';
import * as ProfileActions from './profile.actions';

export const profileFeatureKey = 'profiles';

export interface ProfileState extends EntityState<Profile> {}

export const adapter: EntityAdapter<Profile> = createEntityAdapter<Profile>({});

export const initialState: ProfileState = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,

  on(ProfileActions.loaded, (state, { profile }) => adapter.addOne(profile, state)),

  on(ProfileActions.follow, ProfileActions.unfollowFailure, (state, { profile: { id } }) => {
    const counters = state.entities[id].counters;
    return adapter.updateOne(
      {
        id,
        changes: {
          followed: true,
          counters: {
            ...counters,
            followers: counters.followers + 1,
          },
        },
      },
      state,
    );
  }),

  on(ProfileActions.unfollow, ProfileActions.followFailure, (state, { profile: { id } }) => {
    const counters = state.entities[id].counters;
    return adapter.updateOne(
      {
        id,
        changes: {
          followed: false,
          counters: {
            ...counters,
            followers: counters.followers - 1,
          },
        },
      },
      state,
    );
  }),

  on(ProfileActions.followSuccess, ProfileActions.unfollowSuccess, (state, { profile }) =>
    adapter.upsertOne(profile, state),
  ),
);
