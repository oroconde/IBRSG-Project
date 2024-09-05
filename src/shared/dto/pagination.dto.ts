import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDTO {
  @ApiProperty({
    example: 1,
    description: 'The current page number in the pagination.',
  })
  currentPage: number;

  @ApiProperty({
    example: 10,
    description:
      'The total number of pages available based on the total number of items and the limit per page.',
  })
  totalPages: number;

  @ApiProperty({
    example: 100,
    description: 'The total number of items available in the dataset.',
  })
  totalItems: number;

  @ApiProperty({
    example: 4,
    description: 'The number of items per page.',
  })
  limit: number;

  @ApiProperty({
    example: 0,
    description:
      'The offset, indicating the number of items skipped before starting to collect the result set.',
  })
  offset: number;
}
