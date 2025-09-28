import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';

class ResponseDto<T> {
  payload: T;
  timestamp: number;
}
@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<T> {
  /**
   * Intercept the request and add the timestamp
   * @param context {ExecutionContext}
   * @param next {CallHandler}
   * @returns { payload:Response<T>, timestamp: string }
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    // const timestamp = new Date().getTime();
    return next.handle();

    // return next.handle().pipe(
    //   map((payload) => {
    //     return { payload, timestamp };
    //   }),
    // );
  }
}
