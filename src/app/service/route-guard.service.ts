import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router,private route:ActivatedRoute, private authenticationService: AuthenticationService) { }
  urlUser:any
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.urlUser=route.params['userName']
    let user=localStorage.getItem('authenticatedUser')    
    if (this.authenticationService.isUserLoggedIn()&&(user===this.urlUser)) {
      return true
    }
    else {
      this.router.navigate(['login'])
      return false
    }
  }
}
