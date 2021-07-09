import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

import { SettingsRoutingModule } from './settings-routing.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ImageCropModalComponent } from './components/image-crop-modal/image-crop-modal.component';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';
import { EditProfileContainerComponent } from './containers/edit-page-container.component';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [
    SettingsComponent,
    EditProfileComponent,
    EditProfileContainerComponent,
    ImagePickerComponent,
    ImageCropModalComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SettingsRoutingModule, ImageCropperModule],
})
export class SettingsModule {}
