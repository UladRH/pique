import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, Matches, MaxLength } from 'class-validator';

import Regexp from '../../../shared/regexp';

export class RegisterUserDto {
  @ApiProperty({ example: 'screen_name' })
  @Matches(Regexp.ScreenName, { message: 'must have valid format' })
  screenName?: string;

  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  @MaxLength(200)
  email: string;

  @ApiProperty({ example: '123456' })
  @Length(6, 64)
  password: string;
}
