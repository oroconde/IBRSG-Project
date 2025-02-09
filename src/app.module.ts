import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { MembersModule } from './members/members.module';
import { ConfigModule } from '@nestjs/config';
import { SermonsModule } from './sermons/sermons.module';
// import { AuthModule } from './auth/auth.module';
import { LogsModule } from './bitacora/logs.module';
import { CommentsModule } from './comments/comments.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    // AuthModule,
    LogsModule,
    MembersModule,
    SermonsModule,
    CommentsModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
