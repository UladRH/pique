import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProfileCounters } from './entities/profile-counters.entity';
import { Profile } from './entities/profile.entity';

type CounterFields = keyof Omit<ProfileCounters, 'profile' | 'profileId'>;

@Injectable()
export class ProfilesCountersService {
  constructor(
    @InjectRepository(ProfileCounters) private readonly countersRepo: Repository<ProfileCounters>,
  ) {}

  async change(profile: Profile, key: CounterFields, action: '+' | '-', value = 1): Promise<void> {
    if (action == '+') {
      profile.counters[key]++;
    } else if (action == '-') {
      profile.counters[key]--;
    }

    await this.countersRepo.update(profile.id, { [key]: () => `${key} ${action} ${value}` });
  }
}
