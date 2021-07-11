import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { SimpleModalService } from 'ngx-simple-modal';
import { EMPTY } from 'rxjs';
import { exhaustMap, filter, map, take } from 'rxjs/operators';

import { ImageCropModalComponent } from '../image-crop-modal/image-crop-modal.component';

interface ImagePickerState {
  initial: string;
  updated: string;

  cropModalOpts: {
    title: string;
    applyButton: string;
    width: number;
    height: number;
  };
}

@Injectable()
export class ImagePickerStore extends ComponentStore<ImagePickerState> {
  readonly image$ = this.select((state) => state.updated || state.initial);

  readonly cropModalOpts$ = this.select((state) => state.cropModalOpts);

  readonly setCropModalOpts = this.updater(
    (state, opts: Partial<ImagePickerState['cropModalOpts']>) => ({
      ...state,
      cropModalOpts: { ...state.cropModalOpts, ...opts },
    }),
  );

  readonly setInitialImage = this.updater((state, initial: string) => ({
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

  constructor(private readonly modalService: SimpleModalService) {
    super({
      initial: null,
      updated: null,

      cropModalOpts: {
        title: 'Crop your image',
        applyButton: 'Apply',
        width: 500,
        height: 500,
      },
    });
  }

  private readonly openCropModal = (file) =>
    this.cropModalOpts$.pipe(
      take(1),
      exhaustMap((opts) => this.modalService.addModal(ImageCropModalComponent, { ...opts, file })),
    );

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
}
