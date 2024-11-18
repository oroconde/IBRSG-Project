import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // Si no hay tipo definido o es un tipo nativo, devolver el valor sin validación
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }

    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      // Extraer los mensajes de validación y personalizar la excepción
      const validationErrors = errors.map((err) => ({
        field: err.property,
        errors: Object.values(err.constraints || {}),
      }));

      throw new HttpException(
        {
          description: 'Error de validación de datos',
          statusCode: HttpStatus.BAD_REQUEST,
          errors: validationErrors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
