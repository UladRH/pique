import { Injectable } from '@nestjs/common';
import sharp, { Sharp } from 'sharp';

import { AbstractImageStorage } from '../../shared/storage/abstract-image-storage';

@Injectable()
export class HeaderStorage extends AbstractImageStorage {
  protected processImage(image: Sharp): Sharp {
    return image
      .flatten({
        background: '#FFFFFF',
      })
      .resize({
        width: 1500,
        height: 500,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
        // withoutEnlargement: true
      });
  }
}
