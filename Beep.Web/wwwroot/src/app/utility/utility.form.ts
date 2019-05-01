import { StaticInjector } from '@angular/core/src/di/injector';
import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class FormUtility {

    constructor(private _router: Router, private _snackBar: MatSnackBar) { }
    markFormGroupDirty(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsDirty();

            if (control.controls) {
                this.markFormGroupDirty(control);
            }
        });
    }

    PasswordRules(AC: AbstractControl) {
        if (!(AC.get('password').value == null || AC.get('password').value == '')) {
            let password = AC.get('password').value; // to get value in input tag
            let isNoLeadingTrailingSpacesValid = !/^[ \s]+|[ \s]+$/.test(password);
            let isLetterAndNumberAndSpecialCharValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*([~`!@#$%\^\(\)_*+=\-\[\]\\';,/{}|\\"":\?])).+$/.test(password);
            let isRepeatingCharactersValid = !/(\S)\1\1+/.test(password);
            let isNoControlCharactersValid = /^[\S ]+$/.test(password);
            let isNoTwoContinuousSpacesValid = !/\s\s/.test(password);
            let invalidCharacters = !/[<]|[>]|[&]/.test(password);
            let errors = { NoLeadingTrailingSpaces: false, InvalidCharacters: false, LetterAndNumberAndSpecialChar: false, RepeatingCharacters: false, NoControlCharacters: false, NoTwoContinuousSpaces: false };
            if (!isNoLeadingTrailingSpacesValid) {
                errors.NoLeadingTrailingSpaces = true;
            }
            if (!invalidCharacters) {
                errors.InvalidCharacters = true;
            }
            if (!isLetterAndNumberAndSpecialCharValid) {
                errors.LetterAndNumberAndSpecialChar = true;
            }
            if (!isRepeatingCharactersValid) {
                errors.RepeatingCharacters = true;
            }
            if (!isNoControlCharactersValid) {
                errors.NoControlCharacters = true;
            }
            if (!isNoTwoContinuousSpacesValid) {
                errors.NoTwoContinuousSpaces = true;
            }
            if (!invalidCharacters || !isNoControlCharactersValid || !isNoTwoContinuousSpacesValid || !isNoLeadingTrailingSpacesValid || !isLetterAndNumberAndSpecialCharValid || !isRepeatingCharactersValid)
                AC.get('password').setErrors(errors);
            else
                return null;
        }
        return null;
    }

    MatchPassword(control: AbstractControl) {
        let parent = control.parent
        if (parent) {
            let password = parent.get('password').value;
            let confirmPassword = control.value;

            if (password != confirmPassword) {
                return { ConfirmPassword: true };
            } else {
                return null;
            }
        } else {
            return null;
        }
    }


    handleSuccess(redirectUrl: string) {
        this._snackBar.open('success!', 'X', { duration: 3000, verticalPosition: 'bottom' })
            .afterDismissed()
            .subscribe(
                (result) => {
                    if (redirectUrl && this._router.url.toLowerCase().indexOf(redirectUrl) > -1)
                        this._router.navigateByUrl('/' + redirectUrl);
                }
            )
    }

    handleError() {
        this._snackBar.open('Something went wrong. Please try again', 'X', { duration: 3000, verticalPosition: 'bottom', panelClass: 'alert-danger' });
    }
}
