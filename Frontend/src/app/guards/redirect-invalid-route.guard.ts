import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const redirectInvalidRouteGuard: CanActivateFn = async (
  route,
  state
) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  if (await jwtService.isAuthenticated()) {
    await router.navigate(['/tabs/home']);
  } else {
    await router.navigate(['/login']);
  }

  return false;
};
