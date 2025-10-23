
import { CurrenciesModel, TransactionsModel, UserCurrenciesModel, UserModel } from '@db/models';
import { Sequelize } from 'sequelize-typescript';
import { dataBaseConfig } from './db.config';
import { IDatabaseConfigAttributes } from './db.interface';

const config: IDatabaseConfigAttributes = dataBaseConfig.dev;
const databaseUri = `${config.dialect}://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
const timezone = 'Asia/Ashgabat';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (): Promise<Sequelize> => {
      const sequelize = new Sequelize(databaseUri, {
        logging: config.logging === 'true' ? true : false,
        timezone,
      });
      sequelize.addModels([
        CurrenciesModel,
        UserModel,
        UserCurrenciesModel,
        TransactionsModel,
      ]);
      // await sequelize.sync();
      await sequelize.sync({ alter: true });
      // await sequelize.sync({ force: true });

      return sequelize;
    },
  },
];
