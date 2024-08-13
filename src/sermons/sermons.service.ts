import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessResponse } from 'src/shared/commond/format-success-response';
import { Sermons } from 'src/shared/entities/Sermons';
import { ErrorHandler } from 'src/shared/utils/handler-errors';
import { Repository } from 'typeorm';
import { SermonDetailedReportDto } from './dto-semons/sermon-detailed-report.dto';
import { PaginationResponseDTO } from 'src/shared/commond/pagination.dto';

@Injectable()
export class SermonsService {
  private readonly logger = new Logger(SermonsService.name);

  constructor(
    @InjectRepository(Sermons, 'ibrsgdb')
    private readonly sermonsRepository: Repository<Sermons>,
  ) {}

  async getSermonsDetailedReport({
    preacherName,
    categoryName,
    startDate,
    endDate,
    withComments = false,
    page = 1,
    limit = 10,
  }: {
    preacherName?: string;
    categoryName?: string;
    startDate?: string;
    endDate?: string;
    withComments?: boolean;
    page?: number;
    limit?: number;
  }): Promise<SuccessResponse<SermonDetailedReportDto[]>> {
    this.logger.log('Generating detailed report for sermons.');

    try {
      const queryBuilder = this.sermonsRepository
        .createQueryBuilder('sermon')
        .leftJoinAndSelect('sermon.preacher', 'preacher')
        .leftJoinAndSelect('preacher.member', 'preacherMember')
        .leftJoinAndSelect('sermon.category', 'category');

      // Filtrar por nombre del predicador
      if (preacherName) {
        queryBuilder.andWhere(
          "CONCAT(preacherMember.firstName, ' ', preacherMember.lastName) ILIKE :preacherName",
          { preacherName: `%${preacherName}%` },
        );
      }

      // Filtrar por nombre de la categoría
      if (categoryName) {
        queryBuilder.andWhere('category.categoryName ILIKE :categoryName', {
          categoryName: `%${categoryName}%`,
        });
      }

      // Filtrar por fecha de inicio
      if (startDate) {
        queryBuilder.andWhere('sermon.sermon_date >= :startDate', {
          startDate,
        });
      }

      // Filtrar por fecha de fin
      if (endDate) {
        queryBuilder.andWhere('sermon.sermon_date <= :endDate', { endDate });
      }

      // Incluir comentarios si se solicita
      if (withComments) {
        queryBuilder
          .leftJoinAndSelect('sermon.comments', 'comments')
          .leftJoinAndSelect('comments.member', 'commentMember');
      }

      const [sermons, totalItems] = await queryBuilder
        .take(limit)
        .skip((page - 1) * limit)
        .getManyAndCount();

      const totalPages = Math.ceil(totalItems / limit);
      const pagination = new PaginationResponseDTO();
      pagination.currentPage = page;
      pagination.totalPages = totalPages;
      pagination.totalItems = totalItems;
      pagination.limit = limit;
      pagination.offset = (page - 1) * limit;

      if (totalItems === 0) {
        this.logger.warn('No results found for the applied filters');
      }

      const result = sermons.map((sermon) => ({
        sermonName: sermon.sermonName,
        preacherName: `${sermon.preacher.member.firstName} ${sermon.preacher.member.lastName}`,
        comments: sermon.sermonComments?.map((comment) => ({
          comment: comment.comment,
          commentDate: comment.commentDate.toString().split('T')[0],
          memberName: `${comment.member.firstName} ${comment.member.lastName}`,
        })),
      }));

      return new SuccessResponse(
        result,
        'Consulta exitosa',
        200,
        'OK',
        pagination,
      );
    } catch (error) {
      this.logger.error(
        'Error generating detailed report for sermons',
        error.stack,
      );
      ErrorHandler.handleServiceError(error);
      return new SuccessResponse(
        [],
        'Error al generar informe detallado de sermones',
        500,
        'Internal Server Error',
      );
    }
  }
}
