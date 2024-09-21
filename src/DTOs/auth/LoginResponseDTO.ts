import { ApiProperty } from "@nestjs/swagger";

export default class LoginResponseDTO {
   @ApiProperty()
   id: number;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   token: string
}
