import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  constructor() { }

  get isLogin() {
    return sessionStorage.getItem('loggedIn');
  }

  ngOnInit() {
  }

}
