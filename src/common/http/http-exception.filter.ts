import { ErrorDto } from '@common/global-dto';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { ErrorType } from '@common/enums';
import { Response } from 'express';
import { HttpType } from './http-error-type';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? +exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorType: ErrorType = HttpType[status] ?? ErrorType.InternalServer;

    const errorResponse: ErrorDto = {
      status,
      success: false,
      errorType: errorType,
      message: exception.response.message,
    };
    Logger.error(errorResponse);

    // httpAdapter.reply(response, errorResponse, status);
    response.status(status).send(errorResponse);
  }
}
