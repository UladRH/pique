import { createAction, props } from '@ngrx/store';

import { LoginUserDto, RegisterUserDto } from '@pique/frontend/core/interfaces';

export const login = createAction('[Login Form] Login', props<{ dto: LoginUserDto }>());

export const loginPageUnload = createAction('[Login Form] Unload');

export const register = createAction('[Register Form] Register', props<{ dto: RegisterUserDto }>());

export const registerPageUnload = createAction('[Register Form] Unload');
