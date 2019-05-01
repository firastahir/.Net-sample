import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-user-id-success',
  templateUrl: './forgot-user-id-success.component.html',
  styleUrls: ['./forgot-user-id-success.component.less']
})
export class ForgotUserIdSuccessComponent implements OnInit {

    constructor(private _route: ActivatedRoute) { }
    email: string;
    ngOnInit() {
        this.email = this._route.snapshot.queryParams['email'] || '/';
  }

}
