import { ApiProperty } from "@nestjs/swagger";

export default class IUser {
   @ApiProperty()
   id?: number;
   @ApiProperty()
   name: string;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   password?: string   
}
