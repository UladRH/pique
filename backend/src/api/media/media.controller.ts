import { Controller, Get, Param, Post, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PqFileUploadEndpoint } from '../shared/decorators/file-upload-endpoint.decorator';
import { PqRequiresAuth } from '../shared/decorators/require-auth.decorator';
import { PqUser } from '../shared/decorators/user.decorator';
import { MediaService } from './media.service';
import { Profile } from '../profiles/entities/profile.entity';
import { MediaAttachment } from './entities/media-attachment.entity';

@ApiTags('Media')
@Controller('/api/v1/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @PqRequiresAuth()
  @PqFileUploadEndpoint()
  @ApiOperation({ summary: 'Create a new media attachment' })
  @ApiResponse({ status: 201, type: MediaAttachment })
  @Post()
  createMedia(@PqUser('profile') profile: Profile, @UploadedFile() file: Express.Multer.File) {
    return this.mediaService.create(profile, file);
  }

  @Get(':mediaId')
  @ApiOperation({ summary: 'Get a media attachment by id' })
  @ApiResponse({ status: 200, type: MediaAttachment })
  @ApiResponse({ status: 404, description: 'Not Found' })
  getMediaById(@Param('mediaId') id: string) {
    return this.mediaService.getById(id);
  }
}
