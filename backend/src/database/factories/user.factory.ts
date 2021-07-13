import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { User } from '../../api/auth/entities/user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();

  user.hashed_password = '$argon2i$v=19$m=8,t=1,p=1$MTIzNDU2Nzg$jvydyg'; // 123456
  user.email = faker.random.number() + '@example.com';

  return user;
});
