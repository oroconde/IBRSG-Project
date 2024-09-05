import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBitacoraDTO {
  @ApiProperty({
    description: 'Token del usuario que realizó la acción',
    example: 'token12345',
  })
  @IsString()
  @IsOptional()
  tokenUsuario: string | null;

  @ApiProperty({
    description: 'Tipo de operación CRUD realizada',
    example: 'INSERT',
  })
  @IsString()
  @IsOptional()
  tipoCrud: string | null;

  @ApiProperty({
    description: 'Nombre de la tabla afectada',
    example: 'usuarios',
  })
  @IsString()
  @IsOptional()
  nombreTabla: string | null;

  @ApiProperty({
    description: 'Valor original antes de la operación',
    example: '{"nombre":"Juan"}',
  })
  @IsString()
  @IsOptional()
  valorOriginal: string | null;

  @ApiProperty({
    description: 'Valor nuevo después de la operación',
    example: '{"nombre":"Carlos"}',
  })
  @IsString()
  @IsOptional()
  valorNuevo: string | null;

  @ApiProperty({
    description: 'Dirección IP desde donde se realizó la acción',
    example: '192.168.1.1',
  })
  @IsString()
  @IsOptional()
  ip: string | null;

  @ApiProperty({
    description: 'Nombre del host desde donde se realizó la acción',
    example: 'hostlocal',
  })
  @IsString()
  @IsOptional()
  hostname: string | null;

  @ApiProperty({
    description: 'Identificador del registro afectado',
    example: 1001,
  })
  @IsInt()
  @IsOptional()
  registroId: number | null;
}
