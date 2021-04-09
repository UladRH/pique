import { StorageService } from '@codebrew/nestjs-storage';
import { Injectable } from '@nestjs/common';
import { BinaryLike, createHash } from 'crypto';
import path from 'path';
import sharp, { FormatEnum, Sharp } from 'sharp';

@Injectable()
export abstract class AbstractImageStorage {
  constructor(private readonly storage: StorageService) {}

  protected filePathPrefix = '';

  protected abstract processImage(image: Sharp): Sharp;

  public async save(file: Express.Multer.File): Promise<string> {
    const fileFormat: keyof FormatEnum = 'jpg';
    const image = await this.processImage(sharp(file.buffer)).toFormat(fileFormat).toBuffer();
    const uri = this.generateUri(image, fileFormat);

    await this.storage.getDisk().put(uri, image);

    return uri;
  }

  protected generateUri(fileContent: Buffer, extension: string): string {
    const hash = this.hash(fileContent);

    return path.join(
      this.filePathPrefix,
      hash.slice(0, 2),
      hash.slice(2, 4),
      hash.slice(4) + '.' + extension,
    );
  }

  protected hash(fileContent: BinaryLike): string {
    // FIXME: with async
    return createHash('sha256').update(fileContent).digest('hex');
  }
}
