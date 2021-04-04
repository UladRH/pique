import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationQueryDto {
  @Type()
  @IsInt()
  @IsPositive()
  @IsOptional()
  page: number = 1;

  @Type()
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Max(100)
  perPage: number = 20;
}
