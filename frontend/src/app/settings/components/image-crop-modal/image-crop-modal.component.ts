import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { SimpleModalComponent } from 'ngx-simple-modal';

interface ImageCropModal {
  title: string;
  applyButton: string;
  file: File;
  width: number;
  height: number;
}

@Component({
  selector: 'app-image-crop-modal',
  templateUrl: './image-crop-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCropModalComponent extends SimpleModalComponent<ImageCropModal, string> {
  title: string;
  applyButton: string;
  file: File;
  width: number;
  height: number;

  dataUriImage = null;

  constructor() {
    super();
  }

  imageCropped($event: ImageCroppedEvent) {
    this.dataUriImage = $event.base64;
  }

  confirm() {
    this.result = this.dataUriImage;
    this.close();
  }
}
