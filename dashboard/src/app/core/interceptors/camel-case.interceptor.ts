/* eslint-disable @unicorn/filename-case */
import { type HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { camelize } from '../../core/utils/case';

// O Lucid serializa em snake_case por padrão; aqui trabalhamos sempre em camelCase.
export const camelCaseInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    map((event) =>
      event instanceof HttpResponse && event.body
        ? event.clone({ body: camelize(event.body) })
        : event,
    ),
  );
