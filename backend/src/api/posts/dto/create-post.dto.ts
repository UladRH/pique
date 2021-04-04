import { MaxLength } from 'class-validator';

export class CreatePostDto {
  // @example "Hello, World!"
  @MaxLength(1000)
  content: string;
}
