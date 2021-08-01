import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';

import {
  EditProfileComponent,
  ImageCropModalComponent,
  ImagePickerComponent,
} from '@pique/frontend/settings/components';
import { EditProfileContainerComponent } from '@pique/frontend/settings/containers';
import { SettingsComponent } from '@pique/frontend/settings/settings.component';

@NgModule({
  declarations: [
    SettingsComponent,
    EditProfileComponent,
    EditProfileContainerComponent,
    ImagePickerComponent,
    ImageCropModalComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ImageCropperModule],
  exports: [SettingsComponent],
})
export class SettingsModule {}
