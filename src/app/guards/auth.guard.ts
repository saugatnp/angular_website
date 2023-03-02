import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../content/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanActivate {
  constructor( private authService: AuthService, private router: Router){

  }

 
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (this.authService.checkTokenValidity()) {
      // authorised so return true
      return true;
  } else{
    alert("You do not have access to this page, redirecting to login");
       this.router.navigate(['Admin/Login'],{ queryParams: { returnUrl: state.url }})
  

  // not logged in so redirect to login page with the return url
  return false;
}
} 
}



