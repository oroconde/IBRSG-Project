import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { MembersModule } from './members/members.module';
import { ConfigModule } from '@nestjs/config';
import { SermonsModule } from './sermons/sermons.module';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './bitacora/logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    LogsModule,
    MembersModule,
    SermonsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
