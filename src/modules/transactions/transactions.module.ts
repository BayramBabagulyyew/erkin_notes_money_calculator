import { TransactionsModel } from '@db/models';
import { DatabaseModule } from '@db/sequelize-conf';
import { CurrenciesModule } from '@modules/currencies/currencies.module';
import { forwardRef, Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => CurrenciesModule)],
  controllers: [TransactionsController],
  providers: [TransactionsService, { provide: 'TRANSACTIONS', useValue: TransactionsModel }],
  exports: [TransactionsService]
})
export class TransactionsModule { }
