import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { ReceiversService } from './receivers.service';
import { ReceiverDTO } from './dto/receiver.dto';
import { Receiver } from './receiver.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';
import { GetReceiversFilterDTO } from './dto/getReceivers.filter.dto';

@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
@Controller('receivers')
export class ReceiversController {
  constructor(
    private receiversService: ReceiversService
  ) { }

  @Post()
  @UsePipes(ValidationPipe)
  public async create(
    @Body() receiversDTO: ReceiverDTO,
  ): Promise<Receiver> {
    try {
      const receivers = await this.receiversService.save(receiversDTO);
      return receivers;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @UsePipes(ValidationPipe)
  public async update(
    @Body() receiversDTO: ReceiverDTO,
  ): Promise<Receiver> {
    try {
      const receivers = await this.receiversService.save(receiversDTO);
      return receivers;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  public async getAll(@Query() parameters: GetReceiversFilterDTO): Promise<any> {
    try {
      const receivers = await this.receiversService.getAll(parameters);

      return {
        data: receivers
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<Receiver> {
    const receivers = await this.receiversService.getOne(id);
    return receivers;
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    const deletedReceiver = await this.receiversService.delete(id);
    return deletedReceiver
  }
}