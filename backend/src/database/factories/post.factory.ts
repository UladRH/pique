import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Post } from '../../api/posts/entities/post.entity';

define(Post, (faker: typeof Faker) => {
  const post = new Post();

  post.content = faker.lorem.sentence();

  return post;
});
