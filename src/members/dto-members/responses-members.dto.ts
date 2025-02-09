import { ApiProperty } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { Members } from 'src/shared/entities/Members';
import { ApiResponseDTO } from 'src/shared/dto/common-responses.dto';
import { PaginationResponseDTO } from 'src/shared/dto/pagination.dto';

export class MemberResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the member.',
  })
  memberId: number;

  @ApiProperty({
    example: '123456789',
    description: 'The document number of the member.',
  })
  documentNumber: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the document type associated with the member.',
  })
  documentTypeId: number;

  @ApiProperty({
    example: 'Juan',
    description: 'The first name of the member.',
    nullable: true,
  })
  firstName: string | null;

  @ApiProperty({
    example: 'Carlos',
    description: 'The middle name of the member.',
    nullable: true,
  })
  middleName: string | null;

  @ApiProperty({
    example: 'Pérez',
    description: 'The last name of the member.',
    nullable: true,
  })
  lastName: string | null;

  @ApiProperty({
    example: 'Gómez',
    description: 'The second last name of the member.',
    nullable: true,
  })
  secondLastName: string | null;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'The email address of the member.',
    nullable: true,
  })
  email: string | null;

  @ApiProperty({
    example: '6015551234',
    description: 'The landline number of the member.',
    nullable: true,
  })
  landline: string | null;

  @ApiProperty({
    example: '3005551234',
    description: 'The mobile phone number of the member.',
    nullable: true,
  })
  mobilePhone: string | null;

  @ApiProperty({
    example: '1985-05-20',
    description: 'The birth date of the member in YYYY-MM-DD format.',
    nullable: true,
  })
  birthDate: string | null;

  @ApiProperty({
    example: true,
    description: 'Indicates if the member is active.',
    nullable: true,
  })
  isActive: boolean | null;

  @ApiProperty({
    example: '2023-08-17T00:00:00.000Z',
    description: 'The date and time the member was created.',
    nullable: true,
  })
  auditCreationDate: Date | null;

  @ApiProperty({
    example: '2023-08-17T00:00:00.000Z',
    description: 'The date and time the member was last updated.',
    nullable: true,
  })
  auditUpdateDate: Date | null;

  constructor(member: Members) {
    this.memberId = member.memberId;
    this.documentNumber = member.documentNumber;
    this.documentTypeId = member.documentType?.documentTypeId;
    this.firstName = member.firstName;
    this.middleName = member.middleName;
    this.lastName = member.lastName;
    this.secondLastName = member.secondLastName;
    this.email = member.email;
    this.landline = member.landline;
    this.mobilePhone = member.mobilePhone;
    this.birthDate = member.birthDate;
    this.auditCreationDate = member.auditCreationDate;
    this.auditUpdateDate = member.auditUpdateDate;
  }
}

export class CreateMemberResponse201DTO extends ApiResponseDTO<CreateMemberDto> {
  @ApiProperty({
    type: CreateMemberDto,
  })
  data: CreateMemberDto;
  @ApiProperty({
    example: 201,
  })
  statusCode: number;
}

export class MembersListResponses200DTO extends ApiResponseDTO<
  MemberResponseDto[]
> {
  @ApiProperty({
    type: [MemberResponseDto],
  })
  data: MemberResponseDto[];

  @ApiProperty({
    type: PaginationResponseDTO,
  })
  Pagination: PaginationResponseDTO;
}

export class MemberResponse200DTO extends ApiResponseDTO<MemberResponseDto> {
  @ApiProperty({
    type: MemberResponseDto,
  })
  data: MemberResponseDto;
}

export class updateMemberResponse200DTO extends ApiResponseDTO<CreateMemberDto> {
  @ApiProperty({
    type: CreateMemberDto,
  })
  data: CreateMemberDto;
}

export class DeleteMemberResponseDTO extends ApiResponseDTO<any> {}
