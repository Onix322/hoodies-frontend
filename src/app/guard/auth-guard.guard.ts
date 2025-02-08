import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {BehaviorSubject, first, firstValueFrom, map, tap} from 'rxjs';


export const authGuard: CanActivateFn = () => {

  let authService = inject(AuthService)
  let router = inject(Router)

  return authService.isAuth().pipe(
    first(),
    tap(status => {
      if (!status) {
        router.navigate(['/login'], { skipLocationChange: true, replaceUrl: false });
      }
    }),
    map(status => status) // Asigură returnarea corectă a unui `boolean`
  );
};
