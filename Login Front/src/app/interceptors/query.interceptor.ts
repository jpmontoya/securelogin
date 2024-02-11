import { HttpInterceptorFn } from '@angular/common/http';
import { filter, first, take, takeUntil, takeWhile, tap } from 'rxjs';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading/loading.service';

export const queryInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  loading.changeLoading = true;
  let condition = true;
  return next(req).pipe(
    tap({
      next: () => {
      },
      error: () => {
        loading.changeLoading = false;
        condition = false;
      },
      complete: () => {
        loading.changeLoading = false;
        condition = false;
      },
    }), takeWhile (() => condition)
  );
};
