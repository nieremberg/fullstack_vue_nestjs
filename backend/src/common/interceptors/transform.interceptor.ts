import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  data: T
  message?: string
  success: boolean
  timestamp: string
  statusCode: number
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse()

    return next.handle().pipe(
      map((data) => {
        // Handle different response types
        if (data && typeof data === 'object' && 'data' in data) {
          // Already formatted response
          return {
            success: true,
            timestamp: new Date().toISOString(),
            statusCode: response.statusCode,
            ...data,
          }
        }

        // Format raw data
        return {
          success: true,
          data,
          timestamp: new Date().toISOString(),
          statusCode: response.statusCode,
        }
      }),
    )
  }
}
