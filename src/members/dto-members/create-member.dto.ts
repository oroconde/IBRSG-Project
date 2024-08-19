import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({
    description: 'Document number of the member',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  documentNumber: string;

  @ApiProperty({
    description: 'Type of member identification document',
    example: 1,
  })
  documentTypeId: number;

  @ApiProperty({
    description: 'Password of the member',
    example: 'strongpassword123',
    required: false,
  })
  @IsOptional()
  @IsString()
  memberPassword?: string;

  @ApiProperty({
    description: 'Token for password recovery',
    example: 'recoveryToken123',
    required: false,
  })
  @IsOptional()
  @IsString()
  passwordRecoveryToken?: string;

  @ApiProperty({
    description: 'First name of the member',
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: 'Middle name of the member',
    example: 'Michael',
    required: false,
  })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({
    description: 'Last name of the member',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'Second last name of the member',
    example: 'Smith',
    required: false,
  })
  @IsOptional()
  @IsString()
  secondLastName?: string;

  @ApiProperty({
    description: 'Email address of the member',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Landline number of the member',
    example: '555-1234',
    required: false,
  })
  @IsOptional()
  @IsString()
  landline?: string;

  @ApiProperty({
    description: 'Mobile phone number of the member',
    example: '555-5678',
    required: false,
  })
  @IsOptional()
  @IsString()
  mobilePhone?: string;

  @ApiProperty({
    description: 'Birth date of the member',
    example: '1990-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiProperty({
    description: 'Indicates whether the record is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  activeRecord?: boolean;
}

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
