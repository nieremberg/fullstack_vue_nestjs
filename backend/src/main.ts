import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get(ConfigService)
  const logger = new Logger('Bootstrap')

  // Enable CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  })

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }))

  // Compression middleware
  app.use(compression())

  // Cookie parser
  app.use(cookieParser())

  // Global prefix
  app.setGlobalPrefix('api', {
    exclude: ['health', '/'],
  })

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter())

  // Global interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  )

  // Static files
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  })

  // Swagger documentation
  if (configService.get('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle(configService.get('SWAGGER_TITLE') || 'Fullstack API')
      .setDescription(
        configService.get('SWAGGER_DESCRIPTION') || 
        'API documentation for Fullstack Vue + NestJS application'
      )
      .setVersion(configService.get('SWAGGER_VERSION') || '1.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .addTag('Authentication', 'Auth endpoints')
      .addTag('Users', 'User management endpoints')
      .addTag('Upload', 'File upload endpoints')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup(configService.get('SWAGGER_PATH') || 'api', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  }

  // Health check endpoint
  app.use('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: configService.get('NODE_ENV'),
      version: configService.get('APP_VERSION') || '1.0.0',
    })
  })

  const port = configService.get('PORT') || 3001
  await app.listen(port)

  logger.log(`🚀 Application is running on: http://localhost:${port}`)
  logger.log(`📚 Swagger documentation: http://localhost:${port}/api`)
  logger.log(`❤️  Health check: http://localhost:${port}/health`)
}

bootstrap().catch((error) => {
  Logger.error('Failed to start application', error)
  process.exit(1)
})
