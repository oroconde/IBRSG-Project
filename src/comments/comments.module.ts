import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from 'src/shared/entities';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([...Entities], 'ibrsgdb'), SharedModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
