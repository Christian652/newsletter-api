import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { configService } from './config/orm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/role.module';
import { LoggerMiddleware } from './operationLogs/logger.middleware';
import { UserController } from './user/user.controller';
import { OperationLogsModule } from './operationLogs/operationLogs.module';
import { StatisticsModule } from './statistics/statistics.module';
import { NewsModule } from './news/news.module';
import { ReceiversModule } from './receivers/receivers.module';

@Module({
  imports: [ TypeOrmModule.forRoot(configService.getTypeOrmData()), UserModule, AuthModule, RolesModule, OperationLogsModule, NewsModule, ReceiversModule, StatisticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/users/(.*)', method: RequestMethod.GET},
        { path: '/users', method: RequestMethod.GET },
      )
      .forRoutes(UserController)
  }
}


