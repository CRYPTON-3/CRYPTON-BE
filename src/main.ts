import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });
  app.use(cookieParser());

  // class-validator, class-transformer와 연계해서 controller에서 request body 같은거 dto 타입지정 해 놓으면 자동으로 검증해주고 인스턴스 변환도 해줍니다!
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      enableDebugMessages: true,
    }),
  );

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Crypton API')
    .setDescription('Crypton API description')
    .setVersion('1.0')
    .addTag('Crypton')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
