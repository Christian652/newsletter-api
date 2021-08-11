import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receiver } from './receiver.entity';
import { ReceiverDTO } from './dto/receiver.dto';
import { ReceiversRepository } from './receivers.repository';
import { GetReceiversFilterDTO } from './dto/getReceivers.filter.dto';

@Injectable()
export class ReceiversService {
  private readonly logger = new Logger(ReceiversService.name);

  constructor(
    @InjectRepository(ReceiversRepository)
    private ReceiverRepository: ReceiversRepository,
  ) { }

  public async save(
    newDTO: ReceiverDTO,
  ): Promise<Receiver> {
    try {
      this.logger.log(` Saving ${newDTO.name} Receiver`);
      return await this.ReceiverRepository.saveReceiver(newDTO);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(parameters: GetReceiversFilterDTO): Promise<Receiver[]> {
    return await this.ReceiverRepository.getAll(parameters);
  }

  public async findAll(): Promise<Receiver[]> {
    return await this.ReceiverRepository.findAll();
  }

  public async getOne(id: number): Promise<Receiver> {

    const foundReceiver = await this.ReceiverRepository.findOne(id);
    if (!foundReceiver) {
      this.logger.warn(` Can't Found Receiver With Id : ${id} `);
      throw new NotFoundException(`Não Existe Local De Coleta Com o Id: ${id}`);
    }
    return foundReceiver;
  }

  public async delete(newId: number): Promise<void> {
    try {
      this.logger.log(` Deleting Receiver : ${newId} `);
      await this.getOne(newId);
        
      await this.ReceiverRepository.delete(newId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}