import { I18nContext, I18nService } from 'nestjs-i18n';

import { HttpType } from './http-error-type';
import { HttpStatus } from './http-status';

export type Props<T> = {
  action: 'create' | 'update' | 'delete' | 'createOrUpdate' | 'success';
  data: T;
  i18n?: I18nContext | I18nService;
};

export const responseMessage = <T>({ action, data, i18n }: Props<T>) => {
  switch (action) {
    case 'create':
      return {
        status: HttpStatus.CREATED,
        title: HttpType[HttpStatus.CREATED],
        message: i18n ? i18n.t('main.created') : 'Successfully created!',
        data,
      };

    case 'update':
      return {
        status: HttpStatus.OK,
        title: HttpType[HttpStatus.OK],
        message: i18n ? i18n.t('main.updated') : 'Successfully updated!',
        data,
      };

    case 'delete':
      return {
        status: HttpStatus.OK,
        title: HttpType[HttpStatus.OK],
        message: i18n ? i18n.t('main.deleted') : 'Successfully deleted!',
        data,
      };

    case 'success':
      return {
        status: HttpStatus.OK,
        title: HttpType[HttpStatus.OK],
        message: i18n ? i18n.t('main.success') : 'Successfully!',
        data,
      };
  }
};
