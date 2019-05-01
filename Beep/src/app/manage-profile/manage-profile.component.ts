import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.less']
})
export class ManageProfileComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  editProfile(setting: string) {
    this._router.navigateByUrl(setting);
  }
}
