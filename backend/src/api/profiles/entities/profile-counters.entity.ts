import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { Profile } from './profile.entity';

@Entity('profiles_counters')
export class ProfileCounters {
  @ApiHideProperty()
  @Exclude()
  @PrimaryColumn()
  profileId: Profile['id'];

  @ApiHideProperty()
  @Exclude()
  @OneToOne(() => Profile, (p) => p.counters)
  @JoinColumn()
  profile: Profile;

  @Column({ default: 0 })
  posts: number;

  @Column({ default: 0 })
  followers: number;

  @Column({ default: 0 })
  following: number;
}
