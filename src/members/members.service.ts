import {
  BadRequestException,
  ConflictException,
  Injectable,
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
import { PaginationResponseDTO } from 'src/shared/commond/pagination.dto';
import { SuccessResponse } from 'src/shared/commond/format-success-response';
import { ApiResponseDTO } from 'src/shared/commond/common-responses.dto';
import { DocumentTypes } from 'src/shared/entities/DocumentTypes';

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);

  constructor(
    @InjectRepository(Members, 'ibrsgdb')
    private readonly membersRepository: Repository<Members>,
    @InjectRepository(DocumentTypes, 'ibrsgdb')
    private readonly documentTypesRepository: Repository<DocumentTypes>,
  ) {}

  async create(
    createMemberDto: CreateMemberDto,
  ): Promise<SuccessResponse<CreateMemberDto>> {
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
        throw new ConflictException(
          `Member with document number ${createMemberDto.documentNumber} already exists`,
        );
      }

      const documentType = await this.documentTypesRepository.findOne({
        where: { documentTypeId: createMemberDto.documentTypeId },
      });

      if (!documentType) {
        throw new BadRequestException(
          `Document type with ID ${createMemberDto.documentTypeId} does not exist`,
        );
      }

      const newMember = this.membersRepository.create({
        ...createMemberDto,
        documentType: documentType,
      });

      const savedMember = await this.membersRepository.save(newMember);
      // Crear el objeto de respuesta que cumpla con el tipo CreateMemberDto
      const responseData: CreateMemberDto = {
        ...createMemberDto,
        documentTypeId: savedMember.documentType.documentTypeId,
      };

      return {
        data: responseData,
        description: 'Member successfully created',
        statusCode: 201,
        statusText: 'success',
      };
    } catch (error) {
      this.logger.error('An error occurred while creating member', error.stack);
      ErrorHandler.handleServiceError(error);
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<SuccessResponse<CreateMemberDto[]>> {
    this.logger.log(
      `Entered findAll method in MembersService with page: ${page} and limit: ${limit}`,
    );

    try {
      const offset = (page - 1) * limit;
      const [members, totalItems] = await this.membersRepository.findAndCount({
        where: { isActive: true }, // Agrega la condición para filtrar solo registros activos
        skip: offset,
        take: limit,
        relations: ['documentType'], // Asegúrate de cargar las relaciones necesarias
      });

      const totalPages = Math.ceil(totalItems / limit);

      // Transformar los miembros obtenidos en objetos CreateMemberDto
      const data: CreateMemberDto[] = members.map((member) => ({
        documentNumber: member.documentNumber,
        documentTypeId: member.documentType.documentTypeId,
        firstName: member.firstName,
        middleName: member.middleName,
        lastName: member.lastName,
        secondLastName: member.secondLastName,
        email: member.email,
        landline: member.landline,
        mobilePhone: member.mobilePhone,
        birthDate: member.birthDate,
      }));

      // Crear el objeto de respuesta de paginación
      const pagination: PaginationResponseDTO = {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalItems,
        limit: limit,
        offset: offset,
      };

      return new SuccessResponse<CreateMemberDto[]>(
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

  async findOne(id: number): Promise<SuccessResponse<CreateMemberDto>> {
    this.logger.log(`Entered findOne method in MembersService with id: ${id}`);
    try {
      const member = await this.membersRepository.findOne({
        where: { memberId: id, isActive: true },
        relations: ['documentType'],
      });

      if (!member) {
        throw new NotFoundException(`Member with ID ${id} not found`);
      }

      // Transformar el miembro obtenido en un objeto CreateMemberDto
      const data: CreateMemberDto = {
        documentNumber: member.documentNumber,
        documentTypeId: member.documentType.documentTypeId,
        firstName: member.firstName,
        middleName: member.middleName,
        lastName: member.lastName,
        secondLastName: member.secondLastName,
        email: member.email,
        landline: member.landline,
        mobilePhone: member.mobilePhone,
        birthDate: member.birthDate,
      };

      return new SuccessResponse<CreateMemberDto>(
        data,
        `Member with ID ${id} retrieved successfully`,
        200,
        'OK',
      );
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving member with ID ${id}`,
        error.stack,
      );
      ErrorHandler.handleServiceError(error);
    }
  }

  async update(
    id: number,
    updateMemberDto: UpdateMemberDto,
  ): Promise<SuccessResponse<UpdateMemberDto>> {
    this.logger.log(`Entered update method in MembersService with id: ${id}`);

    try {
      const member = await this.membersRepository.findOne({
        where: { memberId: id, isActive: true },
        relations: ['documentType'], // Asegurarse de que las relaciones necesarias estén cargadas
      });

      if (!member) {
        this.logger.error(`Member with ID ${id} not found`);
        throw new NotFoundException(`Member with ID ${id} not found`);
      }

      // Si el DTO contiene un nuevo documentTypeId, actualizamos la relación
      if (updateMemberDto.documentTypeId) {
        const documentType = await this.documentTypesRepository.findOne({
          where: { documentTypeId: updateMemberDto.documentTypeId },
        });

        if (!documentType) {
          throw new BadRequestException(
            `Document type with ID ${updateMemberDto.documentTypeId} does not exist`,
          );
        }
        member.documentType = documentType; // Actualizar la relación
      }

      Object.assign(member, updateMemberDto); // Aplicar los demás cambios del DTO al miembro
      const updatedMember = await this.membersRepository.save(member);
      const responseData: UpdateMemberDto = {
        ...updateMemberDto,
        documentTypeId: updatedMember.documentType.documentTypeId, // Asegurar que el ID del tipo de documento se incluya
      };

      return {
        data: responseData,
        description: 'Member successfully updated',
        statusCode: 200,
        statusText: 'OK',
      };
    } catch (error) {
      this.logger.error(
        `An error occurred while updating member with ID ${id}`,
        error.stack,
      );
      ErrorHandler.handleServiceError(error);
    }
  }

  async softDelete(id: number): Promise<ApiResponseDTO<null>> {
    this.logger.log(
      `Entered softDelete method in MembersService with id: ${id}`,
    );
    try {
      const member = await this.membersRepository.findOne({
        where: { memberId: id, isActive: true },
      });

      if (!member) {
        this.logger.warn(`Member with ID ${id} not found or already inactive`);
        throw new NotFoundException(
          `Member with ID ${id} not found or already inactive`,
        );
      }

      member.isActive = false;
      member.auditDeletionDate = new Date();
      await this.membersRepository.save(member);

      return {
        data: null,
        description: `Member with ID ${id} successfully soft deleted`,
        statusCode: 200,
        statusText: 'Ok',
      };
    } catch (error) {
      ErrorHandler.handleServiceError(error);
    }
  }
}
