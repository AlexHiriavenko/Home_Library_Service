import { Injectable, Logger, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService extends Logger {
  private readonly logDirectory = 'logs';
  private readonly maxFileSize = this.parseFileSize(
    process.env.LOG_FILE_SIZE || '5m',
  );
  private readonly retentionDays = parseInt(
    process.env.LOG_FILE_DAYS || '14',
    10,
  );
  private readonly activeLogLevels: LogLevel[];

  constructor() {
    super();
    this.ensureLogDirectory();
    this.cleanOldLogs();

    const level = process.env.LOG_LEVEL || 'log';
    this.activeLogLevels = this.getLogLevels(level);
  }

  log(message: string) {
    if (this.isLevelEnabled('log')) {
      super.log(message);
      this.writeToFile('app', message, 'INFO');
    }
  }

  warn(message: string) {
    if (this.isLevelEnabled('warn')) {
      super.warn(message);
      this.writeToFile('app', message, 'WARN');
    }
  }

  error(message: string, trace?: string) {
    if (this.isLevelEnabled('error')) {
      super.error(message, trace);
      const errorMessage = `${message}${trace ? `\nTrace: ${trace}` : ''}`;
      this.writeToFile('error', errorMessage, 'ERROR');
    }
  }

  private ensureLogDirectory() {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory);
    }
  }

  private getFormattedDate(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(now.getDate()).padStart(2, '0')}`;
  }

  private getLogFilePath(prefix: string): string {
    const date = this.getFormattedDate();
    return path.join(this.logDirectory, `${prefix}-${date}.log`);
  }

  private writeToFile(prefix: string, message: string, level: string) {
    const logMessage = `${new Date().toISOString()} [${level}]: ${message}\n`;
    const filePath = this.getLogFilePath(prefix);

    fs.appendFile(filePath, logMessage, (err) => {
      if (err) {
        console.error(`Failed to write log to ${filePath}:`, err.message);
      } else {
        this.checkFileSize(filePath);
      }
    });
  }

  private checkFileSize(filePath: string) {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(
          `Failed to check file size for ${filePath}:`,
          err.message,
        );
        return;
      }

      if (stats.size > this.maxFileSize) {
        this.rotateFile(filePath);
      }
    });
  }

  private rotateFile(filePath: string) {
    const rotatedPath = `${filePath}.${Date.now()}`;
    fs.rename(filePath, rotatedPath, (err) => {
      if (err) {
        console.error(`Failed to rotate file ${filePath}:`, err.message);
      } else {
        this.cleanOldLogs();
      }
    });
  }

  private cleanOldLogs() {
    const now = Date.now();
    const retentionPeriod = this.retentionDays * 24 * 60 * 60 * 1000;

    fs.readdir(this.logDirectory, (err, files) => {
      if (err) {
        console.error(
          `Failed to read log directory ${this.logDirectory}:`,
          err.message,
        );
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(this.logDirectory, file);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error(`Failed to stat file ${filePath}:`, err.message);
            return;
          }

          if (now - stats.mtime.getTime() > retentionPeriod) {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(
                  `Failed to delete old log file ${filePath}:`,
                  err.message,
                );
              }
            });
          }
        });
      });
    });
  }

  private parseFileSize(size: string): number {
    const match = size.toLowerCase().match(/^(\d+)(k|m|g)?$/);
    if (!match) {
      throw new Error(`Invalid file size format: ${size}`);
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 'k':
        return value * 1024;
      case 'm':
        return value * 1024 * 1024;
      case 'g':
        return value * 1024 * 1024 * 1024;
      default:
        return value;
    }
  }

  private getLogLevels(level: string): LogLevel[] {
    const levels: { [key: string]: LogLevel[] } = {
      error: ['error'],
      warn: ['error', 'warn'],
      log: ['error', 'warn', 'log'],
    };

    return levels[level] || ['error', 'warn', 'log'];
  }

  private isLevelEnabled(level: LogLevel): boolean {
    return this.activeLogLevels.includes(level);
  }
}
