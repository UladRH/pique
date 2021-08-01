import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { decrement, increment } from '@pique/frontend/shared/utils/counter-reducer.utils';
import { AuthApiActions } from '@pique/frontend/auth/actions';
import { Profile } from '@pique/frontend/core/interfaces';
import { ProfileActions, ProfilesApiActions } from '@pique/frontend/profiles/actions';

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
    AuthApiActions.getUserSuccess,
    AuthApiActions.loginSuccess,
    AuthApiActions.registerSuccess,
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
