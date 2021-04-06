import { IsEmail, Length, MaxLength } from 'class-validator';

export class LoginUserDto {
  // @example "user@example.com"
  @IsEmail()
  @MaxLength(200)
  email: string;

  // @example "qwerty"
  @Length(6, 64)
  password: string;
}
