import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { OperationLogsDTO } from './dto/operationLogs.dto';
import { OperationLogsRepository } from './operationLogs.repository';
import { LogFiltersDto } from './dto/logFilters.dto';

@Injectable()
export class OperationLogsService {
  constructor(
    @InjectRepository(OperationLogsRepository)
    private operationLogsRepository: OperationLogsRepository,
  ) {}

  public async save(
    operationLogsDto: OperationLogsDTO,
  ) {
    return await this.operationLogsRepository.saveOperationLogs(operationLogsDto);
  }

  public async getAll(filters: LogFiltersDto): Promise<Log[]> {
    return await this.operationLogsRepository.getAllWithFilters(filters);
  }

  async findById(id: number): Promise<Log> {
    const log = await this.operationLogsRepository.findOne({ where: { id } });
    
    if (!log) {
      throw new NotFoundException(`Nenhum Log Foi Encontrado Com O Id ${id}!`);
    }

    return log;
  }
}


