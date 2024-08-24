import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (!token) {
      this.logger.warn('Intento de acceso sin token.');
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      this.logger.debug(`Token recibido: ${token}`);

      // Verificar la firma del token y decodificar el payload
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'API_KEY',
      });

      // Adjuntar los datos decodificados al objeto de solicitud si es necesario
      request['user'] = decodedToken;

      this.logger.debug('Token verificado exitosamente');
      this.logger.debug(`Datos del usuario: ${JSON.stringify(decodedToken)}`);

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        this.logger.error('Error: Token expirado.');
        throw new UnauthorizedException('Token expirado');
      }

      this.logger.error(`Error al verificar el token: ${error.message}`);
      throw new UnauthorizedException('Token inválido');
    }
  }
}
