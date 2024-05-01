import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Miembros } from 'src/shared/entities/Miembros.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Miembros], 'ibrsgDB')],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule { }
