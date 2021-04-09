import { Injectable } from '@nestjs/common';
import sharp, { Sharp } from 'sharp';

import { AbstractImageStorage } from '../../shared/storage/abstract-image-storage';

@Injectable()
export class MediaAttachmentStorage extends AbstractImageStorage {
  protected processImage(image: Sharp): Sharp {
    return image
      .flatten({
        background: '#FFFFFF',
      })
      .resize({
        width: 1024,
        height: 1024,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      });
  }
}
