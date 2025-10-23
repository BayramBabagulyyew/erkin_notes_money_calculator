import { BelongsTo, Column, DataType, ForeignKey, Index, Model, Table } from 'sequelize-typescript';
import { UserCurrenciesModel } from './user-currencies.model';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
};

@Table({ tableName: 'transactions' })
export class TransactionsModel extends Model<TransactionsModel> {

  @Column({ type: DataType.DECIMAL(14, 2), allowNull: true })
  amount: number;

  @Index
  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.DATE, allowNull: true })
  expirationDate: Date;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  finished: boolean;

  @Column({
    type: DataType.ENUM(...Object.values(TransactionType)),
    allowNull: false,
    defaultValue: TransactionType.INCOME,
  })
  type: TransactionType;

  @BelongsTo(() => UserCurrenciesModel)
  userCurrency: UserCurrenciesModel;

  @ForeignKey(() => UserCurrenciesModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userCurrencyId: number;


}
