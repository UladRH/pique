import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProfileCounters } from './profile-counters.entity';

@Entity('profiles')
export class Profile {
  // @example 1
  @PrimaryGeneratedColumn()
  id: string;

  // @example "screen_name"
  @Column()
  screenName: string;

  @Exclude()
  @ApiHideProperty()
  @Column()
  indexedScreenName: string;

  // @example "Full Name"
  @Column()
  displayName?: string;

  // @example "Hello, World!"
  @Column()
  bio?: string;

  // @example "avatar.jpg"
  @Column()
  avatarUri?: string;

  // @example "avatar.jpg"
  @Column()
  headerUri?: string;

  @OneToOne(() => ProfileCounters, (c) => c.profile, { eager: true, cascade: true })
  counters: ProfileCounters = new ProfileCounters();

  @Exclude()
  @ApiHideProperty()
  @CreateDateColumn()
  createdAt: string;

  @Exclude()
  @ApiHideProperty()
  @UpdateDateColumn()
  updatedAt: string;

  static castToIndexedScreenName(screenName: string): string {
    return screenName.toLowerCase().replace(/[_.]/g, '');
  }

  @BeforeInsert()
  @BeforeUpdate()
  updateIndexedScreenName() {
    this.indexedScreenName = Profile.castToIndexedScreenName(this.screenName);
  }
}
