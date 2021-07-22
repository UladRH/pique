import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { SimpleModalComponent } from 'ngx-simple-modal';

interface ImageCropModal {
  file: File;
  title?: string;
  applyButton?: string;
  width?: number;
  height?: number;
}

@Component({
  selector: 'app-image-crop-modal',
  templateUrl: './image-crop-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCropModalComponent extends SimpleModalComponent<ImageCropModal, string | null> {
  file!: File;

  title: string = 'Crop your image';
  applyButton: string = 'Apply';
  width: number = 500;
  height: number = 500;

  dataUriImage: string | null = null;

  constructor() {
    super();
  }

  imageCropped($event: ImageCroppedEvent) {
    this.dataUriImage = $event.base64 ?? null;
  }

  confirm() {
    this.result = this.dataUriImage;
    this.close();
  }
}
