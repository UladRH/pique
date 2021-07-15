import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ example: 'Display Name' })
  @MaxLength(40)
  @IsOptional()
  displayName?: string;

  @ApiProperty({ example: 'Hello, World!' })
  @MaxLength(1000)
  @IsOptional()
  bio?: string;
}
