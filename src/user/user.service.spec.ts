import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let userService;
  let userRepository;

  const mockUserRepository = () => ({
    saveUser: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();
    userService = await module.get<UserService>(UserService);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('createUser', () => {
    it('should save a user in the database', async () => {
      userRepository.saveUser.mockResolvedValue('someUser');
      expect(userRepository.saveUser).not.toHaveBeenCalled();
      
      const createUserDto = {
        name: "User Name",
        email: "email@mailer.com",
        password: "aaaaaa",
        role: "Administrador"
      };
      
      const result = await userService.save(createUserDto);
     
      expect(userRepository.saveUser).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual('someUser');
    });
  });

  describe('getUsers', () => {
    it('should get all users', async () => {
      userRepository.find.mockResolvedValue('someUsers');
      expect(userRepository.find).not.toHaveBeenCalled();
      const result = await userService.getAll();
      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someUsers');
    });
  });

  describe('getUser', () => {
    it('should retrieve a user with an ID', async () => {
      const mockUser = {
        id: 1,
        name: "User Name",
        email: "email@mailer.com",
        password: "aaaaaa",
        role: "Administrador"
      };

      userRepository.findOne.mockResolvedValue(mockUser);
      
      const result = await userService.getOne(1);
      
      expect(result).toEqual(mockUser);
      expect(userRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('throws an error as a user is not found', () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(userService.getOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      userRepository.delete.mockResolvedValue(1);
      expect(userRepository.delete).not.toHaveBeenCalled();
      await userService.delete(1);
      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});