import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class QueryProfileDto {
  @ApiProperty({ example: 'screen_name' })
  @Allow()
  screenName: string;
}
