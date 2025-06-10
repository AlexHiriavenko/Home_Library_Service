import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  fs.writeFileSync('./doc/api.yaml', JSON.stringify(document, null, 2));

  SwaggerModule.setup('api', app, document);
}
