import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormUtility } from '../../utility/utility.form';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-password',
    templateUrl: './edit-password.component.html',
    styleUrls: ['./edit-password.component.less']
})
export class EditPasswordComponent implements OnInit {

    passwordForm: FormGroup;

    constructor(private _fb: FormBuilder, private _userSvc: UserService, private _formUtility: FormUtility) { }

    ngOnInit() {
        this.initalizeForm();
    }

    initalizeForm() {
        this.passwordForm = this._fb.group({
            currentPassword: new FormControl(null, [Validators.required]),
            newPassword: new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
        if (this.passwordForm.valid) {
            this._userSvc.changePassword(null).subscribe(
                (resp) => {

                },
                (err) => {
                    console.log(err);
                }
            );
        }
    }
}
