import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { SermonsService } from './sermons.service';
import { SuccessResponse } from 'src/shared/providers/format-success-response';
import {
  SermonDetailedResponse,
  SermonsListResponses200DTO,
} from './dto-semons/sermon-detailed-response.dto';
import { CreateSermonDto } from './dto-semons/create-sermon.dto';
import { SermonResponseDto } from './dto-semons/sermon-responses.dto';
import { AllQueryParams } from 'src/shared/dto/all-query-params';

@ApiTags('Sermons')
@Controller('sermons')
export class SermonsController {
  constructor(private readonly sermonsService: SermonsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sermon' })
  @ApiBody({ type: CreateSermonDto })
  @ApiResponse({
    status: 201,
    description: 'Sermon successfully created.',
    type: SermonResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request: Invalid input data.',
  })
  @ApiConflictResponse({
    description: 'Conflict: Sermon with the same name and date already exists.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(
    @Body() createSermonDto: CreateSermonDto,
  ): Promise<SuccessResponse<SermonResponseDto>> {
    return this.sermonsService.create(createSermonDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get detailed report of sermons with optional filters',
  })
  @ApiResponse({
    status: 200,
    description: 'Detailed report of sermons.',
    type: SermonsListResponses200DTO,
  })
  @ApiQuery({
    name: 'preacherName',
    required: false,
    description: 'Filter by preacher name',
    type: String,
  })
  @ApiQuery({
    name: 'sermonName',
    required: false,
    description: '',
    type: String,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    example: 4,
    type: Number,
  })
  async findAllSermons(
    @Query() allQueries: AllQueryParams,
  ): Promise<SuccessResponse<SermonDetailedResponse[]>> {
    return this.sermonsService.findAllSermons(allQueries);
  }
}
