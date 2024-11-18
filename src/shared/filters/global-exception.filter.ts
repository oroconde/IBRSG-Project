import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

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
    let description = 'Error interno del servidor';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      description = this.extractDescription(exception);
    } else {
      this.logger.error('Excepción no controlada', exception);
    }

    const errorResponse = {
      data: null,
      description,
      statusCode: status,
      statusText: this.getStatusText(status),
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }

  private extractDescription(exception: HttpException): string {
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'string') return exceptionResponse;
    if (exceptionResponse && typeof exceptionResponse === 'object') {
      const { message } = exceptionResponse as any;
      if (typeof message === 'string') return message;
      if (Array.isArray(message) && message.length > 0)
        return message.join(', ');
    }
    return 'Ha ocurrido un error inesperado';
  }

  private getStatusText(status: number): string {
    return GlobalExceptionFilter.STATUS_TEXTS[status] || 'Error desconocido';
  }
}
