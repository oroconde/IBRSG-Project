import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from 'src/shared/entities/Members';
import { Repository } from 'typeorm';
import {
  CreateMemberDto,
  UpdateMemberDto,
} from './dto-members/create-member.dto';
import { ErrorHandler } from 'src/shared/utils/handler-errors';
import { ApiResponseDTO } from 'src/shared/commond/common-responses.dto';
import { PaginationResponseDTO } from 'src/shared/commond/pagination.dto';
import { SuccessResponse } from 'src/shared/commond/format-success-response';

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);

  constructor(
    @InjectRepository(Members, 'ibrsgdb')
    private readonly membersRepository: Repository<Members>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Members> {
    this.logger.log(
      `Entered create method in MembersService with data: ${JSON.stringify(createMemberDto)}`,
    );
    try {
      // Verificar si ya existe un miembro con el mismo documentNumber
      const existingMember = await this.membersRepository.findOne({
        where: { documentNumber: createMemberDto.documentNumber },
      });

      if (existingMember) {
        this.logger.warn(
          `Member with document number ${createMemberDto.documentNumber} already exists`,
        );
        throw new BadRequestException(
          `Member with document number ${createMemberDto.documentNumber} already exists`,
        );
      }

      const newMember = this.membersRepository.create(createMemberDto);
      return await this.membersRepository.save(newMember);
    } catch (error) {
      ErrorHandler.handleServiceError(error);
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<SuccessResponse<Members[]>> {
    this.logger.log(
      `Entered findAll method in MembersService with page: ${page} and limit: ${limit}`,
    );

    try {
      const offset = (page - 1) * limit;

      // Obtener los datos paginados y el número total de elementos
      const [data, totalItems] = await this.membersRepository.findAndCount({
        skip: offset,
        take: limit,
      });

      // Calcular el número total de páginas
      const totalPages = Math.ceil(totalItems / limit);

      // Crear el objeto de respuesta de paginación
      const pagination: PaginationResponseDTO = {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalItems,
        limit: limit,
        offset: offset,
      };

      // Devolver la respuesta completa utilizando SuccessResponse
      return new SuccessResponse<Members[]>(
        data,
        `Retrieved ${data.length} members`,
        200,
        'OK',
        pagination,
      );
    } catch (error) {
      ErrorHandler.handleServiceError(error);
    }
  }
  // async findAll(
  //   page: number,
  //   limit: number,
  // ): Promise<ApiResponseDTO<Members[]>> {
  //   this.logger.log(
  //     `Entered findAll method in MembersService with page: ${page} and limit: ${limit}`,
  //   );
  //   try {
  //     const [data, count] = await this.membersRepository.findAndCount({
  //       skip: (page - 1) * limit,
  //       take: limit,
  //     });
  //     return {
  //       data,
  //       description: `Retrieved ${count} members`,
  //       statusCode: 200,
  //       statusText: 'OK',
  //     };
  //   } catch (error) {
  //     ErrorHandler.handleServiceError(error);
  //   }
  // }

  async findOne(id: number): Promise<Members> {
    this.logger.log(`Entered findOne method in MembersService with id: ${id}`);
    try {
      const member = await this.membersRepository.findOne({
        where: { memberId: id },
      });
      if (!member) {
        throw new NotFoundException(`Member with ID ${id} not found`);
      }
      return member;
    } catch (error) {
      ErrorHandler.handleServiceError(error);
    }
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Members> {
    this.logger.log(`Entered update method in MembersService with id: ${id}`);

    try {
      const member = await this.membersRepository.findOne({
        where: { memberId: id, activeRecord: true },
      });

      if (!member) {
        this.logger.error(`Member with ID ${id} not found`);
        throw new NotFoundException(`Member with ID ${id} not found`);
      }
      // Aplicar manualmente los cambios del DTO
      Object.assign(member, updateMemberDto);
      return await this.membersRepository.save(member);
    } catch (error) {
      ErrorHandler.handleServiceError(error);
    }
  }

  async softDelete(id: number): Promise<void> {
    this.logger.log(
      `Entered softDelete method in MembersService with id: ${id}`,
    );
    try {
      const member = await this.membersRepository.findOne({
        where: { memberId: id, activeRecord: true },
      });

      if (!member) {
        this.logger.warn(`Member with ID ${id} not found or already inactive`);
        throw new NotFoundException(
          `Member with ID ${id} not found or already inactive`,
        );
      }

      member.activeRecord = false;
      // member.auditDeletionDate = new Date();  // Opcional: Registrar la fecha de eliminación
      await this.membersRepository.save(member);

      this.logger.log(`Member with ID ${id} successfully soft deleted`);
    } catch (error) {
      ErrorHandler.handleServiceError(error);
    }
  }
}
