import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { ProfileCounters } from '../../api/profiles/entities/profile-counters.entity';
import { ProfileFollower } from '../../api/profiles/entities/profile-follower.entity';
import { Profile } from '../../api/profiles/entities/profile.entity';

define(Profile, (faker: typeof Faker) => {
  const profile = new Profile();

  profile.screenName = faker.internet.userName() + '_' + faker.random.number();
  profile.displayName = faker.name.findName();
  profile.bio = faker.lorem.paragraph();
  profile.avatarUri =
    'https://robohash.org/set_set3/bgset_bg1/' + faker.random.alphaNumeric(5) + '?size=500x500';
  profile.headerUri = 'https://picsum.photos/seed/' + faker.random.alphaNumeric(5) + '/1500/500';
  profile.counters = new ProfileCounters();
  Object.assign(profile.counters, { posts: 0, followers: 0, following: 0 });

  return profile;
});

define(ProfileFollower, (faker: typeof Faker) => {
  const pf = new ProfileFollower();

  return pf;
});
