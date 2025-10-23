import type { UUID } from 'crypto';
import {
  BelongsToMany,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { CurrenciesModel } from './currency.model';
import { UserCurrenciesModel } from './user-currencies.model';

@Table({ tableName: 'users' })
export class UserModel extends Model {
  @Index({ unique: true, name: 'unique_username_isDeleted' })
  static compositeUniqueIndex: [string, string] = ['email', 'isDeleted'];

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  declare id: UUID;
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Index
  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted: boolean;

  @BelongsToMany(() => CurrenciesModel, () => UserCurrenciesModel)
  users: CurrenciesModel[];

}
