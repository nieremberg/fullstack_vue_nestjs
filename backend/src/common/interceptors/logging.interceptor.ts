import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Request, Response } from 'express'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>()
    const response = context.switchToHttp().getResponse<Response>()
    const { method, url, body, query, params } = request
    const userAgent = request.get('User-Agent') || ''
    const ip = request.ip
    const userId = (request as any).user?.id || 'anonymous'

    const now = Date.now()

    this.logger.log(
      `📥 ${method} ${url} - ${ip} - ${userAgent} - User: ${userId}`,
    )

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now
        const { statusCode } = response

        this.logger.log(
          `📤 ${method} ${url} - ${statusCode} - ${responseTime}ms`,
        )

        // Log request details in development
        if (process.env.NODE_ENV === 'development') {
          this.logger.debug('Request details:', {
            method,
            url,
            body: this.sanitizeBody(body),
            query,
            params,
            headers: {
              'content-type': request.headers['content-type'],
              'user-agent': userAgent,
              authorization: request.headers.authorization ? '[REDACTED]' : undefined,
            },
            statusCode,
            responseTime: `${responseTime}ms`,
          })
        }
      }),
    )
  }

  private sanitizeBody(body: any): any {
    if (!body || typeof body !== 'object') {
      return body
    }

    const sanitized = { ...body }

    // Remove sensitive fields
    const sensitiveFields = ['password', 'confirmPassword', 'token', 'secret']
    sensitiveFields.forEach(field => {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]'
      }
    })

    return sanitized
  }
}
