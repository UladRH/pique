import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ClickLoggedInDirective, IfOwnProfileDirective } from './directives';
import { AuthEffects } from './effects';
import * as fromAuth from './reducers';

@NgModule({
  declarations: [ClickLoggedInDirective, IfOwnProfileDirective],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [ClickLoggedInDirective, IfOwnProfileDirective],
})
export class AuthModule {}
