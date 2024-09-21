import { ApiProperty } from "@nestjs/swagger";

export default class UserRegisterDTO {
   @ApiProperty()
   name: string;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   password: string
}
