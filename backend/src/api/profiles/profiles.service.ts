import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, In, Repository } from 'typeorm';

import { PaginationQueryDto } from '../shared/pagination/pagination-query.dto';
import { ProfilesCountersService } from './profiles-counters.service';
import { ProfileFollower } from './entities/profile-follower.entity';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto';
import { AvatarStorage } from './storages/avatar.storage';
import { HeaderStorage } from './storages/header.storage';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(ProfileFollower) private profileFollowerRepo: Repository<ProfileFollower>,
    private readonly avatarStorage: AvatarStorage,
    private readonly headerStorage: HeaderStorage,
    private readonly profilesCounters: ProfilesCountersService,
  ) {}

  private async getBy(conditions: FindConditions<Profile>): Promise<Profile> {
    const profile = await this.profileRepo.findOne(conditions);

    if (!profile) {
      throw new NotFoundException('Profile Not Found');
    }

    return profile;
  }

  getById(id: string): Promise<Profile> {
    return this.getBy({ id });
  }

  getByScreenName(screenName: string): Promise<Profile> {
    return this.getBy({ indexedScreenName: Profile.castToIndexedScreenName(screenName) });
  }

  async existsByScreenName(screenName: string): Promise<boolean> {
    try {
      await this.getByScreenName(screenName);
    } catch {
      return false;
    }

    return true;
  }

  async findFollowersOf(profile, opts: { pagination?: PaginationQueryDto }): Promise<Profile[]> {
    const { page, perPage } = opts.pagination ?? new PaginationQueryDto();
    const takeSkipPagination = {
      take: perPage,
      skip: perPage * (page - 1),
    };

    return (
      await this.profileFollowerRepo.find({
        where: { targetProfile: profile },
        relations: ['profile'],
        ...takeSkipPagination,
        order: { createdAt: 'DESC' },
      })
    ).map((value) => value.profile);
  }

  async findFollowingOf(profile, opts: { pagination?: PaginationQueryDto }): Promise<Profile[]> {
    const { page, perPage } = opts.pagination ?? new PaginationQueryDto();
    const takeSkipPagination = {
      take: perPage,
      skip: perPage * (page - 1),
    };

    return (
      await this.profileFollowerRepo.find({
        where: { profile },
        relations: ['targetProfile'],
        ...takeSkipPagination,
        order: { createdAt: 'DESC' },
      })
    ).map((value) => value.targetProfile);
  }

  update(profile: Profile, dto: UpdateProfileDto): Promise<Profile> {
    Object.assign(profile, dto);
    return this.profileRepo.save(profile);
  }

  async updateAvatar(profile: Profile, file: Express.Multer.File): Promise<Profile> {
    profile.avatarUri = await this.avatarStorage.save(file);
    return this.profileRepo.save(profile);
  }

  removeAvatar(profile: Profile): Promise<Profile> {
    profile.avatarUri = null;
    return this.profileRepo.save(profile);
  }

  async updateHeader(profile: Profile, file: Express.Multer.File): Promise<Profile> {
    profile.headerUri = await this.headerStorage.save(file);
    return this.profileRepo.save(profile);
  }

  removeHeader(profile: Profile): Promise<Profile> {
    profile.headerUri = null;
    return this.profileRepo.save(profile);
  }

  async setFollowed(target: Profile, viewer: Profile, followed: boolean): Promise<Profile> {
    if (target.id == viewer.id) {
      throw new ForbiddenException();
    }

    const profileFollower = { targetProfile: target, profile: viewer };
    const isProfileFollower = !!(await this.profileFollowerRepo.findOne({
      where: profileFollower,
    }));

    if (!isProfileFollower && followed == true) {
      await this.profileFollowerRepo.insert(profileFollower);
      await this.profilesCounters.change(target, 'followers', '+');
      await this.profilesCounters.change(viewer, 'following', '+');
    } else if (isProfileFollower && followed == false) {
      await this.profileFollowerRepo.delete(profileFollower);
      await this.profilesCounters.change(target, 'followers', '-');
      await this.profilesCounters.change(viewer, 'following', '-');
    }

    target.followed = followed;

    return target;
  }

  populateViewerSpecific(singleProfile: Profile, viewer?: Profile): Promise<Profile>;
  populateViewerSpecific(arrayOfProfiles: Profile[], viewer?: Profile): Promise<Profile[]>;
  async populateViewerSpecific(
    profiles: Profile | Profile[],
    viewer?,
  ): Promise<Profile | Profile[]> {
    if (!(profiles instanceof Array)) {
      return (await this.populateViewerSpecific([profiles], viewer))[0];
    }

    let followingIds = [];
    if (viewer) {
      followingIds = (
        await this.profileFollowerRepo.find({
          select: ['targetProfileId'],
          where: {
            profileId: viewer.id,
            targetProfileId: In(profiles.map((profile) => profile.id)),
          },
        })
      ).map((like) => like.targetProfileId);
    }

    return profiles.map((profile) => {
      profile.followed = followingIds.includes(profile.id);
      return profile;
    });
  }
}
