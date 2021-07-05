import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { ProfileService } from './profile.service';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePageComponent } from './containers/profile-page.component';
import * as fromProfile from './state/profile.reducer';

@NgModule({
  declarations: [ProfileComponent, ProfilePageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
