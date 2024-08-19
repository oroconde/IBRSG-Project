import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
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
} from '@nestjs/swagger';
import {
  CreateMemberDto,
  UpdateMemberDto,
} from './dto-members/create-member.dto';
import {
  createUpdateMemberResponseDTO,
  DeleteMemberResponseDTO,
  MemberResponseDTO,
  MembersResponsesDTO,
} from './dto-members/member-responses.dto';
import { SuccessResponse } from 'src/shared/commond/format-success-response';

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
    type: createUpdateMemberResponseDTO,
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
  @ApiOperation({ summary: 'Get all members' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'List of all members.',
    type: MembersResponsesDTO,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.membersService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a member by ID' })
  @ApiParam({ name: 'id', description: 'ID of the member' })
  @ApiResponse({
    status: 200,
    description: 'Member found.',
    type: CreateMemberDto,
  })
  @ApiNotFoundResponse({ description: 'Member not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a member by ID' })
  @ApiParam({ name: 'id', description: 'ID of the member' })
  @ApiBody({ type: UpdateMemberDto })
  @ApiResponse({
    status: 200,
    description: 'Member successfully updated.',
    type: MemberResponseDTO,
  })
  @ApiNotFoundResponse({ description: 'Member not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<SuccessResponse<UpdateMemberDto>> {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a member by ID' })
  @ApiParam({ name: 'id', description: 'ID of the member', example: 18 })
  @ApiResponse({
    status: 200,
    description: 'Member successfully soft deleted.',
    type: DeleteMemberResponseDTO,
  })
  @ApiNotFoundResponse({ description: 'Member not found or already inactive' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  softDelete(@Param('id') id: string): Promise<DeleteMemberResponseDTO> {
    return this.membersService.softDelete(+id);
  }
}
