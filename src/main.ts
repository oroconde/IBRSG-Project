import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './shared/filters/globa-exception.filter';
import { CustomValidationPipe } from './shared/pipes/custom-validation.pipe';

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

  // Registro del ValidationPipe global
  app.useGlobalPipes(new CustomValidationPipe());

  // Aplicar el filtro globalmente
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT);
}
bootstrap();
