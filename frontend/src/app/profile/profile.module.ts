import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { ProfileService } from './profile.service';
import * as fromProfile from './+state/profile.reducer';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePageComponent } from './containers/profile-page.component';

@NgModule({
  declarations: [ProfileComponent, ProfilePageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
