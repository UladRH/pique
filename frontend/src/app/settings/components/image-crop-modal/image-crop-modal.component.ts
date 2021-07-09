import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { SimpleModalComponent } from 'ngx-simple-modal';

interface ImageCropModal {
  title: string;
  button: string;
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
  button: string;
  file: File;
  width: number;
  height: number;

  constructor() {
    super();
  }

  image = null;

  imageCropped($event: ImageCroppedEvent) {
    this.image = $event.base64;
  }

  confirm() {
    this.result = this.image;
    this.close();
  }
}
