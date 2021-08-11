import {
  Controller,
  Get,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('statistics')
@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
export class StatisticsController {
  constructor(
    private statisticService: StatisticsService
  ) { }

  @Get() 
  public async getData(): Promise<any> {
    try {
      const statistics = await this.statisticService.getAll();
      return statistics;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/counts') 
  public async getCounts(): Promise<any> {
    try {
      const statistics = await this.statisticService.getCounts();
      return statistics;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/anual-count')
  public async getAnualCount(): Promise<any> {
    try {
      const statistics = await this.statisticService.getAnualCount();
      return statistics;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/month-count/:month')
  public async getMonthCount(@Param('month') month): Promise<any> {
    try {
      const statistics = await this.statisticService.getMonthCount(month);
      return statistics;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}