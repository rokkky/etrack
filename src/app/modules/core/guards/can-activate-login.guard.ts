import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { AuthorizationService } from '../../authorization/services/authorization.service';
import { inject } from '@angular/core';

export const canActivateLoginGuard = (next: ActivatedRouteSnapshot) => {
  return inject(AuthorizationService).isAuthenticated()
    ? createUrlTreeFromSnapshot(next, ['/', 'home'])
    : true;
};
