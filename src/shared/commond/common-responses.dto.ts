import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDTO<T> {
  @ApiProperty()
  data: T;

  @ApiProperty({
    example: 'Successful operation',
  })
  description: string;

  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'OK',
  })
  statusText: string;
}

export class ErrorResponseDTO {
  @ApiProperty({
    example: 'Resource not found',
  })
  description: string;

  @ApiProperty({
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    example: 'The requested resource was not found',
  })
  statusText: string;
}

export class BadRequestResponseDTO extends ErrorResponseDTO {
  @ApiProperty({
    example: 'The activeRecord field is required',
  })
  description: string;

  @ApiProperty({
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Bad request',
  })
  statusText: string;
}

export class UnauthorizedResponseDTO extends ErrorResponseDTO {
  @ApiProperty({
    example: 'You do not have permissions',
  })
  description: string;

  @ApiProperty({
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Unauthorized',
  })
  statusText: string;
}

export class ConflictResponseDTO extends ErrorResponseDTO {
  @ApiProperty({
    example: 'Conflict while consuming service',
  })
  description: string;

  @ApiProperty({
    example: 409,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Conflict',
  })
  statusText: string;
}

export class NotFoundResponseDTO extends ErrorResponseDTO {
  @ApiProperty({
    example: 'Resource not found',
  })
  description: string;

  @ApiProperty({
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    example: 'The requested resource was not found',
  })
  statusText: string;
}

export class InternalServerErrorResponseDTO extends ErrorResponseDTO {
  @ApiProperty({
    example: 'An unexpected error occurred',
  })
  description: string;

  @ApiProperty({
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Internal server error',
  })
  statusText: string;
}
