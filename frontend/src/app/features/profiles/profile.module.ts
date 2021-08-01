import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthModule } from '../auth/auth.module';
import { ProfilesService } from './services';
import { ProfileDetailsComponent } from './components';
import { ProfileFollowButtonComponent, ProfileSectionComponent } from './containers';
import { ProfileEffects } from './effects';
import * as fromProfile from './reducers';

@NgModule({
  declarations: [ProfileDetailsComponent, ProfileSectionComponent, ProfileFollowButtonComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromProfile.profilesFeatureKey, fromProfile.reducers),
    EffectsModule.forFeature([ProfileEffects]),
    AuthModule,
  ],
  providers: [ProfilesService],
  exports: [ProfileSectionComponent, ProfileFollowButtonComponent],
})
export class ProfileModule {}
