import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  isLoggedIn: boolean;
  userRole: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.getIsLogged$().subscribe((data: boolean) => this.isLoggedIn = data);
    this.userRole = this.authService.getUserRole();
    if (!(this.isLoggedIn && this.userRole === 'ROLE_ADMIN')) {
      this.router.navigateByUrl('/login');
    }
    return true;
  }

}
