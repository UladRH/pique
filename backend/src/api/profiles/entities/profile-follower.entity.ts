import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { Profile } from './profile.entity';

@Entity('profiles_followers')
export class ProfileFollower {
  @ApiHideProperty()
  @Exclude()
  @PrimaryColumn()
  profileId: Profile['id'];

  @ApiHideProperty()
  @Exclude()
  @PrimaryColumn()
  targetProfileId: Profile['id'];

  @ApiHideProperty()
  @Exclude()
  @OneToOne(() => Profile, (p) => p.counters)
  @JoinColumn()
  profile: Profile;

  @ApiHideProperty()
  @Exclude()
  @OneToOne(() => Profile, (p) => p.counters)
  @JoinColumn()
  targetProfile: Profile;

  @ApiHideProperty()
  @Exclude()
  @CreateDateColumn()
  createdAt: string;
}
