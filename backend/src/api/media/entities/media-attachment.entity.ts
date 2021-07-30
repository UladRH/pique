import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from '../../posts/entities/post.entity';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity('media_attachments')
export class MediaAttachment {
  @ApiProperty({ example: '1' })
  @Type(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @Transform(({ value }) =>
    !value || value?.startsWith('https://') ? value : `http://localhost:4200/usercontent/${value}`,
  ) //FIXME
  @Column()
  fileUri: string;

  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => Profile)
  profile: Profile;

  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => Post)
  post?: Post;

  @ApiHideProperty()
  @Exclude()
  @CreateDateColumn()
  createdAt: string;

  @ApiHideProperty()
  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;
}
