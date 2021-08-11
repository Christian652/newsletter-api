import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { ReceiversModule } from 'src/receivers/receivers.module';
import { SmtpModule } from 'src/smtp/smtp.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { NewsController } from './news.controller';
import { NewsRepository } from './news.repository';
import { NewsService } from './news.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsRepository, UserRepository]),
    AuthModule,
    SmtpModule,
    ReceiversModule
  ], 
  controllers: [NewsController],
  providers: [NewsService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  exports: [
    NewsService
  ]
})
export class NewsModule {}
