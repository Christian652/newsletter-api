import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { New } from './news.entity';
import { NewDTO } from './dto/new.dto';
import { NewsRepository } from './news.repository';
import { GetNewsFilterDTO } from './dto/getNews.filter.dto';
import { SmtpService } from 'src/smtp/smtp.service';
import { ReceiversService } from 'src/receivers/receivers.service';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);

  constructor(
    @InjectRepository(NewsRepository)
    private NewRepository: NewsRepository,
    private smtpService: SmtpService,
    private receiversService: ReceiversService,
  ) { }

  public async save(
    newDTO: NewDTO,
  ): Promise<New> {
    try {
      this.logger.log(` Saving ${newDTO.title} New`);
      const new_ = await this.NewRepository.saveNew(newDTO);
      const receivers = await this.receiversService.findAll();
      const emails = receivers.map(item => item.email);

      await this.smtpService.sendEmail({
        to: emails,
        subject: `Noticias Quentes: ${new_.title}`,
        text: new_.body,
      });
      
      return new_;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(parameters: GetNewsFilterDTO): Promise<New[]> {
    return await this.NewRepository.getAll(parameters);
  }

  public async getOne(id: number): Promise<New> {

    const foundNew = await this.NewRepository.findOne(id);
    if (!foundNew) {
      this.logger.warn(` Can't Found New With Id : ${id} `);
      throw new NotFoundException(`Não Existe Local De Coleta Com o Id: ${id}`);
    }
    return foundNew;
  }

  public async delete(newId: number): Promise<void> {
    try {
      this.logger.log(` Deleting New : ${newId} `);
      await this.getOne(newId);
        
      await this.NewRepository.delete(newId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}