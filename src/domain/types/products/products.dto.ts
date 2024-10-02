import { ApiProperty } from "@nestjs/swagger";

export class IProdutc {
   @ApiProperty()
   id: number;
   @ApiProperty()
   name: string;
   @ApiProperty()
   description: string;
   @ApiProperty()
   price: number;
   @ApiProperty()
   quantity: number;
}

export class ProductRequestDto {
   @ApiProperty()
   name: string;
   @ApiProperty()
   description: string;
   @ApiProperty()
   price: number;
   @ApiProperty()
   quantity: number;
}

export class ProductSearchRequestDto {
   @ApiProperty()
   name: string;
}

export class ProdutcResponseDto {
   @ApiProperty()
   id: number;
   @ApiProperty()
   name: string;
   @ApiProperty()
   description: string;
   @ApiProperty()
   price: number;
   @ApiProperty()
   quantity: number;
}
