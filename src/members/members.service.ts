import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from 'src/shared/entities/Members';
import {
  CreateMemberDto,
  UpdateMemberDto,
} from './dto-members/create-member.dto';
import { ErrorHandler } from 'src/shared/utils/handler-errors';
import { SuccessResponse } from 'src/shared/providers/format-success-response';
import { DocumentTypes } from 'src/shared/entities/DocumentTypes';
import { MemberResponseDto } from './dto-members/responses-members.dto';
import { PaginationResponseDTO } from 'src/shared/dto/pagination.dto';
import { AllQueryParams } from 'src/shared/dto/all-query-params';

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);

  constructor(
    @InjectRepository(Members, 'ibrsgdb')
    private readonly membersRepository: Repository<Members>,

    @InjectRepository(DocumentTypes, 'ibrsgdb')
    private readonly documentTypesRepository: Repository<DocumentTypes>,

    protected readonly errorHandler: ErrorHandler,
  ) {}

  async create(
    createMemberDto: CreateMemberDto,
  ): Promise<SuccessResponse<MemberResponseDto>> {
    const context = `${MembersService.name} | create`;
    this.logger.log(
      `Entered create method with data: ${JSON.stringify(createMemberDto)}`,
      context,
    );
    try {
      const newMember = this.membersRepository.create({
        ...createMemberDto,
        documentType: createMemberDto.documentTypeId
          ? ({
              documentTypeId: createMemberDto.documentTypeId,
            } as DocumentTypes)
          : null,
      });

      this.logger.debug(`Saving new member to the database`, context);

      const savedMember = await this.membersRepository.save(newMember);

      this.logger.log(
        `Member successfully created with ID: ${savedMember.memberId}`,
        context,
      );

      const responseData = new MemberResponseDto(savedMember);
      return new SuccessResponse<MemberResponseDto>(
        responseData,
        'Member successfully created',
        201,
        'success',
      );
    } catch (error) {
      this.logger.error('An error occurred while creating member', error.stack);
      this.errorHandler.handleServiceError(error);
    }
  }

  async findAll(
    queryParams: AllQueryParams,
  ): Promise<SuccessResponse<MemberResponseDto[]>> {
    const { documentNumber, page, limit } = queryParams;

    const context = `${MembersService.name} | findAll`;

    this.logger.verbose(
      `Iniciando búsqueda con parámetros: ${JSON.stringify(queryParams)}`,
      `${context} | BEGIN`,
    );

    try {
      const where: any = { isActive: true };

      // Aplicar filtro por número de documento si está presente
      if (documentNumber) {
        where.documentNumber = Like(`%${documentNumber}%`);
        this.logger.debug(
          `Filtro aplicado: Número de documento = ${documentNumber}`,
          context,
        );
      }

      const offset = (page - 1) * limit;
      this.logger.debug(
        `Ejecutando consulta con offset ${offset} y límite ${limit}`,
        context,
      );

      // Realizar la consulta con el filtro 'where'
      const [members, totalItems] = await this.membersRepository.findAndCount({
        where,
        relations: ['membersRoles', 'restrictedMembers', 'membersRoles.role'],
        skip: offset,
        take: limit,
        order: {
          auditCreationDate: 'DESC',
        },
      });

      this.logger.verbose(
        `Consulta ejecutada exitosamente, total de Miembros encontrados: ${totalItems}`,
        context,
      );

      // Mapear los miembros a MemberResponseDto
      const responseData = members.map(
        (member) => new MemberResponseDto(member),
      );

      // Crear el objeto de respuesta de paginación
      const pagination: PaginationResponseDTO = {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems: totalItems,
        limit: limit,
        offset: offset,
      };

      this.logger.log(
        `Respuesta generada con ${responseData.length} Miembros encontrados.`,
        `${context} | END`,
      );

      return new SuccessResponse<MemberResponseDto[]>(
        responseData,
        `Retrieved ${responseData.length} members`,
        200,
        'OK',
        pagination,
      );
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving members: ${error.message}`,
        `${context} | ERROR`,
      );
      this.errorHandler.handleServiceError(error);
    }
  }

  async findOne(id: number): Promise<SuccessResponse<MemberResponseDto>> {
    const context = `${MembersService.name} | findOne`;
    this.logger.log(`Entered findOne method with ID: ${id}`, context);

    try {
      this.logger.debug(`Looking for member with ID: ${id}`, context);

      const member = await this.membersRepository.findOne({
        where: { memberId: id, isActive: true },
        relations: ['documentType'],
      });

      if (!member) {
        this.logger.warn(`Member with ID ${id} not found`, context);
        throw new NotFoundException(`Member with ID ${id} not found`);
      }

      this.logger.log(`Member with ID: ${id} retrieved successfully`, context);

      // Usar el constructor de MemberResponseDto para crear la respuesta
      const responseData = new MemberResponseDto(member);

      return new SuccessResponse<MemberResponseDto>(
        responseData,
        `Member with ID ${id} retrieved successfully`,
        200,
        'OK',
      );
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving member with ID ${id}: ${error.message}`,
        context,
      );
      this.errorHandler.handleServiceError(error);
    }
  }

  async update(
    id: number,
    updateMemberDto: UpdateMemberDto,
  ): Promise<SuccessResponse<MemberResponseDto>> {
    const context = `${MembersService.name} | update`;
    this.logger.log(`Entered update method with ID: ${id}`, context);

    try {
      this.logger.debug(
        `Looking for member with ID: ${id} for update`,
        context,
      );

      const member = await this.membersRepository.findOne({
        where: { memberId: id, isActive: true },
        relations: ['documentType'],
      });

      if (!member) {
        this.logger.error(`Member with ID ${id} not found`, context);
        throw new NotFoundException(`Member with ID ${id} not found`);
      }

      if (updateMemberDto.documentTypeId) {
        this.logger.debug(
          `Looking for document type with ID: ${updateMemberDto.documentTypeId}`,
          context,
        );

        const documentType = await this.documentTypesRepository.findOne({
          where: { documentTypeId: updateMemberDto.documentTypeId },
        });

        if (!documentType) {
          this.logger.warn(
            `Document type with ID ${updateMemberDto.documentTypeId} not found`,
            context,
          );
          throw new BadRequestException(
            `Document type with ID ${updateMemberDto.documentTypeId} does not exist`,
          );
        }

        member.documentType = documentType;
      }

      this.logger.debug(
        `Updating member with data: ${JSON.stringify(updateMemberDto)}`,
        context,
      );

      Object.assign(member, updateMemberDto);
      const updatedMember = await this.membersRepository.save(member);

      this.logger.log(`Member with ID: ${id} successfully updated`, context);

      // Usar el constructor de MemberResponseDto para crear la respuesta
      const responseData = new MemberResponseDto(updatedMember);
      return {
        data: responseData,
        description: 'Member successfully updated',
        statusCode: 200,
        statusText: 'OK',
      };
    } catch (error) {
      this.logger.error(
        `An error occurred while updating member with ID ${id}: ${error.message}`,
        context,
      );
      this.errorHandler.handleServiceError(error);
    }
  }

  async softDelete(id: number): Promise<SuccessResponse<null>> {
    const context = `${MembersService.name} | softDelete`;
    this.logger.log(`Entered softDelete method with ID: ${id}`, context);

    try {
      this.logger.debug(
        `Looking for member with ID: ${id} to soft delete`,
        context,
      );

      const member = await this.membersRepository.findOne({
        where: { memberId: id, isActive: true },
      });

      if (!member) {
        this.logger.warn(
          `Member with ID ${id} not found or already inactive`,
          context,
        );
        throw new NotFoundException(
          `Member with ID ${id} not found or already inactive`,
        );
      }

      member.isActive = false;
      member.auditDeletionDate = new Date();

      this.logger.debug(`Marking member with ID: ${id} as inactive`, context);
      await this.membersRepository.save(member);

      this.logger.log(
        `Member with ID: ${id} successfully soft deleted`,
        context,
      );

      return {
        data: null,
        description: `Member with ID ${id} successfully soft deleted`,
        statusCode: 200,
        statusText: 'Ok',
      };
    } catch (error) {
      this.logger.error(
        `An error occurred while soft deleting member with ID ${id}: ${error.message}`,
        context,
      );
      this.errorHandler.handleServiceError(error);
    }
  }

  async findOneByDocumentNumber(documentNumber: string): Promise<Members> {
    const context = `${MembersService.name} | findOneByDocumentNumber`;
    this.logger.log(
      `Buscando miembro con número de documento: ${documentNumber}`,
      `${context} | DEBUG`,
    );

    try {
      const member = await this.membersRepository.findOne({
        where: { documentNumber, isActive: true },
        relations: ['membersRoles', 'restrictedMembers', 'membersRoles.role'],
      });

      if (!member) {
        this.logger.warn(
          `Miembro con número de documento ${documentNumber} no encontrado`,
          `${context} | WARN`,
        );
        return null;
      }

      this.logger.log(
        `Miembro encontrado: ${member.documentNumber}`,
        `${context} | SUCCESS`,
      );

      return member;
    } catch (error) {
      this.logger.error(
        `Error al buscar miembro: ${error.message}`,
        error.stack,
        `${context} | ERROR`,
      );
      throw error;
    }
  }

  async getMemberForLogin(
    criteria: Partial<Pick<Members, 'documentNumber'>>,
  ): Promise<Members> {
    const context = `${MembersService.name} | ${this.getMemberForLogin.name}`;
    const logData = JSON.stringify(criteria);

    this.logger.log(
      `Obteniendo miembro para login: ${logData}`,
      `${context} | DEBUG`,
    );

    try {
      const member = await this.membersRepository.findOne({
        where: { documentNumber: criteria.documentNumber },
        relations: ['membersRoles.role', 'restrictedMembers', 'membersGroups'],
        select: [
          'memberId',
          'documentNumber',
          'memberPassword',
          'firstName',
          'lastName',
          'email',
          'isActive',
          // 'auditCreationDate',
          // 'auditUpdateDate',
        ],
      });

      if (!member) {
        this.logger.warn(
          `Miembro con la criteria: ${logData} no encontrado`,
          `${context} | WARN`,
        );
        throw new NotFoundException(
          `Miembro con la criteria: ${logData} no encontrado`,
        );
      }

      this.logger.log(
        `Miembro para login obtenido exitosamente: ${member.documentNumber}`,
        `${context} | SUCCESS`,
      );

      return member;
    } catch (error) {
      this.logger.error(
        `Error al obtener miembro para login: ${error.message}`,
        error.stack,
        `${context} | ERROR`,
      );
      this.errorHandler.handleServiceError(error);
    }
  }
}
