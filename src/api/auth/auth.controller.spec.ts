import { Test } from '@nestjs/testing';
import { AuthService } from '../../services/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    authService = {
      registerUser: jest.fn().mockReturnValue(Promise.resolve({})),
    };

    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get(AuthController);
  });

  it('should be created', () => {
    expect(controller).toBeDefined();
  });
});
