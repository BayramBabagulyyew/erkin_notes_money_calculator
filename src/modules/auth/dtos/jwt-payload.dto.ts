import { UUID } from 'crypto';
import { UserType } from '@common/enums';

export interface JwtPayload {
  id: UUID;
  email: string;
  type: UserType;
  isSuper: boolean;
}
