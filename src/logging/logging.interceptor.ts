import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggingService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, query } = request;

    this.logger.log(
      `Incoming Request: ${method} ${url} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        this.logger.log(
          `Response: ${method} ${url} - Status: ${statusCode} - Duration: ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
