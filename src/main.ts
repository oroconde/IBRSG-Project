import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('API Iglesia Reformada Bautista Sublime Gracia')
    .setDescription('Proyecto Donación')
    .setVersion('1.0')
    // .addBearerAuth() // Esquema que permite la autenticación para la API REST mediante el uso de tokens de acceso y actualización JWT.
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transform: true: NestJS convierte automáticamente el objeto plano en una instancia de AllQueryParams, transformando las propiedades al tipo correcto (sólo para casos simples)
      transformOptions: {
        enableImplicitConversion: true, // true: NestJS automáticamente intenta convertir los valores al tipo definido en el DTO (number, boolean, etc.) basado en el diseño de la clase
      },
      whitelist: true, // whitelist en true: ayuda a proteger tu aplicación de entradas inesperadas o maliciosas. Nest elimina las propiedades no definidas en los DTOs antes de que el controlador reciba los datos.
      forbidNonWhitelisted: true, // forbidNonWhitelisted en true: es útil para validar estrictamente la entrada y detectar posibles errores o intentos de manipulación.
    }),
  );

  // Aplicar el filtro globalmente: GlobalExceptionFilter
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT);
}
bootstrap();
