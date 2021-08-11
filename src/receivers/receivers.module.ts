import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { ReceiversController } from './receivers.controller';
import { ReceiversRepository } from './receivers.repository';
import { ReceiversService } from './receivers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceiversRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [ReceiversController],
  providers: [ReceiversService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  exports: [
    ReceiversService
  ]
})
export class ReceiversModule {}
