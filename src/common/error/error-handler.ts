import { LoggingService } from 'src/logging/logging.service';

export function setupGlobalErrorHandlers(loggingService: LoggingService) {
  process.on('uncaughtException', (err) => {
    loggingService.error('Uncaught Exception:', err.stack);
    console.error('Uncaught Exception:', err.stack);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('Unhandled Rejection:', JSON.stringify(reason));
    console.error('Unhandled Rejection:', reason);
  });
}
