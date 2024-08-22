import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'API_KEY',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '15m' },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
