import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../../services/auth/token/token.service';
import { first } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const privateGuard: CanActivateFn = (route) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  return new Promise<boolean>((resolve) => {
      tokenService.validateRoute().subscribe((value: any) => {
        resolve(value.data);
      }, (error: HttpErrorResponse) => {
        console.error(error.error.message);
        router.navigate(['/login']);
        resolve(false);
      });
  });
};