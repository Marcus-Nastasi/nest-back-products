import { Test, TestingModule } from '@nestjs/testing';
import { ProdRegisterController } from './prod_register.controller';

describe('ProdRegisterController', () => {
  let controller: ProdRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdRegisterController],
    }).compile();

    controller = module.get<ProdRegisterController>(ProdRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
