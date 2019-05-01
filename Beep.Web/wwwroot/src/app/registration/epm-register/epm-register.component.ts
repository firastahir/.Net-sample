import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormUtility } from '../../utility/utility.form';
import { RegistrationService } from '../../services/registration.service';

@Component({
    selector: 'app-epm-register',
    templateUrl: './epm-register.component.html',
    styleUrls: ['./epm-register.component.less']
})
export class EpmRegisterComponent implements OnInit {

    registrationType: string;
    hasExistingID: string;
    currentUser: any;
    epmForm: FormGroup;
    existingNonbenchmarker: boolean;

    constructor(private router: Router, private formBuilder: FormBuilder, private _formUtility: FormUtility,
        private _registerService: RegistrationService) {
    }

    ngOnInit() {
        this.registrationType = sessionStorage.getItem('registrationType');
        this.hasExistingID = sessionStorage.getItem('existingEPM');
        console.log(this.hasExistingID);
        this.currentUser = JSON.parse(sessionStorage.getItem('beep_user'));
        this.initalizeEpmForm();

        if (this.currentUser.role == 'nonBenchMarker') {
            this.epmForm.patchValue(this.getEpmData());
        }
    }

    getEpmData() {
        return this._registerService.getEpmData(JSON.parse(sessionStorage.getItem('beep_user')).userName).subscribe(
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

    populateForm() {
        this.epmForm.setValue({

        });
    }

    initalizeEpmForm() {
        this.epmForm = this.formBuilder.group({
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^[2-9][0-9 . ]{11}$')]),
            businessName: new FormControl(null, [Validators.required]),
            taxID: new FormControl(null, [Validators.required]),
            businessFunction: new FormControl(null, [Validators.required]),
            jobTitle: new FormControl(null, [Validators.required]),
            addressLine1: new FormControl(null, [Validators.required]),
            addressLine2: new FormControl(null),
            city: new FormControl(null, [Validators.required]),
            state: new FormControl(null, [Validators.required]),
            zipCode: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{5}$")]),
            isPartner: new FormControl('', [Validators.required]),
            partnerType: new FormControl(null)
        });
    }

    onSubmit() {
        this._formUtility.markFormGroupDirty(this.epmForm);
        if (this.epmForm.valid && this.hasExistingID == "true") {
            this.router.navigateByUrl('dashboard');
        }
        else if (this.epmForm.valid) {
            this.router.navigateByUrl('add-building');
        }
    }

}
