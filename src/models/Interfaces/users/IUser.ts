import { ApiProperty } from "@nestjs/swagger";

export class IUser {
   @ApiProperty()
   id?: number;
   @ApiProperty()
   name: string;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   password?: string   
}

export class UpdateDTO {
   @ApiProperty()
   name: string;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   current_password: string;
   @ApiProperty()
   new_password: string
}

export class UserRegisterDTO {
   @ApiProperty()
   name: string;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   password: string
}
