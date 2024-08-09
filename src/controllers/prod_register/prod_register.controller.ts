import { Controller, Get, Render } from '@nestjs/common';

@Controller('product')
export class ProdRegisterController {

   @Get('register')
   @Render('pages/prod_register')
   public render_reg() {
      return
   }

   @Get('update/:id')
   @Render('pages/prod_update')
   public render_upd() {
      return
   }
}

