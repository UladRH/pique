import { MaxLength } from 'class-validator';

export class UpdatePostDto {
  // @example "Hello, World!"
  @MaxLength(1000)
  content?: string;
}
