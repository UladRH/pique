import { ArrayMaxSize, ArrayUnique, IsNumberString, IsOptional, MaxLength } from 'class-validator';

import { MediaAttachment } from '../../media/entities/media-attachment.entity';

export class CreatePostDto {
  // @example "Hello, World!"
  @IsOptional()
  @MaxLength(1000)
  content?: string;

  // @example ['1', '2']
  @IsOptional()
  @IsNumberString({ no_symbols: true }, { each: true })
  @ArrayMaxSize(10)
  @ArrayUnique()
  mediaAttachmentsIds: MediaAttachment['id'][] = [];
}
