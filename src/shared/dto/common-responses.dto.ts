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
    example: 'Ok',
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

export class BadRequestResponse400 extends ErrorResponseDTO {
  @ApiProperty({
    example: 'The isActive field is required',
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

export class UnauthorizedResponse401 extends ErrorResponseDTO {
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

export class ConflictResponse409 extends ErrorResponseDTO {
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

export class NotFoundResponse404 extends ErrorResponseDTO {
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

export class InternalServerErrorResponse500 extends ErrorResponseDTO {
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
