import { ApiProperty } from "@nestjs/swagger"

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

export class SalesRegisterDTO {
   @ApiProperty()
   userId: number;
   @ApiProperty()
   productId: number;
   @ApiProperty()
   quantity: number;
}
