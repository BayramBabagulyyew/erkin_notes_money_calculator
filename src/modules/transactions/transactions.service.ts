import { Pagination, PaginationRequest } from '@common/libs/pagination';
import { TransactionsModel } from '@db/models';
import { JwtPayload } from '@modules/auth/dtos';
import { CurrenciesService } from '@modules/currencies/currencies.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Op, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { QueryTransactionDto } from './dto/query-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    @Inject('TRANSACTIONS')
    private readonly transactions: typeof TransactionsModel,
    @Inject(forwardRef(() => CurrenciesService))
    private readonly currenciesService: CurrenciesService,
  ) { }
  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = await this.sequelize.transaction();
    try {
      //first add the Transaction here
      const data = await this.transactions.create(createTransactionDto as TransactionsModel, { transaction });

      //and then change the total amount in user currencies
      await this.currenciesService.changeTotalAmount(
        createTransactionDto.userCurrencyId,
        createTransactionDto.amount,
        createTransactionDto.type,
        transaction
      );

      //sucessfully commit the transaction
      await transaction.commit();
      return data;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }


  }

  async findAll(pagination: PaginationRequest<QueryTransactionDto>, query: QueryTransactionDto, user: JwtPayload) {

    const where: WhereOptions<TransactionsModel> = {}

    if (query.userCurrencyId) {
      where.userCurrencyId = query.userCurrencyId;
    }

    if (query.createEndDate) {
      where.createdAt = {
        [Op.lte]: query.createEndDate
      };
    }

    if (query.createStartDate) {
      if (query.createEndDate) {
        where.createdAt = {
          [Op.between]: [query.createStartDate, query.createEndDate]
        };
      } else {
        where.createdAt = {
          [Op.gte]: query.createStartDate
        };
      }
    }

    if (query.expirationEndDate) {
      where.expirationDate = {
        [Op.lte]: query.expirationEndDate
      };
    }

    if (query.expirationStartDate) {
      if (query.expirationEndDate) {
        where.expirationDate = {
          [Op.between]: [query.expirationStartDate, query.expirationEndDate]
        };
      } else {
        where.expirationDate = {
          [Op.gte]: query.expirationStartDate
        };
      }
    }

    if (query.search) {
      where[Op.or] = [
        { description: { [Op.iLike]: `%${query.search}%` } },
        { amount: { [Op.iLike]: `%${query.search}%` } },
      ];
    }

    if (query.type) {
      where.type = query.type
    }

    if (query.finished) {
      where.finished = query.finished
    }

    const total = await this.transactions.count({ where });
    const data = await this.transactions.findAll({
      where,
      limit: pagination.limit,
      offset: pagination.skip,
      order: [[pagination.orderBy, pagination.orderDirection]]
    });

    return Pagination.of(pagination, total, data)
  }


  async findOne(id: number) {
    return await this.transactions.findOne({ where: { id } });
  }

  async update(id: number, updateTransactionDto: CreateTransactionDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const data = await this.transactions.findOne({ where: { id } });

      //first add the Transaction here
      if (!data) {
        throw new Error('Hat tapylmady');
      }

      const oldAmount = +data.dataValues.amount;
      const oldType = data.dataValues.type;

      await data.update(updateTransactionDto as TransactionsModel, { transaction });

      //and then change the total amount in user currencies
      await this.currenciesService.changeTotalAmount(
        updateTransactionDto.userCurrencyId,
        updateTransactionDto.amount,
        updateTransactionDto.type,
        transaction,
        +oldAmount,
        oldType,
      );

      //sucessfully commit the transaction
      await transaction.commit();
      return data;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  }

  async completed(id: number) {
    const transaction = await this.sequelize.transaction();
    try {
      const data = await this.transactions.findOne({ where: { id } });

      //first add the Transaction here
      if (!data) {
        throw new Error('Hat tapylmady');
      }

      await data.update({ finished: !data.finished }, { transaction });

      //sucessfully commit the transaction
      await transaction.commit();
      return data;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  }

  async remove(id: number) {
    return await this.transactions.destroy({ where: { id } });

  }
}
