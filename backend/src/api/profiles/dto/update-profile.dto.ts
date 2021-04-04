import { Matches, MaxLength } from 'class-validator';

import Regexp from '../../shared/regexp';

export class UpdateProfileDto {
  // @example "screen_name"
  @Matches(Regexp.ScreenName, { message: 'must have valid format' })
  screenName?: string;

  // @example "User Name"
  @MaxLength(40)
  displayName?: string;

  // @example "Hello, World!"
  @MaxLength(1000)
  bio?: string;
}
