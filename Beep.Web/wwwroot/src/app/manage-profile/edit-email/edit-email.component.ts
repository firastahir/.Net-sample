import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormUtility } from '../../utility/utility.form';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';



@Component({
    selector: 'app-edit-email',
    templateUrl: './edit-email.component.html',
    styleUrls: ['./edit-email.component.less']
})
export class EditEmailComponent implements OnInit {

    emailForm: FormGroup;

    constructor(private _fb: FormBuilder, private _userSvc: UserService, private _formUtility: FormUtility) { }

    ngOnInit() {
        this.initalizeForm();
    }

    initalizeForm() {
        this.emailForm = this._fb.group({
            currentEmail: new FormControl(null, [Validators.required, Validators.email]),
            newEmail: new FormControl(null, [Validators.required, Validators.email])
        });
    }

    onSubmit() {
        if (this.emailForm.valid) {
            this._userSvc.changeEmail(null).subscribe(
                (resp) => {

                },
                (err) => {
                    console.log(err);
                }
            );
        }
    }

}
