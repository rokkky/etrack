import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { AuthorizationService } from '../../authorization/services/authorization.service';
import { inject } from '@angular/core';

export const canActivateAuthGuard = (next: ActivatedRouteSnapshot) => {
  return inject(AuthorizationService).isAuthenticated()
    ? true
    : createUrlTreeFromSnapshot(next, ['/', 'login']);
};
