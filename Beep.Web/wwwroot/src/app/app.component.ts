import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from './utility/confirm-dialog/confirm-dialog.component';
import { Idle } from 'idlejs/dist';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent   {

    //isLoggedin: boolean;

    //constructor(private _dialog: MatDialog, private _userSvc: UserService, private _router: Router, private _route: ActivatedRoute) { }

    //idle = new Idle()
    //    .whenNotInteractive()
    //    .within(4, 1000).start();

    //ngOnInit() {
    //    this._userSvc.isLoggedIn().subscribe(a => this.isLoggedin = a);
    //    if (location.href.indexOf('login') < 0 && this.isLoggedin) {
    //        this.idle.do(() => {
    //            this.openModal()
    //            this.idle.stop();
    //        })
    //    }
    //}
    //openModal() {

    //    const dialogConfig = new MatDialogConfig();
    //    dialogConfig.disableClose = true;
    //    dialogConfig.autoFocus = true;
    //    dialogConfig.data = {
    //        message: 'Are you still there? Your session will expire in ' ,
    //        displayDuration:true
    //    };
    //    const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);
        
    //    dialogRef.afterClosed().subscribe(result => {
    //        if (result) {
    //            this.idle.start();
    //        }
    //        else {
    //            this._userSvc.logout();
    //            this._router.navigate['/login'];
    //        }
    //    });

    //    setTimeout(() => {
    //        dialogRef.close();
    //        this._userSvc.logout().subscribe(() => {
    //            this._router.navigate(['/login'])
    //        })
    //    }, 120000);
    //}

}
