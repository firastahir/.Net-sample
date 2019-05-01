import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Role } from '../models/role.model';


@Injectable()
export class AuthGuard implements CanActivate {
    allowedroles: string[];

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user = JSON.parse(sessionStorage.getItem('beep_user'));

        if (user) {
            if (route.data.roles) {
                this.allowedroles = route.data.roles//.map(a => a.toLowerCase());
                if (this.allowedroles.filter(a => a.toLowerCase().toString() == user.role.toLowerCase()).length)
                    return true;
                else {
                    this.router.navigate(['error/403']);
                    return false;
                }
            }
            return true;
        }
        this.router.navigate([''], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
