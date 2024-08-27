import { Injectable } from '@nestjs/common';
import { CreateExpenseDTO, IExpense } from 'src/Interfaces/expenses/Expense';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ExpensesService {
   constructor(
      private readonly prisma: PrismaService
   ) {}

   // async create(createExpenseDTO: CreateExpenseDTO): Promise<IExpense> {
   //    return await this.prisma
   // }
}
