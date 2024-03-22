import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    //console.log('AuthGuardService - Checking authentication status');
    if (this.authService.isLoggedIn()) { 
      //console.log('AuthGuardService - User is logged in');
      return true;
    } else {
      //console.log('AuthGuardService - User is not logged in');
      return this.router.createUrlTree(['/login']);
    }
  }
  
  
  
}
