import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { decrement, increment } from '../../../shared/utils/counter-reducer.utils';
import { Profile } from '../../../core/interfaces';
import * as AuthActions from '../../auth/state/auth.actions';
import { ProfileActions, ProfilesApiActions } from '../actions';

export const profilesFeatureKey = 'profiles';

export interface State extends EntityState<Profile> {
  loggedInProfileId: Profile['id'] | null;
}

export const adapter: EntityAdapter<Profile> = createEntityAdapter<Profile>({});

export const initialState: State = adapter.getInitialState({
  loggedInProfileId: null,
});

export const reducer = createReducer(
  initialState,

  on(
    AuthActions.getUserSuccess,
    AuthActions.loginSuccess,
    AuthActions.registerSuccess,
    (state, { user }) => ({
      ...adapter.addOne(user.profile, state),
      loggedInProfileId: user.profileId,
    }),
  ),

  on(
    ProfileActions.loaded,

    (state, { profile }) => adapter.addOne(profile, state),
  ),

  on(ProfileActions.follow, ProfilesApiActions.unfollowFailure, (state, { profile: { id } }) =>
    adapter.updateMany(
      [
        {
          id,
          changes: {
            followed: false,
            counters: increment('followers', state.entities[id]!.counters),
          },
        },
        {
          id: state.loggedInProfileId!,
          changes: {
            counters: increment('following', state.entities[state.loggedInProfileId!]!.counters),
          },
        },
      ],
      state,
    ),
  ),

  on(ProfileActions.unfollow, ProfilesApiActions.followFailure, (state, { profile: { id } }) =>
    adapter.updateMany(
      [
        {
          id,
          changes: {
            followed: false,
            counters: decrement('followers', state.entities[id]!.counters),
          },
        },
        {
          id: state.loggedInProfileId!,
          changes: {
            counters: decrement('following', state.entities[state.loggedInProfileId!]!.counters),
          },
        },
      ],
      state,
    ),
  ),

  on(
    ProfilesApiActions.followSuccess,
    ProfilesApiActions.unfollowSuccess,
    ProfilesApiActions.updateSuccess,
    (state, { profile }) => adapter.upsertOne(profile, state),
  ),
);
