import { type HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

// Trata só erros globais. Erros 4xx (validação etc.) ficam com cada tela.
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const isAuthCall = req.url.includes('/auth/');
      if (err.status === 401 && !isAuthCall) {
        toast.error('Sua sessão expirou. Entre novamente.');
        auth.clearSession();
      } else if (err.status === 0) {
        toast.error('Não foi possível conectar ao servidor.');
      } else if (err.status >= 500) {
        toast.error('Erro no servidor. Tente novamente em instantes.');
      }
      return throwError(() => err);
    }),
  );
};
