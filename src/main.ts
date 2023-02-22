import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Document를 설정
  const options = new DocumentBuilder()
    .setTitle('StackFlow MongoDB Example')
    .setVersion('1.0')
    .build();

  // Swagger Document의 문서를 api(/api-docs)로 설정할수 있게 셋팅
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(+process.env.NEST_PORT);
  console.log('NestJS Port : ', +process.env.NEST_PORT);
  console.log(
    `Swagger Document : http://127.0.0.1:${process.env.NEST_PORT}/api`,
  );
}
bootstrap();
