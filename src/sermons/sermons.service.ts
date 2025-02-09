import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessResponse } from 'src/shared/providers/format-success-response';
import { Sermons } from 'src/shared/entities/Sermons';
import { Preachers } from 'src/shared/entities/Preachers';
import { Repository } from 'typeorm';
import { Categories } from 'src/shared/entities/Categories';
import { SermonDetailedResponse } from './dto-semons/sermon-detailed-response.dto';
import { PaginationResponseDTO } from 'src/shared/dto/pagination.dto';
import { SermonResponseDto } from './dto-semons/sermon-responses.dto';
import { CreateSermonDto } from './dto-semons/create-sermon.dto';
import { AllQueryParams } from 'src/shared/dto/all-query-params';
import { ErrorHandler } from 'src/shared/utils/handler-errors';

@Injectable()
export class SermonsService {
  private readonly logger = new Logger(SermonsService.name);

  constructor(
    @InjectRepository(Sermons, 'ibrsgdb')
    private readonly sermonsRepository: Repository<Sermons>,
    protected readonly errorHandler: ErrorHandler,
  ) {}

  async create(
    createSermonDto: CreateSermonDto,
  ): Promise<SuccessResponse<SermonResponseDto>> {
    const context = `${SermonsService.name} | create`;
    this.logger.log(
      `Entered create method with data: ${JSON.stringify(createSermonDto)}`,
      context,
    );

    try {
      this.logger.debug(
        `Creating new sermon with data: ${JSON.stringify(createSermonDto)}`,
        context,
      );

      const newSermon = this.sermonsRepository.create({
        ...createSermonDto,
        category: createSermonDto.categoryId
          ? ({ categoryId: createSermonDto.categoryId } as Categories)
          : null,
        preacher: createSermonDto.preacherId
          ? ({ preacherId: createSermonDto.preacherId } as Preachers)
          : null,
      });

      this.logger.debug(`Saving new sermon to the database`, context);

      const savedSermon = await this.sermonsRepository.save(newSermon);

      this.logger.log(
        `Sermon successfully created with ID: ${savedSermon.sermonId}`,
        context,
      );

      const responseData = new SermonResponseDto(savedSermon);

      return new SuccessResponse<SermonResponseDto>(
        responseData,
        'Sermón creado exitosamente',
        201,
        'OK',
      );
    } catch (error) {
      this.logger.error(
        `An error occurred while creating sermon`,
        error.stack,
        context,
      );
      // ErrorHandler.handleServiceError(error);
      this.errorHandler.handleServiceError(error);
    }
  }

  // # Optimizado con queryBuilder
  async findAllSermons(
    queryParams: AllQueryParams,
  ): Promise<SuccessResponse<SermonDetailedResponse[]>> {
    const { sermonName, preacherName, page, limit } = queryParams;
    const context = `${SermonsService.name} | findAllSermons`;

    this.logger.log(
      `Ejecutando método findAllSermons con params: ${JSON.stringify(queryParams)}`,
      `${context} | BEGIN`,
    );

    try {
      const queryBuilder = this.sermonsRepository
        .createQueryBuilder('sermon')
        .select([
          'sermon.sermonId',
          'sermon.sermonName',
          'preacher.preacherId',
          'member.firstName',
          'member.lastName',
        ]) // Seleccionar solo los campos necesarios
        .leftJoin('sermon.preacher', 'preacher')
        .leftJoin('preacher.member', 'member')
        .where('sermon.isActive = :isActive', { isActive: true });

      if (sermonName) {
        queryBuilder.andWhere('sermon.sermonName ILIKE :sermonName', {
          sermonName: `%${sermonName}%`,
        });
      }

      if (preacherName) {
        queryBuilder.andWhere(
          '(member.firstName ILIKE :preacherName OR member.lastName ILIKE :preacherName)',
          { preacherName: `%${preacherName}%` },
        );
      }

      const offset = (page - 1) * limit;
      const [sermons, totalItems] = await queryBuilder
        .skip(offset)
        .take(limit)
        .getManyAndCount();

      const responseData = sermons.map(
        (sermon) => new SermonDetailedResponse(sermon),
      );

      const pagination: PaginationResponseDTO = {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        limit,
        offset,
      };

      this.logger.log(
        `Retornando respuesta con ${responseData.length} sermones.`,
        `${context} | SUCCESS`,
      );

      return new SuccessResponse<SermonDetailedResponse[]>(
        responseData,
        `Retrieved ${responseData.length} sermons`,
        200,
        'OK',
        pagination,
      );
    } catch (error) {
      this.logger.error(
        `Error al ejecutar findAllSermons: ${error.message}`,
        error.stack,
        `${context} | ERROR`,
      );
      this.errorHandler.handleServiceError(error);
    }
  }
}
