import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-user-id',
  templateUrl: './forgot-user-id.component.html',
  styleUrls: ['./forgot-user-id.component.less']
})
export class ForgotUserIDComponent implements OnInit {

    constructor() { }
    email: string;
  ngOnInit() {
  }

}
