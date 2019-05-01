import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormUtility } from '../../utility/utility.form';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-security-question',
    templateUrl: './edit-security-question.component.html',
    styleUrls: ['./edit-security-question.component.less']
})
export class EditSecurityQuestionComponent implements OnInit {

    securityQuestionForm: FormGroup;

    constructor(private router: Router, private _fb: FormBuilder,
        private _userSvc: UserService, private _formUtility: FormUtility) { }

    ngOnInit() {
        this.getCurrentQuestion();
        this.initalizeForm();
    }

    initalizeForm() {
        this.securityQuestionForm = this._fb.group({
            newQuestion: new FormControl(null, [Validators.required]),
            newAnswer: new FormControl(null, [Validators.required])
        });
    }

    getCurrentQuestion() {

    }

    onSubmit() {
        if (this.securityQuestionForm.valid) {
            this._userSvc.changeSecurityQuestion(null).subscribe(
                (resp) => {

                },
                (err) => {
                    console.log(err);
                }
            );
        }
    }
}
