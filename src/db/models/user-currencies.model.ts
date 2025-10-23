import { type UUID } from 'crypto';
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { CurrenciesModel } from './currency.model';
import { TransactionsModel } from './transactions.model';
import { UserModel } from './user.model';

@Table({ tableName: 'user_currencies' })
export class UserCurrenciesModel extends Model<UserCurrenciesModel> {

    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare id: number;

    @BelongsTo(() => CurrenciesModel)
    currency: CurrenciesModel;

    @ForeignKey(() => CurrenciesModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    currencyId: number;

    @BelongsTo(() => UserModel)
    user: UserModel;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.UUID, allowNull: false })
    userId: UUID;

    @HasMany(() => TransactionsModel)
    transactions: TransactionsModel[];

    @Column({ type: DataType.DECIMAL(14, 2), allowNull: false, defaultValue: 0 })
    totalAmount: number;

}
