import { Allow } from 'class-validator';

export class QueryProfileDto {
  // @example "screen_name"
  @Allow() screenName: string;
}
