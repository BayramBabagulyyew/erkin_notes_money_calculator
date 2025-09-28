import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { UserType } from '@common/enums';

export const SKIP_AUTH = 'skipAuth';
export const JUST_USER = UserType.USER;
export const SKIP_AUTH_REFRESH = 'skipAuthRefresh';
export const TOKEN_NAME = 'access-token';
export const AUTH_OPTIONS: SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'Bearer',
};
