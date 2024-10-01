import { ApiProperty } from "@nestjs/swagger";

export class IUser {
   @ApiProperty()
   id: number;
   @ApiProperty()
   name: string;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   password: string;
}

export class UserRequestDto {
   @ApiProperty()
   name: string;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   password: string;
}

export class UserUpdateDto {
   @ApiProperty()
   name: string;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   current_password: string;
   @ApiProperty()
   new_password: string;
}

export class UserResponseDto {
   @ApiProperty()
   id: number;
   @ApiProperty()
   name: string;
   @ApiProperty()
   cpf: string;
   @ApiProperty()
   password: string;
}
