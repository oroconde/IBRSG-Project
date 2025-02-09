import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class ErrorHandler {
  handleServiceError(error: unknown): void {
    // Manejo específico para errores HTTP
    if (error instanceof HttpException) {
      throw error;
    }

    // Manejo específico para errores de base de datos
    if (error instanceof QueryFailedError) {
      throw this.handleDatabaseError(error);
    }

    // Manejo genérico para otros errores
    throw new HttpException(
      {
        description:
          error instanceof Error ? error.message : 'Error interno del servidor',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        statusText: 'error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private handleDatabaseError(error: QueryFailedError): HttpException {
    const driverError = error.driverError as {
      message?: string;
      code?: string;
      detail?: string;
    };

    // Manejar errores de restricción UNIQUE en PostgreSQL
    if (driverError?.code === '23505') {
      // Código de error para UNIQUE VIOLATION
      const uniqueViolationMatch = driverError.detail?.match(
        /Key \((.*?)\)=\((.*?)\) already exists/,
      );

      const value = uniqueViolationMatch
        ? uniqueViolationMatch[2]
        : 'valor duplicado';

      return new HttpException(
        {
          description: `El valor '[${value}]' ya está registrado en el campo.`,
          statusCode: HttpStatus.CONFLICT,
          statusText: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }

    // Manejar errores de restricción FOREIGN KEY en PostgreSQL
    if (driverError?.code === '23503') {
      // Código de error para FOREIGN KEY VIOLATION
      const foreignKeyViolationMatch = driverError.detail?.match(
        /Key \((.*?)\)=\((.*?)\) is not present in table "(.*?)"/,
      );

      const field = foreignKeyViolationMatch
        ? foreignKeyViolationMatch[1]
        : 'campo desconocido';
      const value = foreignKeyViolationMatch
        ? foreignKeyViolationMatch[2]
        : 'valor no encontrado';
      const table = foreignKeyViolationMatch
        ? foreignKeyViolationMatch[3]
        : 'tabla desconocida';

      return new HttpException(
        {
          description: `El valor '[${value}]' no está relacionado con la tabla '${table}' en el campo '${field}'.`,
          statusCode: HttpStatus.NOT_FOUND,
          statusText: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // Manejar otros errores de la base de datos
    return new HttpException(
      {
        description: driverError.message || 'Error en la base de datos',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        statusText: 'Database Error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  // private isValidationError(
  //   error: unknown,
  // ): error is { name: string; message: string } {
  //   return (
  //     typeof error === 'object' &&
  //     error !== null &&
  //     'name' in error &&
  //     'message' in error
  //   );
  // }

  // private standardizeErrorMessage(message: string): string {
  //   const regex = /\((\w+)\)=\(([^)]+)\)/;
  //   const match = message.match(regex);

  //   if (match) {
  //     const field = match[1];
  //     const value = match[2];
  //     return `El dato (${field})=(${value}) ya existe en el sistema.`;
  //   }

  //   return message;
  // }
}
