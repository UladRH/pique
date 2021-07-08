import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditProfileContainerComponent } from './containers/edit-page-container.component';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent, EditProfileComponent, EditProfileContainerComponent],
  imports: [CommonModule, ReactiveFormsModule, SettingsRoutingModule],
})
export class SettingsModule {}
