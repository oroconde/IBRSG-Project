import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SermonsService } from './sermons.service';
import { SuccessResponse } from 'src/shared/commond/format-success-response';
import { SermonDetailedReportDto } from './dto-semons/sermon-detailed-report.dto';

@ApiTags('sermons')
@Controller('sermons')
export class SermonsController {
  constructor(private readonly sermonsService: SermonsService) {}

  @ApiOperation({
    summary: 'Get detailed report of sermons with optional filters',
  })
  @ApiQuery({
    name: 'preacherName',
    required: false,
    description: 'Filter by preacher name',
  })
  @ApiQuery({
    name: 'categoryName',
    required: false,
    description: 'Filter by category name',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Filter by start date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'Filter by end date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'withComments',
    required: false,
    description: 'Include associated comments',
    example: true,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
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
    description: 'Detailed report of sermons.',
    type: [SermonDetailedReportDto],
  })
  @Get('detailed-report')
  getSermonsDetailedReport(
    @Query('preacherName') preacherName?: string,
    @Query('categoryName') categoryName?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('withComments') withComments: boolean = false,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<SuccessResponse<SermonDetailedReportDto[]>> {
    return this.sermonsService.getSermonsDetailedReport({
      preacherName,
      categoryName,
      startDate,
      endDate,
      withComments,
      page,
      limit,
    });
  }
}
