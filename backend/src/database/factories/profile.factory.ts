import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { ProfileCounters } from '../../api/profiles/entities/profile-counters.entity';
import { ProfileFollower } from '../../api/profiles/entities/profile-follower.entity';
import { Profile } from '../../api/profiles/entities/profile.entity';

define(Profile, (faker: typeof Faker) => {
  const profile = new Profile();

  profile.screenName = faker.internet.userName() + '.' + faker.random.number();
  profile.displayName = faker.name.findName();
  profile.bio = faker.lorem.paragraph();
  profile.avatarUri = faker.image.avatar();
  profile.headerUri = faker.image.imageUrl(1500, 500, 'any', false, true);
  profile.counters = new ProfileCounters();
  Object.assign(profile.counters, { posts: 0, followers: 0, following: 0 });

  return profile;
});

define(ProfileFollower, (faker: typeof Faker) => {
  const pf = new ProfileFollower();

  return pf;
});
