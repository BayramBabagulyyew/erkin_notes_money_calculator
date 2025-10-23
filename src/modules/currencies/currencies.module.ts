import { CurrenciesModel, UserCurrenciesModel } from '@db/models';
import { DatabaseModule } from '@db/sequelize-conf';
import { TransactionsModule } from '@modules/transactions/transactions.module';
import { forwardRef, Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => TransactionsModule)],
  controllers: [CurrenciesController],
  providers: [CurrenciesService, { provide: 'CURRENCIES', useValue: CurrenciesModel }, { provide: 'USER_CURRENCIES', useValue: UserCurrenciesModel }],
  exports: [CurrenciesService],

})
export class CurrenciesModule { }
