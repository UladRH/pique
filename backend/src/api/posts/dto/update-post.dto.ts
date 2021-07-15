import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ example: 'Hello, World!' })
  @MaxLength(1000)
  content?: string;
}
