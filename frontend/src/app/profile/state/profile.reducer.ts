import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { decrement, increment } from '../../shared/counter-reducer.utils';
import { Profile } from '../../shared/interfaces';
import * as AuthActions from '../../auth/state/auth.actions';
import * as ProfileActions from './profile.actions';

export const profileFeatureKey = 'profiles';

export interface ProfileState extends EntityState<Profile> {}

export const adapter: EntityAdapter<Profile> = createEntityAdapter<Profile>({});

export const initialState: ProfileState = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,

  on(
    ProfileActions.loaded,
    AuthActions.getUserSuccess,
    AuthActions.loginSuccess,
    AuthActions.registerSuccess,
    (state, { profile }) => adapter.addOne(profile, state),
  ),

  on(ProfileActions.follow, ProfileActions.unfollowFailure, (state, { profile }) =>
    adapter.updateOne(
      {
        id: profile.id,
        changes: { followed: false, counters: increment('followers', profile.counters) },
      },
      state,
    ),
  ),

  on(ProfileActions.unfollow, ProfileActions.followFailure, (state, { profile }) =>
    adapter.updateOne(
      {
        id: profile.id,
        changes: { followed: false, counters: decrement('followers', profile.counters) },
      },
      state,
    ),
  ),

  on(ProfileActions.followSuccess, ProfileActions.unfollowSuccess, (state, { profile }) =>
    adapter.upsertOne(profile, state),
  ),
);
