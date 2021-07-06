import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthModule } from '../auth/auth.module';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePageComponent } from './containers/profile-page.component';
import { ProfileEffects } from './state/profile.effects';
import * as fromProfile from './state/profile.reducer';

@NgModule({
  declarations: [ProfileComponent, ProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    EffectsModule.forFeature([ProfileEffects]),
    AuthModule,
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
