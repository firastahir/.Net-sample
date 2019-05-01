import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
    selector: 'greeting',
    templateUrl: './greeting.component.html',
    styleUrls: ['./greeting.component.less']
})
export class GreetingComponent implements OnInit {
    isLoggedin: boolean;
    userName: string;
    constructor(private _userSvc: UserService) { }

    ngOnInit() {
        this._userSvc.isLoggedIn().subscribe(status => {
            this.isLoggedin = status;
            if (status) {
                let user = JSON.parse(sessionStorage.getItem('beep_user'));
                this.userName = user ? user.name : null
            }
        });
    }

}
