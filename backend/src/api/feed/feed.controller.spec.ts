import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { factory, useSeeding } from 'typeorm-seeding';

import { PaginationQueryDto } from '../shared/pagination/pagination-query.dto';
import { PostsService } from '../posts/posts.service';
import { ProfilesService } from '../profiles/profiles.service';
import { FeedController } from './feed.controller';
import { Post } from '../posts/entities/post.entity';
import { Profile } from '../profiles/entities/profile.entity';

describe('FeedController', () => {
  let controller: FeedController;
  let postsService: PostsService;
  let profilesService: ProfilesService;

  let someProfile: Profile;
  let manyProfiles: Profile[];
  let manyPosts: Post[];

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [
        {
          provide: PostsService,
          useValue: createMock<PostsService>(),
        },
        {
          provide: ProfilesService,
          useValue: createMock<ProfilesService>(),
        },
      ],
    }).compile();

    controller = module.get(FeedController);
    postsService = module.get(PostsService);
    profilesService = module.get(ProfilesService);

    someProfile = await factory(Profile)().make({ id: '1' });
    manyProfiles = await factory(Profile)().makeMany(5, { id: '2' });
    manyPosts = await factory(Post)().makeMany(5, { id: '1' });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFeed', () => {
    const pagination = new PaginationQueryDto();

    it('should return viewer feed', async () => {
      jest.spyOn(profilesService, 'findFollowingOf').mockResolvedValue(manyProfiles);
      jest.spyOn(postsService, 'find').mockResolvedValue(manyPosts);

      await expect(controller.getFeed(pagination, someProfile)).resolves.toEqual(manyPosts);
      expect(postsService.find).toBeCalledWith({
        pagination: expect.any(Object),
        authorsIds: expect.arrayContaining([
          someProfile.id,
          ...manyProfiles.map((profile) => profile.id),
        ]),
      });
    });
  });
});
