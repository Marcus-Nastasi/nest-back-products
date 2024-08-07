import { Test, TestingModule } from '@nestjs/testing';
import { UserRegisterController } from './user_register.controller';

describe('UserRegisterController', () => {
  let controller: UserRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRegisterController],
    }).compile();

    controller = module.get<UserRegisterController>(UserRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
