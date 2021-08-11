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
import { NewsService } from './news.service';
import { NewDTO } from './dto/new.dto';
import { New } from './news.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';
import { GetNewsFilterDTO } from './dto/getNews.filter.dto';

@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
@Controller('news')
export class NewsController {
  constructor(
    private newsService: NewsService
  ) { }

  @Post()
  @UsePipes(ValidationPipe)
  public async create(
    @Body() newsDTO: NewDTO,
  ): Promise<New> {
    try {
      const news = await this.newsService.save(newsDTO);
      return news;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @UsePipes(ValidationPipe)
  public async update(
    @Body() newsDTO: NewDTO,
  ): Promise<New> {
    try {
      const news = await this.newsService.save(newsDTO);
      return news;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  public async getAll(@Query() parameters: GetNewsFilterDTO): Promise<any> {
    try {
      const news = await this.newsService.getAll(parameters);

      return {
        data: news
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<New> {
    const news = await this.newsService.getOne(id);
    return news;
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    const deletedNew = await this.newsService.delete(id);
    return deletedNew;
  }
}