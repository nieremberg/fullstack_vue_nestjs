import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ConfigService } from '@nestjs/config'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  constructor(private configService: ConfigService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status: number
    let message: string | object
    let error: string

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()

      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || exception.message
        error = (exceptionResponse as any).error || exception.name
      } else {
        message = exceptionResponse
        error = exception.name
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
      message = 'Internal server error'
      error = 'InternalServerError'

      // Log unexpected errors
      this.logger.error(
        `Unexpected error occurred: ${exception}`,
        (exception as Error).stack,
      )
    }

    const errorResponse = {
      statusCode: status,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    }

    // Add stack trace in development
    if (
      this.configService.get('NODE_ENV') === 'development' && 
      exception instanceof Error
    ) {
      (errorResponse as any).stack = exception.stack
    }

    // Log error details
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      JSON.stringify({
        ...errorResponse,
        body: request.body,
        query: request.query,
        params: request.params,
        headers: {
          'user-agent': request.headers['user-agent'],
          'content-type': request.headers['content-type'],
          authorization: request.headers.authorization ? '[REDACTED]' : undefined,
        },
      }),
    )

    response.status(status).json(errorResponse)
  }
}
