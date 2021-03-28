import { ApiHideProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profiles')
export class Profile {
  // @example 1
  @PrimaryGeneratedColumn()
  id: string;

  // @example "screen_name"
  @Column()
  screenName: string;

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

  // @example "2021-03-28T13:10:51.000Z"
  @CreateDateColumn()
  createdAt: string;

  // @example "2021-03-28T13:10:51.000Z"
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
