import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from 'src/shared/entities/Logs';
import { LogService } from './logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Logs], 'ibrsgdb')],
  providers: [LogService],
})
export class LogsModule {}
