import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password-success',
  templateUrl: './forgot-password-success.component.html',
  styleUrls: ['./forgot-password-success.component.less']
})
export class ForgotPasswordSuccessComponent implements OnInit {
    email: string;
    constructor(private _route: ActivatedRoute) { }

    ngOnInit() {
        this.email = this._route.snapshot.queryParams['email'] || '/';
  }

}
