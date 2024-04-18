import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PharGuard implements CanActivate {
  constructor(private routes: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role: string | null = sessionStorage.getItem('userRole');
    if (role && role === 'phar') {
      return true;
    } else {
      this.routes.navigate(['/Index']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class WardGuard implements CanActivate {
  constructor(private routes: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role: string | null = sessionStorage.getItem('userRole');
    if (role && role === 'ward') {
      return true;
    } else {
      this.routes.navigate(['/Index']);
      return false;
    }
  }
}
