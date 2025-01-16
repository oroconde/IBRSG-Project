import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDTO } from 'src/shared/dto/common-responses.dto';
import { Sermons } from 'src/shared/entities/Sermons';

export class SermonResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the sermon',
    example: 1,
  })
  sermonId: number;

  @ApiProperty({
    description: 'Name of the sermon',
    example: 'The Path of Righteousness',
  })
  sermonName: string;

  @ApiProperty({
    description: 'Code of the sermon',
    example: 'SER001',
  })
  sermonCode: string;

  @ApiProperty({
    description: 'Date of the sermon in YYYY-MM-DD format',
    example: '2024-11-10',
  })
  sermonDate: string | null;

  @ApiProperty({
    description: 'Summary of the sermon content',
    example:
      'This sermon explores the journey of faith and overcoming obstacles.',
  })
  summary: string | null;

  @ApiProperty({
    description: 'Duration of the sermon in ISO 8601 interval format',
    example: 'PT1H30M',
  })
  duration: string | null;

  @ApiProperty({
    description: 'Category ID to which the sermon belongs',
    example: 3,
  })
  categoryId: number;

  @ApiProperty({
    description: 'Preacher ID who delivered the sermon',
    example: 5,
  })
  preacherId: number;

  @ApiProperty({
    description: 'Indicates if the sermon is active',
    example: true,
  })
  isActive: boolean;

  constructor(entity: Sermons) {
    this.sermonId = entity.sermonId;
    this.sermonName = entity.sermonName;
    this.sermonCode = entity.sermonCode;
    this.sermonDate = entity.sermonDate;
    this.summary = entity.summary;
    this.duration = entity.duration;
    this.categoryId = entity.category?.categoryId;
    this.preacherId = entity.preacher?.preacherId;
    this.isActive = entity.isActive ?? true;
  }
}

export class ExampleSermon201DTO extends ApiResponseDTO<SermonResponseDto> {
  @ApiProperty({
    type: SermonResponseDto,
  })
  data: SermonResponseDto;
  @ApiProperty({
    example: 201,
  })
  statusCode: number;
}
