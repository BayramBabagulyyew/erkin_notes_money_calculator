import { SKIP_AUTH, SKIP_AUTH_REFRESH } from '@common/constants';
import { SetMetadata } from '@nestjs/common';

export const SkipAuth = () => SetMetadata(SKIP_AUTH, true);
export const SkipAuthRefresh = () => SetMetadata(SKIP_AUTH_REFRESH, true);
