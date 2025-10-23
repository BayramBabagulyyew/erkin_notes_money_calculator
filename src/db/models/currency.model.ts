import { BelongsToMany, Column, DataType, Index, Model, Table } from 'sequelize-typescript';
import { UserCurrenciesModel } from './user-currencies.model';
import { UserModel } from './user.model';

@Table({ tableName: 'currencies' })
export class CurrenciesModel extends Model<CurrenciesModel> {

  @Index
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @BelongsToMany(() => UserModel, () => UserCurrenciesModel)
  users: UserModel[];

}
