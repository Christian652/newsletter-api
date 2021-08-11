import { Test, TestingModule } from '@nestjs/testing';
import { OperationLogsService } from './operationLogs.service';
import { OperationLogsRepository } from './operationLogs.repository';
import { NotFoundException } from '@nestjs/common';
import { OperationLogsDTO } from './dto/operationLogs.dto';
import { OperationTypes } from './operation-types.enum';
import { ObjectTypes } from './object-types.enum';

describe('OperationLogsService', () => {
  let operationLogsService;
  let operationLogsRepository;

  const mockOperationLogsRepository = () => ({
    saveOperationLogs: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperationLogsService,
        {
          provide: OperationLogsRepository,
          useFactory: mockOperationLogsRepository,
        },
      ],
    }).compile();
    operationLogsService = await module.get<OperationLogsService>(OperationLogsService);
    operationLogsRepository = await module.get<OperationLogsRepository>(OperationLogsRepository);
  });

  describe('createOperationLogs', () => {
    it('should save a operationLogs in the database', async () => {
      operationLogsRepository.saveOperationLogs.mockResolvedValue('someOperationLogs');
      expect(operationLogsRepository.saveOperationLogs).not.toHaveBeenCalled();

      const createOperationLogsDto: OperationLogsDTO = {
        id: null,
        operation_type: OperationTypes.CREATE,
        object_type: ObjectTypes.User,
        data: {
          userId: 1,
          extra: {
            createdUserId: 2,
            createdUserName: 'sample username',
          },
        },
      };

      const result = await operationLogsService.save(createOperationLogsDto);

      expect(operationLogsRepository.saveOperationLogs).toHaveBeenCalledWith(
        createOperationLogsDto,
      );
      expect(result).toEqual('someOperationLogs');
    });
  });

  describe('getOperationLogs', () => {
    it('should get all operationLogs', async () => {
      operationLogsRepository.find.mockResolvedValue('someOperationLogs');
      expect(operationLogsRepository.find).not.toHaveBeenCalled();

      const result = await operationLogsService.getOperationLogs();

      expect(operationLogsRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someOperationLogs');
    });

    it('should retrieve a operationLogs with an ID', async () => {
      const mockOperationLogs = {
        id: 1,
        operation_type: OperationTypes.CREATE,
        object_type: ObjectTypes.User,
        data: {
          userId: 1,
          extra: {
            createdUserId: 2,
            createdUserName: 'sample username',
          },
        },
      };

      operationLogsRepository.findOne.mockResolvedValue(mockOperationLogs);
      
      const result = await operationLogsService.findById(1);
      
      expect(result).toEqual(mockOperationLogs);
      expect(operationLogsRepository.findOne).toHaveBeenCalledWith({where: {id: 1}});
    });

    it('throws an error as a operationLogs is not found', () => {
      operationLogsRepository.findOne.mockResolvedValue(null);
      
      expect(operationLogsService.getOperationLogs(1)).rejects.toThrow(NotFoundException);
    });
  });
});