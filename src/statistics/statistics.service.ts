import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);
  
  constructor(
    @InjectRepository(UserRepository)
    readonly userRepository: UserRepository,
  ) {}

  public async getCounts() {
    const users = await this.userRepository.findAll();

    return {
      users: users.length,
    }
  }

  public async getAll() {
    const users = await this.userRepository.findAll();

    return {
      users,
    }
  }

  public async getAnualCount() {

    // const collectionPlaceJul = await this.collectionPlaceRepository.getByMonth(6);

    // return collectionPlaceJul;
  }

  public async getMonthCount(month: number) {
    // const collectionPlace = await this.collectionPlaceRepository.getByMonth(month--);
    
    return {
      // collectionPlace: collectionPlace.length,
    }

  }

}