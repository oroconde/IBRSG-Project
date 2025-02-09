import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { JwtModule } from '@nestjs/jwt';
import { Entities } from 'src/shared/entities';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([...Entities], 'ibrsgdb'),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
    SharedModule,
  ],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
