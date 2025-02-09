import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/shared/providers/generic.service';
import { Repository } from 'typeorm';
import { SermonComments } from 'src/shared/entities/SermonComments';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericParamsDTO } from 'src/shared/dto/generic-params.dto';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { ErrorHandler } from 'src/shared/utils/handler-errors';

@Injectable()
export class CommentsService extends GenericService {
  constructor(
    @InjectRepository(SermonComments, 'ibrsgdb')
    private readonly sermonCommentsRepository: Repository<SermonComments>,
    protected readonly errorHandler: ErrorHandler,
  ) {
    super(sermonCommentsRepository, CommentsService.name, errorHandler);
  }

  async findAll(queryParams: GenericParamsDTO) {
    return await this.genericFindAll<SermonComments>(queryParams);
  }

  async create(createCommentDto: CreateCommentDTO) {
    return await this.genericCreate<CreateCommentDTO, SermonComments>(
      createCommentDto,
    );
  }

  //   findOne(id: number) {
  //     return `This action returns a #${id} comment`;
  //   }

  //   update(id: number, updateCommentDto: UpdateCommentDto) {
  //     return `This action updates a #${id} comment`;
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} comment`;
  //   }
}
