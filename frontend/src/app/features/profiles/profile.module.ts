import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProfilesService } from '@pique/frontend/profiles/services';
import { AuthModule } from '@pique/frontend/auth';
import { ProfileDetailsComponent } from '@pique/frontend/profiles/components';
import {
  ProfileFollowButtonComponent,
  ProfileSectionComponent,
} from '@pique/frontend/profiles/containers';
import { ProfileEffects } from '@pique/frontend/profiles/effects';
import * as fromProfile from '@pique/frontend/profiles/reducers';

import { LinkToProfileDirective } from './directives/link-to-profile.directive';

@NgModule({
  declarations: [
    ProfileDetailsComponent,
    ProfileSectionComponent,
    ProfileFollowButtonComponent,
    LinkToProfileDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromProfile.profilesFeatureKey, fromProfile.reducers),
    EffectsModule.forFeature([ProfileEffects]),
    AuthModule,
  ],
  providers: [ProfilesService],
  exports: [ProfileSectionComponent, ProfileFollowButtonComponent, LinkToProfileDirective],
})
export class ProfileModule {}
