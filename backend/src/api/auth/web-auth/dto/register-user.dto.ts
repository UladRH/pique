import { IsEmail, Length, Matches, MaxLength } from 'class-validator';

import Regexp from '../../../shared/regexp';

export class RegisterUserDto {
  // @example "screen_name"
  @Matches(Regexp.ScreenName, { message: 'must have valid format' })
  screenName?: string;

  // @example "user@example.com"
  @IsEmail()
  @MaxLength(200)
  email: string;

  // @example "qwerty"
  @Length(6, 64)
  password: string;
}
