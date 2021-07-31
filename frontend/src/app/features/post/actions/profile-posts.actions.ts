import { createAction, props } from '@ngrx/store';

import { Profile } from '../../../core/interfaces';

export const get = createAction('[Profile Posts] Get Posts', props<{ profile: Profile }>());

export const next = createAction('[Profile Posts] Next Posts', props<{ profile: Profile }>());
