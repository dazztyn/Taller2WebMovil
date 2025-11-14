import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.enableCors();

 
  const config = new DocumentBuilder()
    .setTitle('API Películas - NestJS') // <-- Ajustado
    .setDescription('API de Películas para el taller de InfoMóvil') // <-- Ajustado
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // La doc estará en /api-docs

  await app.listen(3000);
  console.log(`API corriendo en: http://localhost:3000`);
  console.log(`Documentación Swagger en: http://localhost:3000/api-docs`);
}
bootstrap();