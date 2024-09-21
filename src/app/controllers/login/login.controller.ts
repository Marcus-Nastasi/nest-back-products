import { Controller, Get, Render } from '@nestjs/common';

@Controller('login')
export class LoginController {

   @Get()
   @Render('pages/login')
   public render() {
      return
   }
}

