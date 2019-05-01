import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FormUtility } from '../utility/utility.form';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    returnUrl: string;
    loginForm: FormGroup;
    loginError: string;
    isLoggedin: boolean;
    errorMsg: string;

    @Input() shrink: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router, private _fb: FormBuilder, private _userSvc: UserService, private _formUtility: FormUtility) {
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this._userSvc.isLoggedIn().subscribe(status => this.isLoggedin = status);

        if (this.isLoggedin) {
            this.router.navigateByUrl(this.returnUrl);
        }

        this.loginForm = this._fb.group({
            userID: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required]),
        });
    }

    inputChange() {
        this.errorMsg = undefined;
    }
    login() {
        this._formUtility.markFormGroupDirty(this.loginForm);
        if (this.loginForm.valid) {
            this._userSvc.login(this.loginForm.value)
                .subscribe(
                (resp) => {
                    this.errorMsg = undefined;
                        this._userSvc.getUser().subscribe(
                            (status) => {
                                //console.log(status.registationStatus);
                                //if (status.registationStatus) {
                                //    this.router.navigateByUrl(this.returnUrl)
                                //}
                                //else {
                                //    this.router.navigateByUrl('registration-continue');
                                //}                                
                                this.router.navigateByUrl(this.returnUrl)


                            },
                            (error) => {
                                console.log(error);
                                this.router.navigateByUrl('/error/500');
                            }
                        )
                    },
                (err) => {
                    console.log(err);
                    this.loginForm.controls['userID'].setErrors({required:true});
                    this.errorMsg = err.error;
                    }
                )
        }
    }
    private markFormGroupDirty(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsDirty();

            if (control.controls) {
                this.markFormGroupDirty(control);
            }
        });
    }
}
