import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSermonDto {
  @ApiProperty({
    description: 'Name of the sermon',
    example: 'The Path of Righteousness',
  })
  @IsNotEmpty()
  @IsString()
  sermonName: string;

  @ApiProperty({
    description: 'Code of the sermon',
    example: 'SER001',
  })
  @IsNotEmpty()
  @IsString()
  sermonCode: string;

  @ApiProperty({
    description: 'Date of the sermon in YYYY-MM-DD format',
    example: '2024-11-10',
  })
  @IsNotEmpty()
  @IsDateString()
  sermonDate: string;

  @ApiProperty({
    description: 'Summary of the sermon content',
    example:
      'This sermon explores the journey of faith and overcoming obstacles.',
    required: false,
  })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty({
    description: 'Duration of the sermon in ISO 8601 interval format',
    example: 'PT1H30M',
    required: false,
  })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({
    description: 'Category ID to which the sermon belongs',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: 'Preacher ID who delivered the sermon',
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  preacherId: number;
}
