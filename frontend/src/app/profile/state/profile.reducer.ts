import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { decrement, increment } from '../../shared/counter-reducer.utils';
import { Profile } from '../../shared/interfaces';
import * as AuthActions from '../../auth/state/auth.actions';
import * as ProfileActions from './profile.actions';

export const profileFeatureKey = 'profiles';

export interface ProfileState extends EntityState<Profile> {
  loggedInProfileId: Profile['id'];
}

export const adapter: EntityAdapter<Profile> = createEntityAdapter<Profile>({});

export const initialState: ProfileState = adapter.getInitialState({
  loggedInProfileId: null,
});

export const reducer = createReducer(
  initialState,

  on(
    AuthActions.getUserSuccess,
    AuthActions.loginSuccess,
    AuthActions.registerSuccess,
    (state, { profile }) => ({ ...state, loggedInProfileId: profile.id }),
  ),

  on(
    ProfileActions.loaded,
    AuthActions.getUserSuccess,
    AuthActions.loginSuccess,
    AuthActions.registerSuccess,
    (state, { profile }) => adapter.addOne(profile, state),
  ),

  on(ProfileActions.follow, ProfileActions.unfollowFailure, (state, { profile: { id } }) =>
    adapter.updateMany(
      [
        {
          id,
          changes: {
            followed: false,
            counters: increment('followers', state.entities[id].counters),
          },
        },
        {
          id: state.loggedInProfileId,
          changes: {
            counters: increment('following', state.entities[state.loggedInProfileId].counters),
          },
        },
      ],
      state,
    ),
  ),

  on(ProfileActions.unfollow, ProfileActions.followFailure, (state, { profile: { id } }) =>
    adapter.updateMany(
      [
        {
          id,
          changes: {
            followed: false,
            counters: decrement('followers', state.entities[id].counters),
          },
        },
        {
          id: state.loggedInProfileId,
          changes: {
            counters: decrement('following', state.entities[state.loggedInProfileId].counters),
          },
        },
      ],
      state,
    ),
  ),

  on(
    ProfileActions.followSuccess,
    ProfileActions.unfollowSuccess,
    ProfileActions.updateSuccess,
    (state, { profile }) => adapter.upsertOne(profile, state),
  ),
);
