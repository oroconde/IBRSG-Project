import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommentParamsDTO } from './dto/comment-params.dto';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { GenericParamsDTO } from 'src/shared/dto/generic-params.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDTO) {
    return await this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
  })
  @ApiQuery({
    name: 'sermonId',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'memberId',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'relations',
    required: false,
  })
  async findAll(@Query() Params: GenericParamsDTO) {
    return await this.commentsService.genericFindAll(Params);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentsService.update(+id, updateCommentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentsService.remove(+id);
  // }
}
