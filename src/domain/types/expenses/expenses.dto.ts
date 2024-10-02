import { ApiProperty } from "@nestjs/swagger";

export class IExpense {
   @ApiProperty()
   id: number;
   @ApiProperty()
   value: number;
   @ApiProperty()
   description: string;
}

export class ExpenseRequestDto {
   @ApiProperty()
   value: number;
   @ApiProperty()
   description: string;
}

export class ExpenseResponseDto {
   @ApiProperty()
   id: number;
   @ApiProperty()
   value: number;
   @ApiProperty()
   description: string;
}
