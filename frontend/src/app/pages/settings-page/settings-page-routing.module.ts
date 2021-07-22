import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditProfileContainerComponent } from '../../features/settings/containers/edit-page-container.component';
import { SettingsPageComponent } from './settings-page.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile',
      },
      {
        path: 'profile',
        component: EditProfileContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
