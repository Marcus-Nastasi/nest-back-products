import { ApiProperty } from "@nestjs/swagger"

export default class UpdateDTO {
   @ApiProperty()
   name: string;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   current_password: string;
   @ApiProperty()
   new_password: string
}

