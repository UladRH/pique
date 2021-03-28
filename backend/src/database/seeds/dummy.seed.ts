import { Factory, Seeder } from 'typeorm-seeding';

import { Post } from '../../api/posts/entities/post.entity';
import { Profile } from '../../api/profiles/entities/profile.entity';

export default class DummySeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const profiles = await factory(Profile)().createMany(40);

    await factory(Post)().createMany(100, { profile: profiles[0] });

    for (const profile of profiles.slice(1, 20)) {
      await factory(Post)().createMany(20, { profile });
    }
  }
}
