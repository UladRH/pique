import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, MaxLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  @MaxLength(200)
  email: string;

  @ApiProperty({ example: '123456' })
  @Length(6, 64)
  password: string;
}
