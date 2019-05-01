import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-verify-account',
    templateUrl: './verify-account.component.html',
    styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent {

    constructor(public dialogRef: MatDialogRef<VerifyAccountComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any ) { }

    onSubmit() {
        if (this.data.accountNumber != null && this.data.accountNumber > 0) {
            this.dialogRef.close(this.data.accountNumber);
        }
    }

    onCancel() {
        this.dialogRef.close();
    }

}
