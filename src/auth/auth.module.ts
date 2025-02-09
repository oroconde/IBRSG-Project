// import { Module, Global } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthService } from './auth.service';
// import { MembersService } from 'src/members/members.service';
// import { AuthController } from './auth.controller';
// import { Members } from 'src/shared/entities/Members';
// import { MembersRoles } from 'src/shared/entities/MembersRoles';
// import { DocumentTypes } from 'src/shared/entities/DocumentTypes';
// import { SharedModule } from 'src/shared/shared.module';

// @Global()
// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Members, DocumentTypes, MembersRoles], 'ibrsgdb'),
//     JwtModule.register({
//       secret: process.env.JWT_SECRET_KEY || 'API_KEY',
//       signOptions: { expiresIn: '1h' },
//     }),
//     SharedModule,
//   ],
//   providers: [AuthService, MembersService],
//   controllers: [AuthController],
// })
// export class AuthModule {}
