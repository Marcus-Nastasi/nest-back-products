import { Module } from '@nestjs/common';
import { ProdRegisterController } from 'src/controllers/prod_register/prod_register.controller';

@Module({
   controllers: [ProdRegisterController]
})
export class ProdRegisterModule {}
