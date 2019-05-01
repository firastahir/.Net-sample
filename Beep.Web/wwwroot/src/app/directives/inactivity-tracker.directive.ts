import { Directive } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from '../utility/confirm-dialog/confirm-dialog.component';
import { Idle } from 'idlejs/dist';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AjaxInterceptorService } from '../services/ajax-interceptor.service';


@Directive({
    selector: '[inactivityTracker]'
})
export class InactivityTrackerDirective {

    isLoggedin: boolean;

    constructor(private _dialog: MatDialog, private _userSvc: UserService, private _router: Router, private _ajaxInterceptorSvc: AjaxInterceptorService) {
        this._userSvc.isLoggedIn().subscribe(a => this.isLoggedin = a);
            const idle = new Idle()
                .whenNotInteractive()
                .within(1).start().do(() => {
                    if (this.isLoggedin) {
                        this.openModal()
                        idle.stop();
                    }
                })
    }

    openModal() {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            message: 'Are you still there? Your will be automatically logged out in ',
            displayDuration: true,
            yesButtonText: 'Stay Logged in',
            noButtonText: 'Logout',
            yesButtonClass: 'btn-primary',
            noButtonClass:'btn-secondary'
        };
        const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            const idle = new Idle()
                .whenNotInteractive()
                .within(1).start().do(() => {
                    if (this.isLoggedin) {
                        this.openModal()
                        idle.stop();
                    }
                })
            if (!result) {
                this._ajaxInterceptorSvc.setSettings({ ignoreSuccessSnack: true });
                this._userSvc.logout().subscribe(() => { this._router.navigate(['']); });
            }
        });

        setTimeout(() => {
            dialogRef.close();
        }, 61000);
    }
}
