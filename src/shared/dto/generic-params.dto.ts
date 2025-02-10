import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { TransformToStringArray } from '../decorators/transform-to-string-array.decorator';

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
  // @TransformToObject<T>()
  order?: T;

  @IsOptional()
  @TransformToStringArray()
  @IsArray()
  @IsString({ each: true }) // Asegura que cada elemento en el array sea un string
  relations?: string[];
}
