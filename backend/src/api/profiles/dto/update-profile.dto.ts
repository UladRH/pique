import { IsOptional, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  // @example "User Name"
  @MaxLength(40)
  @IsOptional()
  displayName?: string;

  // @example "Hello, World!"
  @MaxLength(1000)
  @IsOptional()
  bio?: string;
}
