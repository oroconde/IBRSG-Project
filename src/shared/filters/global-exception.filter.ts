import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  private static readonly STATUS_TEXTS = {
    [HttpStatus.BAD_REQUEST]: 'Petición mal formada',
    [HttpStatus.UNAUTHORIZED]: 'No autorizado',
    [HttpStatus.FORBIDDEN]: 'No permitido',
    [HttpStatus.NOT_FOUND]: 'No encontrado',
    [HttpStatus.CONFLICT]: 'Conflicto',
    [HttpStatus.INTERNAL_SERVER_ERROR]: 'Error interno del sistema',
  };

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let description = 'Ha ocurrido un error inesperado';
    let additionalProperties = {};

    // Manejo de HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        additionalProperties = exceptionResponse; // Incluye propiedades personalizadas
      }

      description = this.extractDescription(exception);
    } else {
      // Manejo de excepciones no controladas
      this.logger.error(
        'Excepción no controlada capturada',
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    // Respuesta de error
    const errorResponse = {
      description,
      statusCode: status,
      statusText: this.getStatusText(status),
      path: request.url,
      timestamp: new Date().toISOString(),
      ...additionalProperties, // Fusiona propiedades personalizadas
    };

    response.status(status).json(errorResponse);
  }

  private extractDescription(exception: HttpException): string {
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    if (exceptionResponse && typeof exceptionResponse === 'object') {
      const { description, message } = exceptionResponse as any;

      // Prioriza "description" si está disponible
      if (description) {
        return description;
      }

      // Usa "message" como alternativa
      if (typeof message === 'string') {
        return message;
      }

      // Si "message" es un array, lo convierte en una cadena
      if (Array.isArray(message) && message.length > 0) {
        return message.join(', ');
      }
    }

    // Mensaje genérico en caso de no encontrar "description" ni "message"
    return 'Ha ocurrido un error inesperado';
  }

  private getStatusText(status: number): string {
    return GlobalExceptionFilter.STATUS_TEXTS[status] || 'Error desconocido';
  }
}
