import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { SimpleModalService } from 'ngx-simple-modal';
import { EMPTY } from 'rxjs';
import { exhaustMap, filter, map } from 'rxjs/operators';

import { ImageCropModalComponent } from '../image-crop-modal/image-crop-modal.component';

interface ImagePickerState {
  initial: string;
  updated: string;
}

@Injectable()
export class ImagePickerStore extends ComponentStore<ImagePickerState> {
  constructor(private readonly modalService: SimpleModalService) {
    super({ initial: null, updated: null });
  }

  readonly image$ = this.select((state) => state.updated || state.initial);

  readonly setInitial = this.updater((state, initial: string) => ({
    ...state,
    initial,
    updated: null,
  }));

  readonly updateImage = this.updater((state, image: string) => ({
    ...state,
    updated: image,
  }));

  readonly removeImage = this.updater((state) => {
    if (state.updated) {
      return { ...state, updated: null };
    } else if (state.initial) {
      return { ...state, initial: null };
    } else {
      return state;
    }
  });

  readonly onFileChange = this.effect<InputEvent>(($event) =>
    $event.pipe(
      map(($event: any) => $event.target.files[0]),
      filter((file) => !!file),
      exhaustMap((file) =>
        this.openCropModal(file).pipe(
          filter((result) => !!result),
          tapResponse(
            (image) => this.updateImage(image),
            () => EMPTY,
          ),
        ),
      ),
    ),
  );

  private readonly openCropModal = (file) =>
    this.modalService.addModal(ImageCropModalComponent, {
      title: 'Crop your image',
      button: 'Apply',
      file,
      width: 400,
      height: 400,
    });
}
