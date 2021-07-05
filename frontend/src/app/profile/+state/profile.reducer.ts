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

  on(ProfileActions.loadedProfile, (state, { profile }) => adapter.addOne(profile, state)),
);
