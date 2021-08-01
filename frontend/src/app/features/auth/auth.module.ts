import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ClickLoggedInDirective, IfOwnProfileDirective } from '@pique/frontend/auth/directives';
import { AuthEffects } from '@pique/frontend/auth/effects';
import * as fromAuth from '@pique/frontend/auth/reducers';

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
