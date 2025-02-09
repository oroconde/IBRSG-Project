import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IGenericService } from '../interfaces/generic.service.interface';
import { ResponseModel } from './format-success-response';
import { PaginateResponseModel } from '../dto/pagination.dto';
import { ErrorHandler } from '../utils/handler-errors';

@Injectable()
export class GenericService implements IGenericService {
  public logger: Logger = new Logger(this.serviceName);

  constructor(
    private readonly docRepository: any,
    private readonly serviceName: string,
    protected readonly errorHandler: ErrorHandler,
  ) {}

  async genericCreate<U, T>(dto: U): Promise<ResponseModel<T>> {
    try {
      const docCreated = this.docRepository.create(dto);
      const data = await this.docRepository.save(docCreated);

      return {
        data: data,
        statusCode: 201,
        statusText: 'ok',
        description: 'Se ha creado el recurso exitosamente.',
      };
    } catch (error) {
      this.errorHandler.handleServiceError(error);
    }
  }

  async genericFindAll<T>(queryParams: any = {}): Promise<ResponseModel<T>> {
    const {
      page = 1,
      limit = 10,
      order = null,
      relations = null,
      ...queries
    } = queryParams;

    try {
      const offset = (page - 1) * limit;
      const [Data, totalData] = await this.docRepository.findAndCount({
        where: queries,
        skip: offset,
        take: limit,
        ...(relations && { relations }),
        ...(order && { order }),
      });

      if (!Data || Data.length === 0)
        throw new NotFoundException('No se han encontrado documentos');

      const pagination: PaginateResponseModel = {
        page,
        limit,
        totalItems: totalData,
        totalPages: Math.ceil(totalData / limit),
        offset,
      };

      return new ResponseModel<T>(
        Data,
        'Retrieved successfully',
        200,
        'OK',
        pagination,
      );
    } catch (error) {
      this.errorHandler.handleServiceError(error);
    }
  }

  async genericFindOne<T>(
    prop: object,
    relations: string[] = undefined,
  ): Promise<ResponseModel<T>> {
    try {
      const data: T = await this.docRepository.findOne({
        where: prop,
        relations,
      });
      if (!data) throw new NotFoundException();

      return {
        data: data,
        statusCode: 200,
        statusText: 'ok',
        description: 'Se ha encontrado el recurso exitosamente.',
      };
    } catch (error) {
      this.errorHandler.handleServiceError(error);
    }
  }

  async genericUpdate<T, U>(prop: object, dto: U): Promise<T> {
    const { data: data } = await this.genericFindOne<T>(prop);
    try {
      const updatedDoc: T = this.docRepository.merge(data, dto);
      return await this.docRepository.save(updatedDoc);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error en el servidor al asignar la cita',
      );
    }
  }

  protected handleError(error: any): void {
    this.logger.error(error.message);

    if (error.status === 404)
      throw new NotFoundException('Recurso(s) no encontrados.');

    if (!error.status)
      throw new InternalServerErrorException(
        'Ha ocurido un error, checar logs del servidor.',
      );
    return;
  }
}
