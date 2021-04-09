import { Injectable } from '@nestjs/common';
import sharp, { Sharp } from 'sharp';

import { AbstractImageStorage } from '../../shared/storage/abstract-image-storage';

@Injectable()
export class AvatarStorage extends AbstractImageStorage {
  protected processImage(image: Sharp): Sharp {
    return image
      .flatten({
        background: '#FFFFFF',
      })
      .resize({
        width: 400,
        height: 400,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
        withoutEnlargement: true,
      });
  }
}
