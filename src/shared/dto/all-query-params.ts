import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class AllQueryParams {
  // Parametros Genericos

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 4;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  name?: string;

  // Parámetro para obtener un recurso específico

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  sermonName?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  preacherName?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  id?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  documentNumber?: string;
}
