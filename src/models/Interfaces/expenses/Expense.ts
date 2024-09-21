export interface IExpense {
   id: number,
   value: number,
   description: string
}

export interface CreateExpenseDTO {
   value: number,
   description: string
}
