import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';

import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto';
import { AvatarStorage } from './storages/avatar.storage';
import { HeaderStorage } from './storages/header.storage';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,
    private readonly avatarStorage: AvatarStorage,
    private readonly headerStorage: HeaderStorage,
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
}
