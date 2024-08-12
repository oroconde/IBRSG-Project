import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHandler {
  static handleServiceError(error: any) {
    if (error instanceof HttpException) {
      throw error;
    }

    throw new HttpException(
      {
        data: null,
        description: error.message || 'Error interno del servidor',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        statusText: 'error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
