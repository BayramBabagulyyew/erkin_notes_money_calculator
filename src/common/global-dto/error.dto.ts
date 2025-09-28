import { ErrorType } from '@common/enums';

export class ErrorDto {
  status?: number;
  success: boolean;
  message?: string | string[] | null;
  errorType?: ErrorType;
}
