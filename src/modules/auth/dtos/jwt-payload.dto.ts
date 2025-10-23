
import type { UUID } from 'crypto';

export interface JwtPayload {
  id: UUID;
  email: string;
}
