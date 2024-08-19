import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDTO } from 'src/shared/commond/common-responses.dto';
import { CreateMemberDto } from './create-member.dto';
import { PaginationResponseDTO } from 'src/shared/commond/pagination.dto';

export class MembersResponsesDTO extends ApiResponseDTO<CreateMemberDto[]> {
  constructor(
    healthStaff: CreateMemberDto[],
    paginacion: PaginationResponseDTO,
  ) {
    super();
    this.data = healthStaff;
    this.paginacion = paginacion;
  }

  @ApiProperty({
    type: [CreateMemberDto],
  })
  data: CreateMemberDto[];

  @ApiProperty({
    type: PaginationResponseDTO,
  })
  paginacion: PaginationResponseDTO;
}

export class MemberResponseDTO extends ApiResponseDTO<CreateMemberDto> {
  @ApiProperty({
    type: CreateMemberDto,
  })
  data: CreateMemberDto;
}

export class createUpdateMemberResponseDTO extends ApiResponseDTO<CreateMemberDto> {
  @ApiProperty({
    type: CreateMemberDto,
  })
  data: CreateMemberDto;
  @ApiProperty({
    example: 201,
  })
  statusCode: number;
}

export class DeleteMemberResponseDTO extends ApiResponseDTO<null> {}
