import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Zero-to-Hero')
    .setDescription('Z2H api')
    .setVersion('1.0')
    .addTag('z2h')
    .addBearerAuth({type: 'http', scheme: 'bearer', bearerFormat:'Token'},
      'access-token'
    )
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(7777);
}
bootstrap();
