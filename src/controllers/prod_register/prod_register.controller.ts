import { Controller, Get, Render } from '@nestjs/common';

@Controller('product/register')
export class ProdRegisterController {

   @Get()
   @Render('pages/prod_register')
   public render() {
      return
   }
}

