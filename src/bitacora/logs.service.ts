import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBitacoraDTO } from 'src/shared/dto/bitacoras/create-bitacora.dto';
import { Logs } from 'src/shared/entities/Logs';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Logs, 'ibrsgdb')
    private readonly logsRepository: Repository<Logs>,
  ) {}

  async create(logs: CreateBitacoraDTO, auditoriaUsuarioCreacion: number) {
    try {
      const bitacora = new Logs();

      bitacora.crudType = logs.tipoCrud;
      bitacora.tableName = logs.nombreTabla;
      bitacora.originalValue = logs.valorOriginal;
      bitacora.newValue = logs.valorNuevo;
      bitacora.recordId = logs.registroId;
      bitacora.auditCreationUser = auditoriaUsuarioCreacion;

      return this.logsRepository.save(bitacora);
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocurrio un error al guardar el registro en bitacora',
      );
    }
  }
}
