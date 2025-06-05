import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

// Guardia para verificar si el usuario está autenticado (Sin roles)
// Protege rutas privadas
export const authGuard: CanActivateFn = async (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  // Verifica si el token ha expirado
  if (await jwtService.isTokenExpired()) {
    await jwtService.logout(); // Cierra sesión si expiró
    await router.navigate(['/login']); // Redirige al login
    return false;
  }

  // Si está autenticado, permite el acceso
  return (await jwtService.isAuthenticated())
    ? true
    : (await router.navigate(['/login']), false);
};
