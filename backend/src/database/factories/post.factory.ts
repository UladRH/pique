import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { PostLike } from '../../api/posts/entities/post-like.entity';
import { Post } from '../../api/posts/entities/post.entity';

define(Post, (faker: typeof Faker) => {
  const post = new Post();

  post.content = faker.lorem.sentence();

  return post;
});

define(PostLike, (faker: typeof Faker) => {
  const postLike = new PostLike();

  return postLike;
});
