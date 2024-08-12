import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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
} from '@nestjs/swagger';
import {
  CreateMemberDto,
  UpdateMemberDto,
} from './dto-members/create-member.dto';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @ApiOperation({ summary: 'Create a new member' })
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({ status: 201, description: 'Member successfully created.' })
  @ApiBadRequestResponse({
    description:
      'Bad Request. Member with the same document number already exists.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

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
    type: [CreateMemberDto],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.membersService.findAll(page, limit);
  }

  @ApiOperation({ summary: 'Get a member by ID' })
  @ApiParam({ name: 'id', description: 'ID of the member' })
  @ApiResponse({
    status: 200,
    description: 'Member found.',
    type: CreateMemberDto,
  })
  @ApiNotFoundResponse({ description: 'Member not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a member by ID' })
  @ApiParam({ name: 'id', description: 'ID of the member' })
  @ApiBody({ type: UpdateMemberDto })
  @ApiResponse({
    status: 200,
    description: 'Member successfully updated.',
    type: CreateMemberDto,
  })
  @ApiNotFoundResponse({ description: 'Member not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @ApiOperation({ summary: 'Soft delete a member by ID' })
  @ApiParam({ name: 'id', description: 'ID of the member' })
  @ApiResponse({
    status: 200,
    description: 'Member successfully soft deleted.',
  })
  @ApiNotFoundResponse({ description: 'Member not found or already inactive' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.membersService.softDelete(+id);
  }
}
