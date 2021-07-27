import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthModule } from '../auth/auth.module';
import { ProfileService } from './profile.service';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfileSectionComponent } from './containers/profile-section.component';
import { ProfileEffects } from './state/profile.effects';
import * as fromProfile from './state/profile.reducer';

@NgModule({
  declarations: [ProfileDetailsComponent, ProfileSectionComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    EffectsModule.forFeature([ProfileEffects]),
    AuthModule,
  ],
  providers: [ProfileService],
  exports: [ProfileSectionComponent],
})
export class ProfileModule {}
