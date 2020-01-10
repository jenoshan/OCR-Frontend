import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: UserService,
        private router: Router){}
    
    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, 
    state: import("@angular/router").RouterStateSnapshot
    ): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        const isAuth = this.authService.isUserAuth();
        if(!isAuth){
            this.router.navigate(['/login-page']);
        }
        return isAuth;
    }

}