import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);

  // Convertimos la Promise del token en Observable con `from()`
  return from(jwtService.getToken()).pipe(
    switchMap((token) => {
      const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;
      return next(authReq);
    })
  );
};
