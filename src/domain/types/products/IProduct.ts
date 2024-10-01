export interface IProdutc {
   id: number,
   name: string,
   description: string,
   price: number,
   quantity: number
}

export interface ProductRegisterDTO {
   name: string,
   description: string,
   price: number,
   quantity: number
}
