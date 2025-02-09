import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCommentDTO {
  @ApiProperty({
    example: 1,
    description: 'ID del miembro que hace el comentario',
  })
  @IsInt({ message: 'El memberId debe ser un número entero.' })
  @IsNotEmpty({ message: 'El memberId es obligatorio.' })
  memberId: number;

  @ApiProperty({
    example: 5,
    description: 'ID del sermón al que pertenece el comentario',
  })
  @IsInt({ message: 'El sermonId debe ser un número entero.' })
  @IsNotEmpty({ message: 'El sermonId es obligatorio.' })
  sermonId: number;

  @ApiProperty({
    example: 'Gran sermón, me encantó la enseñanza.',
    description: 'Texto del comentario',
    maxLength: 256,
  })
  @IsString({ message: 'El comentario debe ser un texto.' })
  @IsNotEmpty({ message: 'El comentario no puede estar vacío.' })
  @MaxLength(256, {
    message: 'El comentario no puede exceder los 256 caracteres.',
  })
  comment: string;

  @ApiProperty({
    example: '2025-02-07',
    description: 'Fecha del comentario (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'La fecha del comentario debe ser una cadena de texto.',
  })
  commentDate?: string;
}
