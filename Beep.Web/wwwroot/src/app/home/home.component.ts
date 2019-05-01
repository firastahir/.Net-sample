import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
declare var $: any;
import { CommonService } from '../services/common.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

    isLoggedin: boolean;
    bannerUrls: string[];
    constructor(private _router: Router, private _userSvc: UserService, private _cmnSvc: CommonService) { }

    ngOnInit() {

        this._userSvc.isLoggedIn().subscribe(status => this.isLoggedin = status);
        this._cmnSvc.getBannerImages().subscribe(
            (resp) => {
            this.bannerUrls = resp;

                $(document).ready(function () {
                    $('.carousel').carousel();

                })
            }
        )
    }

    logout() {
        this._userSvc.logout().subscribe(() => { });
    }
}
