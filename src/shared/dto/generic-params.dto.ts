import { Type } from 'class-transformer';
import { IsArray, IsInt, IsObject, IsOptional, Min } from 'class-validator';

export class GenericParamsDTO<T = undefined> {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 4;

  @IsOptional()
  @IsObject()
  order?: T;

  @IsOptional()
  @IsArray()
  relations?: string[];
}
