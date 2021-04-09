import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaAttachment } from './entities/media-attachment.entity';
import { MediaAttachmentStorage } from './storages/media-attachment.storage';

@Module({
  imports: [TypeOrmModule.forFeature([MediaAttachment])],
  controllers: [MediaController],
  providers: [MediaService, MediaAttachmentStorage],
  exports: [MediaService],
})
export class MediaModule {}
