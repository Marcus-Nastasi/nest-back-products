import { Module } from '@nestjs/common';
import { ExpensesController } from 'src/controllers/expenses/expenses.controller';
import { ExpensesService } from 'src/service/expenses/expenses.service';

@Module({
   controllers: [ExpensesController],
   providers: [ExpensesService]
})
export class ExpensesModule {}
