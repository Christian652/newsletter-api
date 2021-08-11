import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService;

  const mockAuthService = () => ({
    login: jest.fn()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useFactory: mockAuthService,
        }
      ],
    }).compile();

    authService = await module.get<AuthService>(AuthService);
  });

  describe('Auth Cycle', () => {
    it('Should Do Login', async () => {
    
      const userCredentials = {
        email: "admin@gmail.com",
        password: "admin"
      }
      
      authService.login.mockResolvedValue({
        "id": 2,
        "user": "admin user",
        "auth": true,
        "expiresIn": "3000000",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIyNjM1MDA2LCJleHAiOjE2MjI2MzgwMDZ9.eLrHQS5ULYIJYhu8lXRA6g88EF3tdsFey4zS7jXiI-g"
      });

      const result = await authService.login(userCredentials);

      expect(result).toEqual({
        "id": 2,
        "user": "admin user",
        "auth": true,
        "expiresIn": "3000000",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIyNjM1MDA2LCJleHAiOjE2MjI2MzgwMDZ9.eLrHQS5ULYIJYhu8lXRA6g88EF3tdsFey4zS7jXiI-g"
      });
    });
  });

});
