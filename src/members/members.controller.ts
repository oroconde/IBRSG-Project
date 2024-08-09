import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { MembersService } from './members.service';
import { Miembros } from 'src/shared/entities/Miembros.entity';
import { CreateMemberDto } from 'src/shared/dto/create-member.dto';
import { UpdateMemberDto } from '../shared/dto/update-member.dto';

@Controller('miembros')
@ApiTags('miembros')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los miembros' })
  @ApiResponse({ status: 200, description: 'OK', type: [Miembros] })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  async findAll(): Promise<Miembros[]> {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un miembro por ID' })
  @ApiParam({ name: 'id', description: 'ID del miembro' })
  @ApiResponse({ status: 200, description: 'OK', type: Miembros })
  @ApiNotFoundResponse({ description: 'Miembro no encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Miembros> {
    return this.membersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo miembro' })
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({
    status: 201,
    description: 'Creado exitosamente',
    type: Miembros,
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() CreateMemberDto: CreateMemberDto): Promise<Miembros> {
    return this.membersService.create(CreateMemberDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un miembro existente por ID' })
  @ApiParam({ name: 'id', description: 'ID del miembro' })
  @ApiBody({ type: UpdateMemberDto })
  @ApiResponse({ status: 200, description: 'OK', type: Miembros })
  @ApiNotFoundResponse({ description: 'Miembro no encontrado' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateMemberDto: UpdateMemberDto,
  ): Promise<Miembros> {
    return this.membersService.update(id, UpdateMemberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un miembro por ID' })
  @ApiParam({ name: 'id', description: 'ID del miembro' })
  @ApiResponse({ status: 204, description: 'Eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Miembro no encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.membersService.remove(id);
  }
}
