import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { interval } from 'rxjs';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.less']
})
export class ConfirmDialogComponent {
    duration: string;
    modalTitle: string;
    message: string;
    yesButtonText: string;
    noButtonText: string;
    yesButtonClass: string;
    noButtonClass: string;
    displayDuration: boolean;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.message = data.message;
        this.modalTitle = data.modalTitle;
        this.displayDuration = data.displayDuration;
        this.yesButtonText = data.yesButtonText || 'Yes';
        this.noButtonText = data.noButtonText || 'No';
        this.yesButtonClass = data.yesButtonClass || 'btn-success';
        this.noButtonClass = data.noButtonClass || 'btn-danger';

        interval(1000).subscribe(a => {
            if (60 - a >= 0) {
                this.duration = this.fmtMSS(60 - a)
            }
        });
    }

    private fmtMSS(s: number): string {
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
    }
}
