import { PaginationDto } from '@common/global-dto';
import { Pagination, PaginationRequest } from '@common/libs/pagination';
import { CurrenciesModel, UserCurrenciesModel, UserModel } from '@db/models';
import { TransactionType } from '@db/models/transactions.model';
import { JwtPayload } from '@modules/auth/dtos';
import { TransactionsService } from '@modules/transactions/transactions.service';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op, Sequelize, Transaction, WhereOptions } from 'sequelize';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Injectable()
export class CurrenciesService {

  constructor(
    @Inject('CURRENCIES')
    private readonly currencies: typeof CurrenciesModel,
    @Inject('USER_CURRENCIES')
    private readonly userCurrencies: typeof UserCurrenciesModel,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    @Inject(forwardRef(() => TransactionsService))
    private readonly transactionService: TransactionsService,
  ) { }

  async create(createCurrencyDto: CreateCurrencyDto, user: JwtPayload) {
    console.log('User creating currency:', user);
    const transaction = await this.sequelize.transaction();
    try {
      const currency = await this.currencies.create(createCurrencyDto as CurrenciesModel, { transaction });
      await this.userCurrencies.create({
        currencyId: currency.id,
        userId: user.id,
        totalAmount: 0,
      } as UserCurrenciesModel, { transaction });
      await transaction.commit();
      return currency;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findAll(pagination: PaginationRequest<PaginationDto>, query: PaginationDto) {

    const where: WhereOptions<CurrenciesModel> = {};

    if (query.search) {
      where.name = {
        [Op.iLike]: `%${query.search}%`
      };
    }

    const total = await this.currencies.count({ where });
    const data = await this.currencies.findAll({
      where,
      include: [{ model: UserModel, attributes: ['id'] }],
      limit: pagination.limit,
      offset: pagination.skip,
      order: [[pagination.orderBy, pagination.orderDirection]]
    });

    return Pagination.of(pagination, total, data);
  }

  async findOne(id: number) {
    const data = await this.currencies.findOne({ where: { id }, include: [{ model: UserModel, attributes: ['id'] }] });
    if (!data) {
      throw new NotFoundException('Pul birligi tapylmady');
    }
    return data;
  }

  async update(id: number, updateCurrencyDto: CreateCurrencyDto) {
    const data = await this.currencies.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException('Pul birligi tapylmady');
    }
    await data.update(updateCurrencyDto as CurrenciesModel, { where: { id } });
    return data;
  }

  async remove(id: number) {
    const data = await this.currencies.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException('Pul birligi tapylmady');
    }
    await data.destroy();
    return;
  }

  async changeTotalAmount(id: number, amount: number, type: TransactionType, transaction: Transaction, oldAmount?: number, oldType?: TransactionType) {
    try {
      const data = await this.userCurrencies.findByPk(id);
      if (!data) {
        throw new NotFoundException('Pul birligi tapylmady');
      }

      const alreadyCounted = +data.dataValues.totalAmount || 0;
      let newAmount: number = +alreadyCounted;

      if (oldAmount) {
        if (oldType === TransactionType.INCOME) {
          newAmount = +newAmount - +oldAmount;
        } else {
          newAmount = +newAmount + +oldAmount;
        }
      }
      newAmount = type === TransactionType.INCOME ? +newAmount + +amount : +newAmount - +amount;

      await data.update({
        totalAmount: newAmount
      }, { transaction });

    } catch (error) {
      throw error;
    }
  }

}