import { ApiProperty } from "@nestjs/swagger"

export default class LoginDTO {
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   password: string
}
