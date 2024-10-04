import { ApiProperty } from "@nestjs/swagger"
import { IProdutc } from "../products/products.dto";
import { IUser } from "../users/user.dto";

export class ISales {
   @ApiProperty()
   id: number;
   @ApiProperty()
   userId: number;
   @ApiProperty()
   productId: number;
   @ApiProperty()
   quantity: number;
   @ApiProperty()
   date: Date;
}

export class SalesRequestDto {
   @ApiProperty()
   userId: number;
   @ApiProperty()
   productId: number;
   @ApiProperty()
   quantity: number;
}

export class SalesResponseDto {
   @ApiProperty()
   id: number;
   @ApiProperty()
   userId: number;
   @ApiProperty()
   productId: number;
   @ApiProperty()
   quantity: number;
   @ApiProperty()
   date: Date;
   @ApiProperty()
   product: IProdutc;
   @ApiProperty()
   user: IUser;
}
