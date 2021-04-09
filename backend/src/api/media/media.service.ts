import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from '../profiles/entities/profile.entity';
import { MediaAttachment } from './entities/media-attachment.entity';
import { MediaAttachmentStorage } from './storages/media-attachment.storage';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaAttachment)
    private mediaRepo: Repository<MediaAttachment>,
    private readonly mediaStorage: MediaAttachmentStorage,
  ) {}

  async create(profile: Profile, file: Express.Multer.File) {
    const media = new MediaAttachment();
    media.profile = profile;
    media.fileUri = await this.mediaStorage.save(file);

    return this.mediaRepo.save(media);
  }

  async getById(id: string) {
    const media = await this.mediaRepo.findOne(id);

    if (!media) {
      throw new NotFoundException('Media Attachment Not Found');
    }

    return media;
  }
}
