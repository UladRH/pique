import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileResolver } from '../../features/profile/profile.resolver';
import { ProfilePageComponent } from './profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    resolve: {
      profileId: ProfileResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
