import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './utils/winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: winstonLogger,
  });

  app.use(
    ['/api', '/api-json'],
    expressBasicAuth({
      challenge: true,
      users: { [process.env.SWAGGER_ID]: process.env.SWAGGER_PW },
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('ReadMe')
    .setDescription('ReadMe API description')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .addTag('Test')
    .addTag('Auth')
    .addTag('User')
    .addTag('Profile')
    .addTag('Upload')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3601);
}
bootstrap();
