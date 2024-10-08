import { Module } from '@nestjs/common';
import { ExpensesController } from 'src/app/controllers/expenses/expenses.controller';
import { ExpensesService } from 'src/app/services/expenses/expenses.service';

@Module({
   controllers: [ExpensesController],
   providers: [ExpensesService]
})
export class ExpensesModule {}
