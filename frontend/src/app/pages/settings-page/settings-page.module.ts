import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SettingsModule } from '@pique/frontend/settings';

import { SettingsPageRoutingModule } from './settings-page-routing.module';
import { SettingsPageComponent } from './settings-page.component';

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [CommonModule, SettingsPageRoutingModule, SettingsModule],
})
export class SettingsPageModule {}
