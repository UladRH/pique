import { Factory, Seeder } from 'typeorm-seeding';

import { User } from '../../api/auth/entities/user.entity';
import { MediaAttachment } from '../../api/media/entities/media-attachment.entity';
import { PostLike } from '../../api/posts/entities/post-like.entity';
import { Post } from '../../api/posts/entities/post.entity';
import { ProfileFollower } from '../../api/profiles/entities/profile-follower.entity';
import { Profile } from '../../api/profiles/entities/profile.entity';

export default class DummySeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const otherProfiles = [
      ...(await factory(Profile)().createMany(30, {
        counters: { posts: 0, followers: 1, following: 0 } as any,
      })),
      ...(await factory(Profile)().createMany(20, {
        counters: { posts: 20, followers: 1, following: 1 } as any,
      })),
    ];

    const testProfile = await factory(Profile)().create({
      screenName: 'Test_Profile',
      displayName: 'Test Profile',
      counters: { posts: 100, followers: 20, following: 50 } as any,
    });

    for (const profile of otherProfiles) {
      await factory(ProfileFollower)().create({
        profile: testProfile,
        targetProfile: profile,
      });
    }

    for (const profile of otherProfiles.slice(0, 30)) {
      await factory(ProfileFollower)().create({
        profile: profile,
        targetProfile: testProfile,
      });
    }

    await factory(User)().create({
      email: 'test@example.com',
      profile: testProfile,
    });

    const testPosts = await factory(Post)().createMany(50, {
      profile: testProfile,
      mediaAttachments: await factory(MediaAttachment)().createMany(1, { profile: testProfile }),
      counters: { likes: Math.floor(Math.random() * 50) } as any,
    });

    for (const post of testPosts) {
      for (const profile of otherProfiles.slice(post.counters.likes)) {
        await factory(PostLike)().create({
          profile: profile,
          post: post,
        });
      }
    }

    await factory(Post)().createMany(50, {
      profile: testProfile,
      mediaAttachments: await factory(MediaAttachment)().createMany(1, { profile: testProfile }),
    });

    for (const profile of otherProfiles.slice(30, 50)) {
      await factory(Post)().createMany(20, { profile });
    }
  }
}
