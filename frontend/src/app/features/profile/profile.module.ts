import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthModule } from '../../core/auth/auth.module';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEffects } from './state/profile.effects';
import * as fromProfile from './state/profile.reducer';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    EffectsModule.forFeature([ProfileEffects]),
    AuthModule,
  ],
  providers: [ProfileService],
  exports: [ProfileComponent],
})
export class ProfileModule {}
