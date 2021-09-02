import { Injectable } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public userService:UserService , private router : Router){}

  canActivate():boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/login'])
      return false
    }
}
}
