import { MaxLength } from 'class-validator';

export class UpdateProfileDto {
  // @example "User Name"
  @MaxLength(40)
  displayName?: string;

  // @example "Hello, World!"
  @MaxLength(1000)
  bio?: string;
}
