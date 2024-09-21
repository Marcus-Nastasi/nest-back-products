export interface ISales {
   id: number,
   userId: number
   productId: number,
   quantity: number,
   date: Date
}

export interface SalesRegisterDTO {
   userId: number
   productId: number,
   quantity: number
}
