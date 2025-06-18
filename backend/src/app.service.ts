import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getAppInfo() {
    return {
      name: this.configService.get('APP_NAME') || 'Fullstack Vue + NestJS',
      version: this.configService.get('APP_VERSION') || '1.0.0',
      description: 'Modern fullstack application with Vue 3 and NestJS',
      environment: this.configService.get('NODE_ENV') || 'development',
      timestamp: new Date().toISOString(),
    }
  }

  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024),
      },
      environment: this.configService.get('NODE_ENV') || 'development',
      version: this.configService.get('APP_VERSION') || '1.0.0',
    }
  }
}
