import { ApiProperty } from "@nestjs/swagger"

export class LoginRequestDto {
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   password: string
}

export class LoginResponseDto {
   @ApiProperty()
   id: number;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   token: string
}
