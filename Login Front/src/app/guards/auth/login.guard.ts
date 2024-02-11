import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../../services/auth/token/token.service';
import { first } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const loginGuard: CanActivateFn = async () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  return new Promise<boolean>((resolve) => {
      tokenService.validateRouteLogin().subscribe((value: any) => {
        resolve(value.data);
        router.navigate(['/private']);
      }, (error: HttpErrorResponse) => {
        console.error(error.error.message);
        resolve(true);
      });
  });
};
