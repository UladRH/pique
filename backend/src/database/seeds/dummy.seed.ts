import { Factory, Seeder } from 'typeorm-seeding';

import { User } from '../../api/auth/entities/user.entity';
import { MediaAttachment } from '../../api/media/entities/media-attachment.entity';
import { Post } from '../../api/posts/entities/post.entity';
import { ProfileFollower } from '../../api/profiles/entities/profile-follower.entity';
import { Profile } from '../../api/profiles/entities/profile.entity';

export default class DummySeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    let testProfile;
    const otherProfiles = [];

    // @test profile with 50 posts
    {
      testProfile = await factory(Profile)().create({
        screenName: 'test',
        counters: { posts: 50, followers: 0, following: 20 } as any,
      });

      await factory(User)().create({
        email: 'test@example.com',
        profile: testProfile,
      });

      const posts = await factory(Post)().createMany(50, { profile: testProfile });

      for (const post of posts) {
        await factory(MediaAttachment)().create({ profile: testProfile, post });
      }
    }

    // 20 profiles with 10 posts each
    {
      for (let i = 1; i <= 20; i++) {
        const name = `test${i}`;

        const profile = await factory(Profile)().create({
          screenName: name,
          counters: { posts: 10, followers: 1, following: 0 } as any,
        });
        await factory(User)().create({ email: name + '@example.com', profile });

        const posts = await factory(Post)().createMany(10, { profile });
        for (const post of posts) {
          await factory(MediaAttachment)().create({ profile, post });
        }

        otherProfiles.push(profile);
      }
    }

    // follow @test to other profiles
    {
      for (const profile of otherProfiles) {
        await factory(ProfileFollower)().create({
          profile: testProfile,
          targetProfile: profile,
        });
      }
    }
  }
}
