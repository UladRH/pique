import { Controller, Get, Param, Query } from '@nestjs/common';

import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { QueryProfileDto } from './dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // TODO

  @Get()
  getProfileByQuery(@Query() query: QueryProfileDto): Promise<Profile> {
    return this.profilesService.getByScreenName(query.screenName);
  }

  @Get(':profileId')
  getProfileById(@Param('profileId') id: string): Promise<Profile> {
    return this.profilesService.getById(id);
  }
}
