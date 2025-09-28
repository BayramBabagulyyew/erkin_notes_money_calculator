import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DefaultPagination } from '../interfaces';

/**
 * Decorator intended for building a PaginationRequest object based on the query string parameters
 */
export const PaginationParams = createParamDecorator(
  (
    data: DefaultPagination = {
      defaultSkip: 0,
      defaultPage: 0,
      defaultLimit: 20,
      defaultOrder: '',
      defaultOrderDirection: 'DESC',
      maxAllowedSize: 100,
    },
    ctx: ExecutionContext,
  ) => {
    let {
      query: { skip, page, limit },
    } = ctx.switchToHttp().getRequest();
    const {
      query: { orderBy, orderDirection, ...params },
    } = ctx.switchToHttp().getRequest();

    const {
      defaultSkip,
      defaultPage,
      defaultLimit,
      defaultOrderDirection,
      maxAllowedSize,
    } = data;

    const orderby = orderBy ? orderBy : 'id';
    const orderdirection = orderDirection
      ? orderDirection
      : defaultOrderDirection;

    limit = limit && limit > 0 ? +limit : +defaultLimit;
    if (!skip) {
      if (page) {
        skip = (+page - 1) * +limit;
        skip = +skip >= 0 ? +skip : 0;
      } else {
        page = +defaultPage;
        skip = +defaultSkip;
      }
    } else {
      page = Math.floor(+skip / +limit);
    }
    limit = +limit < +maxAllowedSize ? +limit : +maxAllowedSize;
    return Object.assign(data ? data : {}, {
      skip,
      page: +page,
      limit,
      orderBy: orderby,
      orderDirection: orderdirection,
      params,
    });
  },
);
