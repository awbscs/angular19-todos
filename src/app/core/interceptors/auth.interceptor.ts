import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthToken } from '../../auth/store/auth.selectors';
import { first, switchMap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  
  return store.select(selectAuthToken).pipe(
    first(),
    switchMap(token => {
      if (token && !req.url.includes('/login')) {
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(clonedReq);
      }
      return next(req);
    })
  );
};

