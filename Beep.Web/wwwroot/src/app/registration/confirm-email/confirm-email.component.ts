import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmEmail } from '../../models/confirm-email.model';
import { RegistrationService } from '../../services/registration.service';


@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
    confirmEmailModel: ConfirmEmail;

    constructor(private route: ActivatedRoute, private _registerService: RegistrationService) { }

    ngOnInit() {
        this.confirmEmail();
    }

    confirmEmail() {
        this.confirmEmailModel = {
            userId: this.route.snapshot.queryParams['userId'],
            guid: this.route.snapshot.queryParams['guid']
        }

        console.log(this.confirmEmailModel);

        this._registerService.confirmEmail(this.confirmEmailModel).subscribe(
            (res) => {
                //this.modal.type = 'success';
                //this.modal.returnUrl = 'login';
            },

            (error) => {
                //this.modal.type = 'error';
                //this.modal.message = 'Something went wrong. Please try again';
            }
        );
    }
}
