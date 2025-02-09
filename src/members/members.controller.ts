import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MembersService } from './members.service';

import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiConflictResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateMemberDto,
  UpdateMemberDto,
} from './dto-members/create-member.dto';
import {
  CreateMemberResponse201DTO,
  MembersListResponses200DTO,
  MemberResponse200DTO,
  DeleteMemberResponseDTO,
  MemberResponseDto,
} from './dto-members/responses-members.dto';
import { SuccessResponse } from 'src/shared/providers/format-success-response';
import { ErrorResponseDTO } from 'src/shared/dto/common-responses.dto';
import { AllQueryParams } from 'src/shared/dto/all-query-params';
import { Members } from 'src/shared/entities/Members';
import { JwtGuard } from 'src/shared/guards/jwt.guard';

@ApiTags('Members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({
    status: 201,
    description: 'Member successfully created.',
    type: CreateMemberResponse201DTO,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiConflictResponse({
    description:
      'Conflic: Member with the same document number already exists.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(
    @Body() createMemberDto: CreateMemberDto,
  ): Promise<SuccessResponse<CreateMemberDto>> {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all members',
    description:
      'Este endpoint permite listar todos los miembros con filtros opcionales',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    type: Number,
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    type: Number,
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'documentNumber',
    description: 'Document number',
    type: String,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'List of all members.',
    type: MembersListResponses200DTO,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findAll(@Query() queryParams: AllQueryParams) {
    return this.membersService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a member by ID' })
  @ApiResponse({
    status: 200,
    description: 'Member found.',
    type: MemberResponse200DTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found.',
    type: ErrorResponseDTO,
  })
  // @ApiNotFoundResponse({ description: 'Member not found' })
  @ApiParam({ name: 'id', description: 'ID of the member' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a member by ID' })
  @ApiResponse({
    status: 200,
    description: 'Member successfully updated.',
    type: MemberResponse200DTO,
  })
  @ApiNotFoundResponse({ description: 'Member not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBody({ type: UpdateMemberDto })
  @ApiParam({ name: 'id', description: 'ID of the member' })
  update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<SuccessResponse<MemberResponseDto>> {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a member by ID' })
  @ApiResponse({
    status: 200,
    description: 'Member successfully soft deleted.',
    type: DeleteMemberResponseDTO,
  })
  @ApiNotFoundResponse({ description: 'Member not found or already inactive' })
  @ApiParam({ name: 'id', description: 'ID of the member', example: 18 })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  softDelete(@Param('id') id: string): Promise<DeleteMemberResponseDTO> {
    return this.membersService.softDelete(+id);
  }

  @Get('login/:documentNumber')
  async getMemberForLogin(
    @Param('documentNumber') documentNumber: string,
  ): Promise<Members> {
    const member = await this.membersService.getMemberForLogin({
      documentNumber,
    });
    return member;
  }
}
