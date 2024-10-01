import { ApiProperty } from "@nestjs/swagger"

export class LoginDTO {
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   password: string
}

export class LoginResponseDTO {
   @ApiProperty()
   id: number;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   token: string
}
