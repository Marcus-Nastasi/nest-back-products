import { Controller, Get, Render } from '@nestjs/common';

@Controller('register')
export class UserRegisterController {

   @Get()
   @Render('pages/user_register')
   public render() {
      return
   }
}

