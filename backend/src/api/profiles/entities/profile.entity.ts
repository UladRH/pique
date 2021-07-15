import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Transform, Type } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProfileCounters } from './profile-counters.entity';

@Entity('profiles')
export class Profile {
  @ApiProperty({ example: '1' })
  @Type(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: 'screen_name' })
  @Column()
  screenName: string;

  @Exclude()
  @ApiHideProperty()
  @Column()
  indexedScreenName: string;

  @ApiProperty({ example: 'Display Name' })
  @Column()
  displayName?: string;

  @ApiProperty({ example: 'Hello, World!' })
  @Column()
  bio?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @Column()
  @Transform(({ value }) =>
    !value || value?.startsWith('https://') ? value : `http://localhost:4200/usercontent/${value}`,
  ) //FIXME
  avatarUri?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @Column()
  @Transform(({ value }) =>
    !value || value?.startsWith('https://') ? value : `http://localhost:4200/usercontent/${value}`,
  ) //FIXME
  headerUri?: string;

  @ApiProperty({ type: () => ProfileCounters })
  @OneToOne(() => ProfileCounters, (c) => c.profile, { eager: true, cascade: true })
  counters: ProfileCounters = new ProfileCounters();

  @ApiHideProperty()
  @ManyToMany(() => Profile, (p) => p.following)
  @JoinTable({
    name: 'profiles_followers',
    joinColumn: { name: 'target_profile_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'profile_id', referencedColumnName: 'id' },
  })
  followers: Profile[];

  @ApiHideProperty()
  @ManyToMany(() => Profile, (p) => p.followers)
  @JoinTable({
    name: 'profiles_followers',
    joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'target_profile_id', referencedColumnName: 'id' },
  })
  following: Profile[];

  @ApiPropertyOptional({ example: false })
  followed: boolean;

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
