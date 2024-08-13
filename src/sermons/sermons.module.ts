import { Module } from '@nestjs/common';
import { SermonsService } from './sermons.service';
import { SermonsController } from './sermons.controller';
import { Sermons } from 'src/shared/entities/Sermons';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Preachers } from 'src/shared/entities/Preachers';
import { SermonComments } from 'src/shared/entities/SermonComments';
import { Categories } from 'src/shared/entities/Categories';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature(
      [Sermons, Preachers, SermonComments, Categories],
      'ibrsgdb',
    ),
  ],
  controllers: [SermonsController],
  providers: [SermonsService],
})
export class SermonsModule {}
