import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Members } from 'src/shared/entities/Members';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Members], 'ibrsgdb'),
  ],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
