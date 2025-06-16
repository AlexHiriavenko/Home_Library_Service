import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { setupSwagger } from '../swagger';
import { AllExceptionsFilter } from './common/exceptionFilter/exception.filter';
import { LoggingService } from './logging/logging.service';
import { setupGlobalErrorHandlers } from './common/error/error-handler';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  app.useGlobalFilters(new AllExceptionsFilter(loggingService));

  setupGlobalErrorHandlers(loggingService);

  setupSwagger(app);

  await app.listen(PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);

  console.log(`Swagger is running on: ${await app.getUrl()}/api`);
}

bootstrap();
