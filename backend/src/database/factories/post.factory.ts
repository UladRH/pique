import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { PostLike } from '../../api/posts/entities/post-like.entity';
import { Post } from '../../api/posts/entities/post.entity';

define(Post, (faker: typeof Faker) => {
  const post = new Post();

  post.content = faker.lorem.sentence();
  post.createdAt = post.updatedAt = faker.date
    .between('Jun 26, 2019 8:25 PM', 'Aug 22, 2020 9:49 PM')
    .toString();

  return post;
});

define(PostLike, (faker: typeof Faker) => {
  const postLike = new PostLike();

  return postLike;
});
