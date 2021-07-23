import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ClickLoggedInDirective } from './directives/click-logged-in.directive';
import { AuthEffects } from './state/auth.effects';
import * as fromAuth from './state/auth.reducer';

@NgModule({
  declarations: [ClickLoggedInDirective],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [ClickLoggedInDirective],
})
export class AuthModule {}
