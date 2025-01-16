import { Module } from '@nestjs/common';
import { SermonsService } from './sermons.service';
import { SermonsController } from './sermons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Entities } from 'src/shared/entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([...Entities], 'ibrsgdb'),
  ],
  controllers: [SermonsController],
  providers: [SermonsService],
})
export class SermonsModule {}
