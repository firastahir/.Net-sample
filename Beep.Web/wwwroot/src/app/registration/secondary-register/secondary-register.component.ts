import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormUtility } from '../../utility/utility.form';
import { Role } from '../../models/role.model';

@Component({
    selector: 'app-secondary-register',
    templateUrl: './secondary-register.component.html',
    styleUrls: ['./secondary-register.component.less']
})
export class SecondaryRegisterComponent implements OnInit {

    registrationType: string;
    hasExistingID: string;
    newEpmForm: FormGroup;
    submitted: boolean;
    currentUserType: string;

    constructor(private router: Router, private formBuilder: FormBuilder, private _formUtility: FormUtility) {
    }

    ngOnInit() {
        this.currentUserType = JSON.parse(sessionStorage.getItem('beep_user')).role;
        if (this.currentUserType == Role.NonBenchMarker) {
            this.registrationType = Role.BenchMarker;
        }

        this.initalizeNewEpmForm();
    }

    selectUserType(b: string) {
        this.registrationType = b;
        this.hasExistingID = null;
    }

    selectEPM(a: string) {
        this.hasExistingID = a;
    }

    initalizeNewEpmForm() {
        this.newEpmForm = this.formBuilder.group({
            userName: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]),
            confirmPassword: new FormControl(null, [Validators.required, this._formUtility.MatchPassword])
        });
    }

    onContinue() {
        this.submitted = true;
        sessionStorage.setItem('registrationType', this.registrationType);

        if (this.registrationType == Role.BenchMarker) {
            sessionStorage.setItem('existingEPM', this.hasExistingID);

            if (this.hasExistingID == 'false') {
                this._formUtility.markFormGroupDirty(this.newEpmForm);
                if (this.newEpmForm.invalid) {
                    return
                }

                sessionStorage.setItem('epmUserID', this.newEpmForm.get('userName').value);
                sessionStorage.setItem('epmPassword', this.newEpmForm.get('password').value);

            }
        }

        this.router.navigateByUrl('registration-epm');
    }

}
