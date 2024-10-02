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
}
