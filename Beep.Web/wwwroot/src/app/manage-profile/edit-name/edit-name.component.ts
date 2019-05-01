import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormUtility } from '../../utility/utility.form';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-name',
    templateUrl: './edit-name.component.html',
    styleUrls: ['./edit-name.component.less']
})
export class EditNameComponent implements OnInit {

    nameForm: FormGroup;

    constructor(private _fb: FormBuilder, private _userSvc: UserService, private _formUtility: FormUtility) { }

    ngOnInit() {
        this.initalizeForm();
    }

    initalizeForm() {
        this.nameForm = this._fb.group({
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
        if (this.nameForm.valid) {
            this._userSvc.changeName(null).subscribe(
                (resp) => {

                },
                (err) => {
                    console.log(err);
                }
            );
        }
    }
}
