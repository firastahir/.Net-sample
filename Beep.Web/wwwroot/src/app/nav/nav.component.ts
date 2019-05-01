import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
    isLoggedIn: boolean;
    navWidth: string = '0';

    constructor(private _userSvc: UserService, private _router: Router) { }

    ngOnInit() {
        this._userSvc.isLoggedIn().subscribe(status => {
            this.isLoggedIn = status
        });
    }
    logout() {
        this._userSvc.logout().subscribe(
            () => {
                this._router.navigate(['login'])
            }
        )
    }
    openNav() {
        this.navWidth = '70%';
    }
    closeNav() {
        this.navWidth = '0';
    }
}
