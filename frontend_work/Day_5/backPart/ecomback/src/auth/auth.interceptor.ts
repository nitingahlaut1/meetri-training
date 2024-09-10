// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { map, Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements NestInterceptor {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler<any>,
//   ): Observable<any> {
//     // const ctx = context.switchToHttp();
//     // const request = ctx.getRequest<Request>();
//     console.log('Interceptor chl reya hai');
//     return next.handle().pipe(map((data) => console.log(data)));
//   }
// }

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    console.log('Interceptor is running');

    return next.handle().pipe(
      tap((data) => {
        // console.log('Response data:', data); // Log the response data
      }),
    );
  }
}
