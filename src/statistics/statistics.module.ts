import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { NewsModule } from 'src/news/news.module';
import { NewsRepository } from 'src/news/news.repository';
import { ReceiversModule } from 'src/receivers/receivers.module';
import { ReceiversRepository } from 'src/receivers/receivers.repository';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository, 
      NewsRepository,
      ReceiversRepository
    ]),
    AuthModule,
    UserModule,
    ReceiversModule,
    NewsModule
  ], 
  controllers: [StatisticsController],
  providers: [StatisticsService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class StatisticsModule {}
