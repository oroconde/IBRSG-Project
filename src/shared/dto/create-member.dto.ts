import { IsNotEmpty, IsOptional, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
    @ApiProperty({ description: 'Nombre del miembro' })
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ description: 'Apellido del miembro' })
    @IsNotEmpty()
    apellido: string;

    @ApiProperty({ description: 'Fecha de nacimiento del miembro', required: false })
    @IsOptional()
    @IsDateString()
    fechaNacimiento?: string;

    @ApiProperty({ description: 'Género del miembro', required: false })
    @IsOptional()
    genero?: string;

    @ApiProperty({ description: 'Correo electrónico del miembro', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ description: 'Número de teléfono del miembro', required: false })
    @IsOptional()
    telefono?: string;

    @ApiProperty({ description: 'Dirección del miembro', required: false })
    @IsOptional()
    direccion?: string;
}
