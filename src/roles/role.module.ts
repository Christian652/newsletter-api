import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { RolesController } from './role.controller';
import { RolesService } from './role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule
  ], 
  controllers: [RolesController],
  providers: [RolesService, UserService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class RolesModule {}
