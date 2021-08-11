import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationLogsController } from './operationLogs.controller';
import { OperationLogsRepository } from './operationLogs.repository';
import { OperationLogsService } from './operationLogs.service';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [TypeOrmModule.forFeature([OperationLogsRepository]),
  PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'user',
    session: false
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.EXPIRESIN)*100,
      },
    }),
    PassportModule
  ],
  providers: [OperationLogsService],
  exports: [OperationLogsService],
  controllers: [OperationLogsController],
})
export class OperationLogsModule {}
