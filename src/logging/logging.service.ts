import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggingService {
  private logger: winston.Logger;

  constructor() {
    const fileTransport = new winston.transports.DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: process.env.LOG_FILE_SIZE || '5m',
      maxFiles: '14d',
    });

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} [${level.toUpperCase()}]: ${message}`,
        ),
      ),
      transports: [fileTransport, new winston.transports.Console()],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(`${message} ${trace ? `Trace: ${trace}` : ''}`);
  }
}
