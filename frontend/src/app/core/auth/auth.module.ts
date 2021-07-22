import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ClickLoggedInDirective } from './click-logged-in.directive';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AuthEffects } from './state/auth.effects';
import * as fromAuth from './state/auth.reducer';

@NgModule({
  declarations: [ClickLoggedInDirective, LoginFormComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [ClickLoggedInDirective, LoginFormComponent, RegisterFormComponent],
})
export class AuthModule {}
