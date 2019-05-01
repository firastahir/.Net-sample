import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormUtility } from '../../utility/utility.form';
import { RegistrationService } from '../../services/registration.service';


@Component({
    selector: 'app-initial-register',
    templateUrl: './initial-register.component.html',
    styleUrls: ['./initial-register.component.less']
})
export class InitialRegisterComponent implements OnInit {

    initalForm: FormGroup;
    submitted = false;
    returnUrl: string;
    securityQuestions: any[];

    constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private _formUtility: FormUtility,
        private _registerService: RegistrationService) {
    }

    ngOnInit() {
        this.returnUrl = 'registration-confirm';
        this.getSecurityQuestions();
        this.initalizeForm();

    }

    onSubmit() {
        this.submitted = true;

        this._formUtility.markFormGroupDirty(this.initalForm);
        if (this.initalForm.valid) {
            this._registerService.initalRegistration(this.initalForm.value).subscribe(
                (resp) => {
                    console.log(resp);
                    this.router.navigateByUrl(this.returnUrl)
                },
                (err) => {
                    console.log(err);
                    this.router.navigateByUrl('/error/500');
                }
            )
        }
    }

    getSecurityQuestions() {
        //Service Call
        this.securityQuestions;
    }

    initalizeForm() {
        this.initalForm = this.formBuilder.group({
            userName: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(250)]),
            confirmPassword: new FormControl('', [Validators.required, this._formUtility.MatchPassword]),
            securityQuestionId: new FormControl(null, [Validators.required]),
            securityAnswer: new FormControl(null, [Validators.required]),
            confirmTerms: new FormControl(null, [Validators.requiredTrue])
        //}, {
        //        validator: [this._formUtility.PasswordRules]
            });
    }

}
