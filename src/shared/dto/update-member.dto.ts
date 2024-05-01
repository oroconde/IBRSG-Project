import { PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateMemberDto extends PartialType(CreateMemberDto) {
    @ApiProperty({ description: 'Nombre del miembro', required: false })
    nombre?: string;

    @ApiProperty({ description: 'Apellido del miembro', required: false })
    apellido?: string;

    @ApiProperty({ description: 'Fecha de nacimiento del miembro', required: false })
    fechaNacimiento?: string;

    @ApiProperty({ description: 'Género del miembro', required: false, enum: ['Masculino', 'Femenino', 'Otro'] })
    genero?: 'Masculino' | 'Femenino' | 'Otro';

    @ApiProperty({ description: 'Correo electrónico del miembro', required: false })
    email?: string;

    @ApiProperty({ description: 'Número de teléfono del miembro', required: false })
    telefono?: string;

    @ApiProperty({ description: 'Dirección del miembro', required: false })
    direccion?: string;
}