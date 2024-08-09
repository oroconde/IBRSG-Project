import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Miembros } from 'src/shared/entities/Miembros.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);

  constructor(
    @InjectRepository(Miembros, 'ibrsgDB')
    private miembrosRepository: Repository<Miembros>,
  ) {}

  async findAll(): Promise<Miembros[]> {
    this.logger.log(`findAll method called.`);
    try {
      return await this.miembrosRepository.find();
    } catch (error) {
      handleError(error, this.logger);
    }
  }

  async findOne(id: number): Promise<Miembros> {
    this.logger.log(`findOne method called with id: ${id}.`);
    try {
      const member = await this.miembrosRepository.findOne({ where: { id } });
      if (!member) {
        throw new NotFoundException('Miembro no encontrado');
      }
      return member;
    } catch (error) {
      handleError(error, this.logger);
    }
  }

  async create(memberData: Partial<Miembros>): Promise<Miembros> {
    this.logger.log(
      `create method called with data: ${JSON.stringify(memberData)}.`,
    );
    try {
      const member = this.miembrosRepository.create(memberData);
      return await this.miembrosRepository.save(member);
    } catch (error) {
      handleError(error, this.logger);
    }
  }

  async update(id: number, memberData: Partial<Miembros>): Promise<Miembros> {
    this.logger.log(
      `update method called with id: ${id} and data: ${JSON.stringify(memberData)}.`,
    );
    try {
      await this.miembrosRepository.update(id, memberData);
      const member = await this.miembrosRepository.findOne({ where: { id } });
      if (!member) {
        throw new NotFoundException('Miembro no encontrado');
      }
      return member;
    } catch (error) {
      handleError(error, this.logger);
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`remove method called with id: ${id}.`);
    try {
      const result = await this.miembrosRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Miembro no encontrado');
      }
    } catch (error) {
      handleError(error, this.logger);
    }
  }
}
function handleError(error: any, logger: Logger) {
  throw new Error('Function not implemented.');
}
